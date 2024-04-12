import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/Errors/AppErrors";
import { IRentalsRepository } from "@modules/Rentals/Repositories/IRentalsRepository";
import { Rental } from "@modules/Rentals/Infra/Typeorm/Entities/Rental";
import { IDateProvider } from "@shared/Container/Providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ){}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable){
      throw new AppError("Car is unavailable", 400);
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!", 400);
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date, 
    )

    if (compare < minimumHours){
      throw new AppError("Invalid return time!", 400);
      
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;

  }
}

export { CreateRentalUseCase }