import { inject } from "tsyringe"
import { IUsersRepository } from "../../Repositories/IUsersRepository";
import { ICreateUserDTO } from "../../Dtos/ICreateUserDTO";


class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({
    name,
    username,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      email,
      password,
      driver_license
    })
  }
}

export { CreateUserUseCase } 