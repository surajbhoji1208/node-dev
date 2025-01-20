const express = require('express')
const ConnectionRequest = require('../modal/connectionRequest')
const {userAuth} = require('../middlewere/auth')
const User = require('../modal/user')
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
        const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", ["firstName","lastName" ,"age" ,"gender" ,"about" ,"profile" ,"skills"])
      .populate("toUserId", ["firstName","lastName" ,"age" ,"gender" ,"about" ,"profile" ,"skills"]);

    console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
    } catch (error) {
        res.status(404).json({message:"error"+error.message})
    }
})

userRoute.get("/feed",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequest = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
        }).select("fromUserId toUserId")
        
        const hideUserFromFeed = new Set()
        connectionRequest.forEach(element => {

            hideUserFromFeed.add(element.toUserId.toString())
            hideUserFromFeed.add(element.fromUserId.toString())
            
        });

        const user = await User.find({
            $and:[
                {_id:{ $nin: Array.from(hideUserFromFeed) }},
                {_id:  { $ne: loggedInUser._id }}
            ]
        }).select(["firstName","lastName" ,"age" ,"gender" ,"about" ,"profile" ,"skills"])
          .skip(skip)
          .limit(limit);

        res.json({data:user})
    } catch (error) {
        res.status(400).json(error.message)
    }
})
module.exports = userRoute

