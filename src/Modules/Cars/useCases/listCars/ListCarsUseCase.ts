import { Car } from "@modules/Cars/Infra/Typeorm/Entities/Car";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

class ListCarsUseCase {
  constructor(
    private carsRepository: ICarsRepository
  ){}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand, 
      category_id, 
      name
    );
    return cars;
  }
}

export { ListCarsUseCase }