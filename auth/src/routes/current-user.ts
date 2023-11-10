import express from 'express'
import {json} from 'body-parser';

const router = express.Router();
import  jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

router.post('/api/users/currentuser', currentUser,requireAuth,   (req,res)=>{

     res.send({currentUser: req.currentUser || null});

});

export {router as currentUserRouter};
