const express = require('express')
const ConnectionRequest = require('../modal/connectionRequest')
const {userAuth} = require('../middlewere/auth')
const User = require('../modal/user')
const requestRoute = express.Router()
const {sendEmail} = require('../utils/sendMail')

requestRoute.post('/request/send/:status/:toUserId',userAuth, async (req,res)=>{
    try {
        
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status))
        {
            return res.status(400).json({message:"invalid status code"})
        }
        const user = await User.findById(toUserId)
        if(!user)
        {
            return res.status(400).json({message:"user not exist"})
        }
     
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
   

        if(existingConnectionRequest)
        {
            return res.status(400).send('connection request already exist')
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,toUserId,status
        })
        const data = await connectionRequest.save()      
        // Email details object
        const emailDetails = {
            from:req.user.emailId,
            to: user.emailId,
            subject: 'You got a request',        // Email subject
            text: 'This is a dynamically sent email.', // Plain text content
            html: '<h1>This is a dynamic HTML email!</h1>', // HTML content
            
        };  
        await sendEmail(emailDetails)

        res.json({
            message: "request send successful",
            data
        })

        
       
    } catch (error) {
        res.status(400).send('got error while sending request ' + error.message)
    }
})

/**
 * when hit review status api logged in user is whom request has been send(toUserID)
 * and request id is id of fromUserId
 */
requestRoute.post('/request/review/:status/:requestId',userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const {status,requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status))
        {
            return res.status(404).json({message: 'status not allowed'})
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId: loggedInUser.id,
            status: "interested"
        })
        if(!connectionRequest)
        {
            return res.status(404).json({message: "connection request not found"})
        }

        connectionRequest.status = status
        const data = await connectionRequest.save()

        res.status(200).json({message:"connection request "+status,data})
    } catch (error) {
        res.status(400).json("error "+error.message)
    }
})
module.exports  = requestRoute