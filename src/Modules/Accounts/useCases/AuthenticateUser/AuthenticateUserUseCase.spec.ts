
import { UsersRepositoryInMemory } from "@modules/Accounts/Repositories/In-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { ICreateUserDTO } from "@modules/Accounts/Dtos/ICreateUserDTO";
import { AppError } from "@shared/Errors/AppErrors";
import { UsersTokensRepositoryInMemory } from "@modules/Accounts/Repositories/In-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/Container/Providers/DateProvider/Implementations/DayjsDateProvider";




let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider

let createUserUseCase: CreateUserUseCase;


describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO= {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "123"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!", 400));
  })

  it("Should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user@test.com",
      password: "1234",
      name: "User Test Error"
    }

    await createUserUseCase.execute(user)

    await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!", 400));
  })
})