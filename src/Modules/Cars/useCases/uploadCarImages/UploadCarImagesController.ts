import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase"
import { Request, Response } from "express";


interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
    })

    return response.status(201).send();
  }
}

export { UploadCarImagesController }