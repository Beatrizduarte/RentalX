import { RentalRepositoryInMemory } from "@modules/Rentals/Repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { AppError } from "@shared/Errors/AppErrors";



let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "121212",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "121212",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "121212",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);

  })

  it("should not be able to create a new rental if there is another open to the same car", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "teste",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);

  })
})