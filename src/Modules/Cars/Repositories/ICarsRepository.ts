import { ICreateCarDTO } from "../Dtos/ICreateCarsDTO"
import { Car } from "../Infra/Typeorm/Entities/Car"


interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string, 
    category_id?: string, 
    name?: string
    ): Promise<Car[]>
    findById(id: string): Promise<Car>
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository }

