import { inject, injectable } from "tsyringe";
import { hashSync } from "bcryptjs";

import { IUsersRepository } from "@modules/Accounts/Repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/Accounts/Repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/Container/Providers/DateProvider/IDateProvider";
import { AppError } from "@shared/Errors/AppErrors";

interface IRequest {
  token: string;
  password: string;
}


@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {

    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if(!userToken) {
      throw new AppError("Token Invalid!", 400);
    }

    if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError("Token expired!", 400);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = hashSync(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
      
  }
}

export { ResetPasswordUseCase }