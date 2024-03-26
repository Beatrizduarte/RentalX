import { ICreateCarDTO } from "@modules/Cars/Dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { Car } from "../Entities/Car";
import { getRepository, Repository } from "typeorm";



class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id 
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id 
    })

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate
    })

    return car;
  }
  
}

export { CarsRepository }