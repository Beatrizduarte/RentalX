import { ICreateUserDTO } from "../Dtos/ICreateUserDTO"


interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
}

export { IUsersRepository }