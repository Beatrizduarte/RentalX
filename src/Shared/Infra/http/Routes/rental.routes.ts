import { Router } from "express";

import { CreateRentalController } from "@modules/Rentals/useCases/createRental/createRentalController";
import { ensureAuthenticated } from "../Middleware/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/Rentals/useCases/devolutionRental/devolutionRentalController";
import { ListRentalsByUserController } from "@modules/Rentals/useCases/listRentalsByUser/ListRentalsByController";


const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRoutes }