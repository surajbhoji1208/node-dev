const mongoose = require("mongoose");
var validator = require("validator");
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

module.exports = mongoose.model("User", userSchema);
