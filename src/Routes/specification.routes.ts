import { Router } from "express";

import { CreateSpecificationController } from "../Modules/Cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../Middleware/unsureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
