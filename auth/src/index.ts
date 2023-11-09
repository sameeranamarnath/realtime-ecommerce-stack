import express from "express";
import 'express-async-errors';
import {json} from "body-parser";

import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { RequestValidationError } from "./errors/request-validation-error";
import { DbConnectionError } from "./errors/database-connection-error";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all('*', async (req,res,next)=>{

    throw new NotFoundError();
});



app.get("/api/users/currentuser",(req,res)=>{

    res.send({
        name: "Mohamed",
        email: "mohamed@gmail.com",
        phone: "01000000000"});

});
app.use(errorHandler);

const start=async () => {
    
    try 
    {
    //await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
await mongoose.connect(process.env.MONGODB_ATLAS_URI as string);
     console.log("connected  to mongo db");
     }
     catch(err)
     {
        console.error(err);
     }

     app.listen(6000, () => {    

        console.log("the Server is running on port  6000");
    
    });
}

start();

