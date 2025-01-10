const express = require('express')
const { connectionRequestModel } = require('../modal/connectionRequest')
const {userAuth} = require('../middlewere/auth')
const user = require('../modal/user')
const requestRoute = express.Router()
requestRoute.get('/request/send/:status/:toUserId',userAuth, async (req,res)=>{
    try {
        
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status
        const allowedStatus = ['ignored','interested']
        if(!allowedStatus.includes(status))
        {
            return res.status(400).json({message:"invalid status code"})
        }
        const user = user.findOne(toUserId)
        if(!user)
        {
            return res.status(400).json({message:"user not exist"})
        }
        const connectionRequest = new connectionRequestModel({
            fromUserId,toUserId,status
        })

        const existingConnectionRequest = await connectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        if(existingConnectionRequest)
        {
            return res.status(400).send('connection request already exist')
        }
        const data = await connectionRequest.save()

        res.json({
            message: "request send successful",
            data
        })

        
       
    } catch (error) {
        res.status(400).send('got error while sending request ' + error.message)
    }
})
module.exports  = requestRoute