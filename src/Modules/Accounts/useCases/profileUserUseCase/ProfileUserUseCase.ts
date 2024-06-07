import { inject, injectable } from "tsyringe";

import { User } from "@modules/Accounts/Infra/Typeorm/Entities/User";
import { IUsersRepository } from "@modules/Accounts/Repositories/IUsersRepository";
import { UserMap } from "@modules/Accounts/mapper/UserMap";
import { IUserResponseDTO } from "@modules/Accounts/Dtos/IUserResponseDTO";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute(id: string): Promise<IUserResponseDTO>{
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase }