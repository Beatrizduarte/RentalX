import { ICreateUserTokenDTO } from "@modules/Accounts/Dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/Accounts/Repositories/IUsersTokenRepository";
import { UserTokens } from "../Entities/UserTokens";
import { getRepository, Repository } from "typeorm";



class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens);
  }
  
  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    })

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token): Promise<UserTokens> {
    const usersToken = await this.repository.findOne({
      user_id,
      refresh_token
    });
    return usersToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  
}

export { UsersTokensRepository }