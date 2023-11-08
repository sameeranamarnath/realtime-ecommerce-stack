import express, {Request,Response} from 'express'
import {body, validationResult} from "express-validator";
import { User } from '../models/user';
import {json} from 'body-parser';
import { RequestValidationError } from '../errors/request-validation-error';
import { DbConnectionError } from '../errors/database-connection-error';
import { BadRequestError } from '../errors/bad-request-error';
const router = express.Router();


router.post('/api/users/signup', body('email').isEmail().withMessage('Email should be valid'),
body('password').trim().isLength({min:4,max:20}).withMessage('password should be non empty between 4 to 20 chars'),  async  (req:Request,res:Response)=>{

    const errors= validationResult(req);


    if(!errors.isEmpty())
    {

        //return errors object
    //    return res.status(400).json({errors:errors.array()});

        throw new RequestValidationError(errors.array());
    }

    const {email,password} = req.body;

    
    const existingUser= await User.findOne({email});
    console.log(existingUser);
if(existingUser)
{
    console.log("User already exists");
  throw new BadRequestError("Email already in use");
}
  const user= User.build({email,password});

  await user.save();
  console.log("creating user signup");
  
  res.send(user);

  

 
});

export {router as signupRouter};
