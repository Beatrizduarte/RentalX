import { Router } from "express";

import { CreateRentalController } from "@modules/Rentals/useCases/createRental/createRentalController";
import { ensureAuthenticated } from "../Middleware/ensureAuthenticated";


const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRoutes }