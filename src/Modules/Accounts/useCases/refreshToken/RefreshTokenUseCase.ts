import { verify, sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { IUsersTokensRepository } from "@modules/Accounts/Repositories/IUsersTokenRepository"
import auth from "@config/auth"
import { AppError } from "@shared/Errors/AppErrors";
import { IDateProvider } from "@shared/Container/Providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_reflesh_token) as IPayload;
    
    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if(!userToken){
      throw new AppError("Refresh token does not exists!", 400);
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    const refresh_token = sign({ email }, auth.secret_reflesh_token , {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token, 
    });

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return {
      refresh_token,
      token: newToken
    }

  }
}

export { RefreshTokenUseCase }