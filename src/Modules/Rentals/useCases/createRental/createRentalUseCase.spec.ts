import dayjs from "dayjs";
import { AppError } from "@shared/Errors/AppErrors";

import { RentalRepositoryInMemory } from "@modules/Rentals/Repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/Container/Providers/DateProvider/Implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/Cars/Repositories/In-memory/CarsRepositoryInMemory";



let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "121212",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);

  })

  it("should not be able to create a new rental if there is another open to the same car", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "teste",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);

  })

  it("should not be able to create a new rental with invalid return time", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "teste",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);

  })
})