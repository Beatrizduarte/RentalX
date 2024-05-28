import { Router } from "express";
import multer from "multer";


import { CreateCarController } from "@modules/Cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/Cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAuthenticated } from "../Middleware/ensureAuthenticated";
import { ensureAdmin } from "../Middleware/ensureAdmin";
import { CreateCarSpecificationController } from "@modules/Cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/Cars/useCases/uploadCarImages/UploadCarImagesController";
import uploadConfig from "@config/upload";

const carsRoutes = Router();

const upload = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImagesController();

carsRoutes.post(
  "/", 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarController.handle
)

carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images") , uploadCarImageController.handle);

export { carsRoutes }