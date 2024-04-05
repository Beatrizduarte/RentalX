import { Rental } from "@modules/Rentals/Infra/Typeorm/Entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";



class RentalRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === car_id && rental.end_date === null);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && rental.end_date === null);
  }

}

export { RentalRepositoryInMemory }