import { DayjsDateProvider } from "@shared/Container/Providers/DateProvider/Implementations/DayjsDateProvider";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { UsersRepositoryInMemory } from "@modules/Accounts/Repositories/In-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/Accounts/Repositories/In-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/Container/Providers/MailProvider/InMemory/MailProviderInMemory";
import { AppError } from "@shared/Errors/AppErrors";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot Mail", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  })
  
  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "2340686",
      email: "ginoh@pawin.sr",
      name: "Eugene Vasquez",
      password: "12345"
    })

    await sendForgotPasswordMailUseCase.execute("ginoh@pawin.sr")

    expect(sendMail).toHaveBeenCalled();
  })

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ejematib@ape.jm")
    ).rejects.toEqual(new AppError("User does not exists!", 400))
  })

  it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "4027399007",
      email: "atulife@mivut.pe",
      name: "Terry Rivera",
      password: "12345"
    })

    await sendForgotPasswordMailUseCase.execute("atulife@mivut.pe");

    expect(generateTokenMail).toHaveBeenCalled();

  })
})