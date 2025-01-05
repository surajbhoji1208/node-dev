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

module.exports = { signUpValidation };
