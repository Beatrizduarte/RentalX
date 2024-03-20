
import { ISpecificationRepository } from "@modules/Cars/Repositories/ISpecificationRepository";
import { AppError } from "@shared/Errors/AppErrors";
import { inject, injectable } from "tsyringe";


interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
    ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists = await
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!", 400);
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
