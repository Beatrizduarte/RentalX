import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload"
import { CreateUserController } from "@modules/Accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/Accounts/useCases/UpdateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../Middleware/ensureAuthenticated";
import { ProfileUserController } from "@modules/Accounts/useCases/profileUserUseCase/ProfileUserController";


const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
)

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes }