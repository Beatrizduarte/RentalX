import { Category } from "@modules/Cars/Infra/Typeorm/Entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";



class CategoriesRepositoryInMemory implements ICategoriesRepository {

  categories: Category[] = [];

  

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    const listAll = this.categories;
    return listAll;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description
    });

    this.categories.push(category);
  }

}

export { CategoriesRepositoryInMemory }