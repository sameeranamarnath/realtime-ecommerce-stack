import express,{Request,Response} from 'express'
import {json} from 'body-parser';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();
import {body, validationResult} from "express-validator";
import { Password } from '../services/password';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
router.post('/api/users/signin',[ body('email').isEmail().withMessage('Email should be valid'),
body('password').trim().isLength({min:4,max:20}).withMessage('password should be non empty between 4 to 20 chars')],validateRequest,async (req: Request,res: Response)=>{


    const {email,password}= req.body;

    const existingUser=  await User.findOne({email});

    if(!existingUser)
    {
        throw new BadRequestError("User with email doesnt exist");
    }
    const passwordDoesMatch=  await Password.checkPassword(existingUser.password,password);

    console.log(passwordDoesMatch+":"+existingUser.password);

    if(!passwordDoesMatch)
    {
        throw new BadRequestError("Password doesnt match");
    }
        const userJWToken= 
jwt.sign({
   id : existingUser.id,
   email: existingUser.email
    
  },(process.env.JWT_KEY as string));
  req.session= {userJWToken};
  
  
 res.status(200).send(existingUser);
  
  
});

export {router as signinRouter};
