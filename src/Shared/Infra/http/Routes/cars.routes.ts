import { CreateCarController } from "@modules/Cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../Middleware/ensureAuthenticated";
import { ensureAdmin } from "../Middleware/ensureAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  "/", 
  ensureAuthenticated, 
  ensureAdmin, 
  createCarController.handle
)

export { carsRoutes }