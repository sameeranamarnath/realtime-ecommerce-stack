import { CustomError } from "./custom-error";

export class DbConnectionError extends CustomError{
    statusCode=500;
   static reason =" Error connecting to db";
 constructor(){

    super(DbConnectionError.reason);


    Object.setPrototypeOf(this,DbConnectionError.prototype);
 }


 serializeErrors(){

    return [

        {message:DbConnectionError.reason}
    ]

 }

}