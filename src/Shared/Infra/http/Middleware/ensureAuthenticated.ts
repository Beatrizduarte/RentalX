import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/Accounts/Infra/Typeorm/Repositories/UsersRepository";
import { AppError } from "@shared/Errors/AppErrors";
import { UsersTokensRepository } from "@modules/Accounts/Infra/Typeorm/Repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository();

  if(!authHeader){
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  
  try{
    const { sub: user_id } = verify(token, auth.secret_reflesh_token) as IPayload;
    
    const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

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