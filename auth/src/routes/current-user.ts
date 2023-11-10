import express from 'express'
import {json} from 'body-parser';

const router = express.Router();
import  jwt from 'jsonwebtoken';

router.post('/api/users/currentuser',(req,res)=>{

     if(!req.session?.userJWToken)
     {
        console.log("userJWToken not set");
        return res.send({currentUser:null});
     }

     try {

      const userPayload = jwt.verify(req.session.userJWToken, process.env.JWT_KEY as string);
     
      console.log("cuser:"+userPayload);
      res.send({currentUser:userPayload});
    }
     catch(err)
     {
        console.log("cuser error"+err);
        res.send({currentUser:null});
     }
});

export {router as currentUserRouter};
