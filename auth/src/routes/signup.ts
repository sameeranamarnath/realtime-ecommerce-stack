import express, {Request,Response} from 'express'

 
import {body, validationResult} from "express-validator";
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import {json} from 'body-parser';
import { RequestValidationError } from '../errors/request-validation-error';
import { DbConnectionError } from '../errors/database-connection-error';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from "jsonwebtoken";
import { Password } from '../services/password';

const router = express.Router();


router.post('/api/users/signup', body('email').isEmail().withMessage('Email should be valid'),
body('password').trim().isLength({min:4,max:20}).withMessage('password should be non empty between 4 to 20 chars'), validateRequest, async  (req:Request,res:Response)=>{

    

 
    const {email,password} = req.body;

    
    const existingUser= await User.findOne({email});
    console.log(existingUser);
if(existingUser)
{
    console.log("User already exists");
  throw new BadRequestError("Email already in use");
}
else
{

  try{


    
  const user= User.build({email,password});
  await user.save();
  
  const userJWToken= 
jwt.sign({
   id : user.id,
   email: user.email,
    
  },(process.env.JWT_KEY as string));
  req.session= {userJWToken};
  console.log("creating user signup");
  
  res.send(user);
  }
  catch(err)
  {
    console.log(err);
    res.send("error while saving")
  }
}
  

 
});

export {router as signupRouter};
