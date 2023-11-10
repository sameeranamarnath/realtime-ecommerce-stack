import mongoose from "mongoose";
import {app} from "./app";
const ngrok = require("@ngrok/ngrok");

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


     app.listen(6000, async () => {    

        console.log("the Server is running on port  6000");

       
      if(process.env.ENVIRONMENT=="dev")
       {
        (async function() {
          const listener = await ngrok.connect({ addr: 6000, authtoken_from_env: true });
          console.log(`Ingress via ngrok established at: ${listener.url()}`);
        })();

       }
    });


}

start();

