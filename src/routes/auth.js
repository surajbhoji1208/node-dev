const express = require('express')

const authRoute = express.Router()
const User = require('../modal/user')
const {signUpValidation} = require('../utils/validation')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

authRoute.post("/signup",async (req,res)=>{
    try {
        signUpValidation(req); 
        const { firstName, lastName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: hashedPassword });
        await user.save();
        const token = await user.getJWT();

        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
    
        
      

        res.status(201).send({message:"New user data saved successfully",data:user});
    } catch (err) {
        console.error("Error while saving user data:", err.message);

        // Send error response
        res.status(500).send("Error saving user data"+ err.message);
    }
})

authRoute.post('/login',async (req,res)=>{
    try {
        const {emailId,password} = req.body
        const user = await User.findOne({emailId:emailId})
        console.log(user);
        if(!user)
        {
            throw new Error('email id is not present in db')
        }
        const isPasswordValid = await user.validatePassword(password)
        console.log(isPasswordValid);
        if(isPasswordValid)
        {
            const token = await user.getJWT()
            res.cookie("token",token,{expires:new Date(Date.now() + 8 * 3600000)})
            res.send(user)
        }else
        {
            throw new Error("wrong password")
        }
    } catch (error) {
        res.status(400).send('wrong credentials')
    }
})

authRoute.post('/logout',async (req,res)=>{
    res.cookie('token',null,{expires:new Date(Date.now())})
    res.send("logout successful");
})

module.exports  = authRoute