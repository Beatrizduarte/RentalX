import { UsersRepository } from "@modules/Accounts/Infra/Typeorm/Repositories/UsersRepository";
import { AppError } from "@shared/Errors/AppErrors";
import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) { 
    throw new AppError("User is isn't admin!", 400);
    
  }

  return next();

}