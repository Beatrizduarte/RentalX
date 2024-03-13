import { container } from "tsyringe";
import { ICategoriesRepository } from "../../Modules/Cars/Repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../Modules/Cars/Repositories/implementations/CategoriesRepository";
import { ISpecificationRepository } from "../../Modules/Cars/Repositories/ISpecificationRepository";
import { SpecificationRepository } from "../../Modules/Cars/Repositories/implementations/SpecificationRepository";
import { IUsersRepository } from "../../Modules/Accounts/Repositories/IUsersRepository";
import { UsersRepository } from "../../Modules/Accounts/Repositories/implementations/UsersRepository";


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