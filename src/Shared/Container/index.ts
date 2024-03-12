import { container } from "tsyringe";
import { ICategoriesRepository } from "../../Modules/Cars/Repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../Modules/Cars/Repositories/implementations/CategoriesRepository";
import { ISpecificationRepository } from "../../Modules/Cars/Repositories/ISpecificationRepository";
import { SpecificationRepository } from "../../Modules/Cars/Repositories/implementations/SpecificationRepository";


container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);