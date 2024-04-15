import { compareSync } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/Accounts/Repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/Errors/AppErrors";
import { IUsersTokensRepository } from "@modules/Accounts/Repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/Container/Providers/DateProvider/IDateProvider";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ){}

  async execute({email, password}: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);
    const { 
      expires_in_token, 
      secret_token, 
      secret_reflesh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth;

    if(!user){
      throw new AppError("Email or password incorrect!", 400)
    }

    const passwordMatch = compareSync(password, user.password)

    if(!passwordMatch){
      throw new AppError("Email or password incorrect!", 400)
    }

    const token = sign({}, secret_token , {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({ email }, secret_reflesh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const tokenReturn: IResponse = {
      token, 
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token,
    }

    return tokenReturn;

  }
}

export { AuthenticateUserUseCase }