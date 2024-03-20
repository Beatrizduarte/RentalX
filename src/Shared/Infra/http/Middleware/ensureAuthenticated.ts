import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/Accounts/Infra/Typeorm/Repositories/UsersRepository";
import { AppError } from "@shared/Errors/AppErrors";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  
  try{
    const { sub: user_id } = verify(token, "d700646810e2b37fedbc3f33b2cc70a8") as IPayload;
    
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if(!user) {
      throw new AppError("User does not exist", 401);
    } 

    request.user = {
      id: user_id,
    }       

    next();
  }catch(e){
    throw new AppError("Invalid token!", 401);
    
  }
}