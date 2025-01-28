const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type` 
        }
    }
},{timestamps:true})

/**creating compound index */
connectionRequestSchema.index({fromUserId:1,toUserId:1})

/**pre is act as middleware in schema operation */
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error("Connote send same user request")
    }
    //have to call next becouse it is act like middleware
    next()
})

const connectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports = connectionRequestModel