import { RentalRepositoryInMemory } from "@modules/Rentals/Repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";



let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "121212",
      expected_return_date: new Date(),
    });
  })
})