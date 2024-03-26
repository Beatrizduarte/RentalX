import { CreateSpecificationController } from "@modules/Cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";
import { ensureAuthenticated } from "../Middleware/ensureAuthenticated";
import { ensureAdmin } from "../Middleware/ensureAdmin";



const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
