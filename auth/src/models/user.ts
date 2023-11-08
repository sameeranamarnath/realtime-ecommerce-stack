import mongoose from "mongoose";
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
    let user=  new User(attributes).save( );
    return user; 
 };
userSchema.statics.build= buildUser;

const User = mongoose.model<UserDoc,UserModel>("User", userSchema);

/*
const user = User.build({
    email:'test@test.com',
    password:'12345678'
})
*/

console.log(User.find({email:"email1@email.com"}).count());
export {User};