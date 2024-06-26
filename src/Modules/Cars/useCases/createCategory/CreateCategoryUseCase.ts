import { AppError } from "@shared/Errors/AppErrors";
import { ICategoriesRepository } from "@modules/Cars/Repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!", 400);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
