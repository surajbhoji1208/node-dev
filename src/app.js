const express = require('express')
const connectDB = require('./config/database')
const User = require('./modal/user')

const app = express()
app.use(express.json())

app.post("/signup",async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.send("new user data saved")
    }catch(err){
        console.log("getting error while saving ths user data");
    }
})

app.get('/feed',async(req,res)=>{
    try {
        
        const user = await User.find({})
        res.send(user)
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})

app.get('/user',async(req,res)=>{
    try {
        const user = await User.find({emailId:req.body.emailId})
        res.send(user)
    } catch (error) {
        res.status(400).send("something went wrong")
        
    }
})

app.delete('/user',async (req,res)=>{
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
    } catch (error) {
        res.status(400).send("something went wrong")
        
    }
})
app.patch('/user',async (req,res)=>{
    const userId = req.body.userId
    const data = req.body
    try {
        const user = await User.findByIdAndUpdate({_id:userId},data,{runValidators:true})
        res.send("user update successfully")
    } catch (error) {
        res.status(400).send("something went wrong")  
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

