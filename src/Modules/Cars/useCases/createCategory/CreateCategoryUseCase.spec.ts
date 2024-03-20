
import { CategoriesRepositoryInMemory } from "@modules/Cars/Repositories/In-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "@shared/Errors/AppErrors";



let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;


describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category test524",
      description: "Category description test524"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");

  })

  it("Should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category test524",
        description: "Category description test524"
      }

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(AppError);
  })
})