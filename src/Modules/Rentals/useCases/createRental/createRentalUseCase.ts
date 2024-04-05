import { AppError } from "@shared/Errors/AppErrors";
import { IRentalsRepository } from "@modules/Rentals/Repositories/IRentalsRepository";
import { Rental } from "@modules/Rentals/Infra/Typeorm/Entities/Rental";


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {

  constructor(
    private rentalsRepository: IRentalsRepository
  ){}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable){
      throw new AppError("Car is unavailable", 400);
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!", 400);
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;

  }
}

export { CreateRentalUseCase }