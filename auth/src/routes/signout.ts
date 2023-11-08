import express from 'express'
import {json} from 'body-parser';

const router = express.Router();


router.get('/api/users/signout',(req,res)=>{

 res.send("Hello!!!")

});

export {router as signoutRouter};
