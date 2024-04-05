import { container } from "tsyringe";
import { ICategoriesRepository } from "@modules/Cars/Repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { IUsersRepository } from "@modules/Accounts/Repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/Cars/Infra/Typeorm/Repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/Cars/Infra/Typeorm/Repositories/SpecificationRepository";
import { UsersRepository } from "@modules/Accounts/Infra/Typeorm/Repositories/UsersRepository";
import { ICarsRepository } from "@modules/Cars/Repositories/ICarsRepository";
import { CarsRepository } from "@modules/Cars/Infra/Typeorm/Repositories/CarsRepository";
import { ICarsImagesRepository } from "@modules/Cars/Repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/Cars/Infra/Typeorm/Repositories/CarsImagesRepository";



container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)