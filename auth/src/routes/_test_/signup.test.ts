
import  request  from "supertest";
import { app } from "../../app";

it("returns a request code of 201 on successful signup",async()=>
{
  return request(app).post("/api/users/signup")
         .send({
            email:"user2@email.com",
            password:"pwd25"

         }).expect(201);
    

});