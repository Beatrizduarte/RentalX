import { compareSync } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../Repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../Errors/AppErrors";

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
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({email, password}: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = compareSync(password, user.password)

    if(!passwordMatch){
      throw new AppError("Email or password incorrect!")
    }

    const token = sign({}, "d700646810e2b37fedbc3f33b2cc70a8", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token, 
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;

  }
}

export { AuthenticateUserUseCase }