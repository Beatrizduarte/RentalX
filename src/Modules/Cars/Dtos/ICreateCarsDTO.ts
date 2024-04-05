import { Specification } from "../Infra/Typeorm/Entities/Specification";


interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifictions?: Specification[];
  id?: string;
}

export { ICreateCarDTO }