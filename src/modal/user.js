const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 4, maxLength: 50 },
  lastName: { type: String },
  emailId: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
    validate(value){
        if(!validator.isEmail(value))
        {
            throw new Error("wrong email address")
        }
    }
  },
  password: { type: String ,validate(value){
    if(!validator.isStrongPassword(value))
    {
        throw new Error("wrong email address")
    }
}},
  age: { type: Number, min: 18 },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("gender is not valid");
      }
    },
  },
  about: { type: String, default: "this is default" },
  profile: { type: String, default: "https://www.npmjs.com/package/bcrypt", validate(value){
    if(!validator.isURL(value))
    {
        throw new Error("wrong URL address")
    }
} },
  skills: { type: [String] },
});

userSchema.methods.getJWT = async function()
{
  const user = this
  const token =  await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"7d"})
  return token
}

userSchema.methods.validatePassword =async function(passwordInputByUser)
{
  const user = this;
  const passwordHash = user.password

  const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash)
  
  return isPasswordValid
}
module.exports = mongoose.model("User", userSchema);
