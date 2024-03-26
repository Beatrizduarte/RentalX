import { CarsRepositoryInMemory } from "@modules/Cars/Repositories/In-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"


let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "Car description",
      daily_rate: 110.00,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id"
    })

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  })

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car2",
      description: "Car description",
      daily_rate: 110.00,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id"
    })

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    console.log(cars)

    expect(cars).toEqual([car]);
  })
})