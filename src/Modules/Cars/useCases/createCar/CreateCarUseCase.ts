import { Car } from "@modules/Cars/Infra/Typeorm/Entities/Car";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { AppError } from "@shared/Errors/AppErrors";
import { inject, injectable } from "tsyringe";


interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ){}

  async execute({ 
    name, 
    description, 
    daily_rate, 
    license_plate, 
    fine_amount, 
    brand, 
    category_id 
  }: IRequest): Promise<Car>{

    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)

    if(carAlreadyExists){
      throw new AppError("Car already exists!", 400)
      
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    return car;
  }
}

export { CreateCarUseCase }