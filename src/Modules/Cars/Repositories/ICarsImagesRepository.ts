import { CarImage } from "../Infra/Typeorm/Entities/CarImage";



interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export {ICarsImagesRepository };