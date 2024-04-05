import { ICarsImagesRepository } from "@modules/Cars/Repositories/ICarsImagesRepository";
import { CarImage } from "../Entities/CarImage";
import { getRepository, Repository } from "typeorm";



class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage)
  }

 async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImagem = this.repository.create({
      car_id,
      image_name,
    })

    await this.repository.save(carImagem);

    return carImagem;
  }

}

export { CarsImagesRepository }