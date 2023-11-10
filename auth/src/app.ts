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
import cookieSession = require("cookie-session");
import { Password } from "./services/password";
import { User } from "./models/user";
dotenv.config();

const app = express();
//allow proxy based traffic
app.set('trust proxy',true);
app.use(json());

app.use(

cookieSession({
    signed: false,
    secure: true,
})

)

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

export {app};