const express = require('express')
const connectDB = require('./config/database')
const User = require('./modal/user')
const {signUpValidation} = require('./utils/validation')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())


app.post("/signup",async (req,res)=>{
    try {
        signUpValidation(req); 
        const { firstName, lastName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: hashedPassword });
        console.log(user);
        await user.save();

        res.status(201).send("New user data saved successfully");
    } catch (err) {
        console.error("Error while saving user data:", err.message);

        // Send error response
        res.status(500).send("Error saving user data"+ err.message);
    }
})

app.post('/login',async (req,res)=>{
    try {
        const {emailId,password} = req.body
        const user = await User.findOne({emailId:emailId})
        if(!user)
        {
            throw new Error('email id is not present in db')
        }
        const isPasswordValid = await User.validatePassword(password)
        if(isPasswordValid)
        {
            const token = await user.getJWT()
            res.cookie("token",token,{expires: new Date(Date.now()*8*360000)})
            res.send("login  successful")
        }else
        {
            throw new Error("wrong password")
        }
    } catch (error) {
        res.status(400).send('wrong credentials')
    }
})

app.get('/profile',async (req,res)=>{
    try {
        
        const user = req.user
        
        res.send(user)
    } catch (error) {
        
    }
})

connectDB().then(()=>{
    console.log("database iss connected successful");
    app.listen(3000,()=>{
        console.log("Server is listening on port 3000");
    })
}).catch((err)=>{
    console.log("getting error while connecting with database");
})

