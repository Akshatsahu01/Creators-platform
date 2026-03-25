import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const User_Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
    },
    email:{
        type:String,
        required:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Pleeeasssse enter a valid email"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:4
    }

})
// THE PRE-SAVE HOOK
// This function will run right before a 'save' event on a user document.
User_Schema.pre('save', async function () {
  // 'this' refers to the user document that is about to be saved.
  const user = this;

  // We only want to re-hash the password if it's new or has been changed.
  if (user.isModified('password')) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  
  // Continue with the save operation
  
});

const User=mongoose.model("User",User_Schema);
export default User