import { instanceToInstance } from 'class-transformer'
import { IUserResponseDTO } from "../Dtos/IUserResponseDTO";
import { User } from "../Infra/Typeorm/Entities/User";


class UserMap {

  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url
    })

    return user;
  }
}

export { UserMap }