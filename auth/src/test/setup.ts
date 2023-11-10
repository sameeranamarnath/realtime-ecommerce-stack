import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

import dotenv from "dotenv";

beforeAll(async () => {


dotenv.config();
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);


});

beforeEach(async () => {

    
    const collections = await mongoose.connection.db.collections();

     for(let eachCollection of collections)
    {

    await eachCollection.deleteMany();

    }


});