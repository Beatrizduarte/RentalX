import { Router } from "express";
import { AuthenticateUserController } from "@modules/Accounts/useCases/AuthenticateUser/AuthenticateUseController";
import { RefreshTokenController } from "@modules/Accounts/useCases/refreshToken/RefreshTokenController";


const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenController.handle)

export { authenticateRoutes }