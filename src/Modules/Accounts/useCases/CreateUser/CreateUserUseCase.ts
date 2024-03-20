import { inject, injectable } from "tsyringe"
import { genSaltSync, hashSync } from "bcryptjs"
import { IUsersRepository } from "@modules/Accounts/Repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/Accounts/Dtos/ICreateUserDTO";
import { AppError } from "@shared/Errors/AppErrors";


@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if(userAlreadyExists){
      throw new AppError("User Already Exists!", 400);
      
    }

    const passwordHash = hashSync(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license
    })
  }
}

export { CreateUserUseCase } 