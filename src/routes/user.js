const express = require('express')
const ConnectionRequest = require('../modal/connectionRequest')
const {userAuth} = require('../middlewere/auth')
const userRoute = express.Router()


userRoute.get("/user/request/received",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId",["firstName","lastName" ,"age" ,"gender" ,"about" ,"profile" ,"skills"])  

        res.status(200).json({message:"data fetched successfully" ,connectionRequest})

    } catch (error) {
        res.status(404).json({message:"Error"+error.message})
    }
})

userRoute.get("/user/connections",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName" ,"age" ,"gender" ,"about" ,"profile" ,"skills"])

        const data = connectionRequest.map((res)=>{
            if(row.fromUserId._id.toString() == loggedInUser._id.toString())
            {
                return row.toUserId
            }
            return row.fromUserId
        })

        res.json({data})
    } catch (error) {
        res.status(404).json({message:"error"+error.message})
    }
})

module.exports = userRoute

