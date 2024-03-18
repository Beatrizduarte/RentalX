import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors"

import "./Database"

import "./Shared/Container";

import { router } from "./Routes";
import swaggerFile from "./swagger.json";
import { AppError } from "./Errors/AppErrors";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal Server Error: ${err.message}`
  })
})

app.listen(3333, () => console.log("server is running"));
