const validator = require("validator");

const signUpValidation = (req) => {
    console.log(req);
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("First name or last name is missing");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Wrong email ID");
    }
};

const validateEditProfileData = (req)=>{
    const allowedEditFields = ["firstName","lastName","emailId","profile","gender","age","about","skills"]

    const isEditAllowed = Object.keys(req.body).every((fields)=>allowedEditFields.includes(fields))

    return isEditAllowed
}

module.exports = { signUpValidation,validateEditProfileData };
