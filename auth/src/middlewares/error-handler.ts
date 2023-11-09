import {Request,Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DbConnectionError } from "../errors/database-connection-error";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error,req:Request,res:Response,next:NextFunction) => {


    if (err instanceof CustomError) {
        console.log("custom error: "+err);

        return res.status(err.statusCode).send({errors:err.serializeErrors()})
      }

   
     res.status(400).send({errors:["unhandled error at server"]});
    

};