import { CreateSpecificationController } from "@modules/Cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";
import { ensureAuthenticated } from "../Middleware/ensureAuthenticated";



const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
