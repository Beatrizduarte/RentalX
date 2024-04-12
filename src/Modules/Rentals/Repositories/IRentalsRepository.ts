import { ICreateRentalDTO } from "../Dtos/ICreateRentalDTO"
import { Rental } from "../Infra/Typeorm/Entities/Rental"


interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
  create(data: ICreateRentalDTO): Promise<Rental>
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository }