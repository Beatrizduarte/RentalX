import { container } from "tsyringe";
import { ICategoriesRepository } from "@modules/Cars/Repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { IUsersRepository } from "@modules/Accounts/Repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/Cars/Infra/Typeorm/Repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/Cars/Infra/Typeorm/Repositories/SpecificationRepository";
import { UsersRepository } from "@modules/Accounts/Infra/Typeorm/Repositories/UsersRepository";



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