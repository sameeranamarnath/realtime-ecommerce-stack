import mongoose from "mongoose";
import { Password } from "../services/password";
interface UserAttributes{

     email:string,
     password:string;
}
//typestring=> string, js:String

//an interface that describes the properties that
//a user model has 


interface UserModel extends mongoose.Model<UserDoc> {
    build(attributes: UserAttributes): UserDoc;
}


interface UserDoc extends mongoose.Document{
 email:string;
 password:string;
 
}
const userSchema = new mongoose.Schema({
  email:{

    type:String,
    required:true,
      unique:true,
  } ,
  password:{

    type:String,
    required:true,
  } 
  
});


const buildUser = (attributes:UserAttributes) => {
    let user=  new User(attributes);
    return user; 
 };

 userSchema.pre('save',async function(next)
 {

  console.log("presave hook")

   if(this.isModified("password"))
   {
     this.set("password",await Password.toHash(this.get("password")));
   
   }

   console.log("calling next:"+this.get("password"))
   next();

 });
 userSchema.statics.build= buildUser;

const User = mongoose.model<UserDoc,UserModel>("User", userSchema);

/*
const user = User.build({
    email:'test@test.com',
    password:'12345678'
})
*/

//console.log(User.find({email:"email1@email.com"}).count());
export {User};