import { ICreateUserTokenDTO } from "../Dtos/ICreateUserTokenDTO";
import { UserTokens } from "../Infra/Typeorm/Entities/UserTokens";



interface IUsersTokensRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository }