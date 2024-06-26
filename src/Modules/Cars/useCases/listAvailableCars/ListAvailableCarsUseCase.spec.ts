import { CarsRepositoryInMemory } from "@modules/Cars/Repositories/In-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";



let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  })

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car2",
      description: "Car description",
      daily_rate: 110.00,
      license_plate: "DEF-1235",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  })

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Car description",
      daily_rate: 110.00,
      license_plate: "DEF-1236",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "car3",
    });

    expect(cars).toEqual([car]);
  })

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Car description",
      daily_rate: 110.00,
      license_plate: "DEF-1236",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "12345"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  })
})