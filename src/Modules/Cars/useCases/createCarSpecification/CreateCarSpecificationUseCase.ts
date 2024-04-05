import { Car } from "@modules/Cars/Infra/Typeorm/Entities/Car";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { AppError } from "@shared/Errors/AppErrors";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRespository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ){}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car>{

    const carExists = await this.carsRespository.findById(car_id);

    if(!carExists) {
      throw new AppError("Car does not exists!", 400);
    }

    const specifications =  await this.specificationsRepository.findByIds(specifications_id)
    
    carExists.specifications = specifications;

    await this.carsRespository.create(carExists);

    return carExists;

  }
}

export { CreateCarSpecificationUseCase }