import { Router } from "express";
import { AuthenticateUserController } from "@modules/Accounts/useCases/AuthenticateUser/AuthenticateUseController";


const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle)

export { authenticateRoutes }