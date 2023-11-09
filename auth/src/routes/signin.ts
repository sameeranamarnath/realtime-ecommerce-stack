import express,{Request,Response} from 'express'
import {json} from 'body-parser';

const router = express.Router();
import {body, validationResult} from "express-validator";


router.post('/api/users/signin',[ body('email').isEmail().withMessage('Email should be valid'),
body('password').trim().isLength({min:4,max:20}).withMessage('password should be non empty between 4 to 20 chars')],(req: Request,res: Response)=>{

 res.send("Hello!!!")

});

export {router as signinRouter};
