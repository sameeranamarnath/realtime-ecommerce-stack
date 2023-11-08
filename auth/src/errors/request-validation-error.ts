import { ValidationError } from "express-validator";
import { NumberLiteralType } from "typescript";
import { CustomError } from "./custom-error";
/*
interface CustomError{

    statusCode: Number;
    serializeErrors():{

        message:string;
        field? :string;
    }[]
}
*/

export class RequestValidationError extends CustomError {

statusCode=400;
    static reason = "Error while validating field";
    constructor(public errors:ValidationError[]) {

      super(RequestValidationError.reason);

      //for extending a built in class
      Object.setPrototypeOf(this,RequestValidationError.prototype);

    }

    serializeErrors(){

       return  this.errors.map((error) => {
            if (error.type === 'field') {
              return { message: error.msg, field: error.path };
            }
            //consistency
            return { message: error.msg };
          });
    }

}