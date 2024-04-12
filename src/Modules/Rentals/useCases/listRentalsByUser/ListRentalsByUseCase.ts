import { Rental } from "@modules/Rentals/Infra/Typeorm/Entities/Rental";
import { IRentalsRepository } from "@modules/Rentals/Repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ){}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase }