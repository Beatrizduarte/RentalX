import { ICreateUserDTO } from "../Dtos/ICreateUserDTO"
import { User } from "../Infra/Typeorm/Entities/User"



interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}

export { IUsersRepository }