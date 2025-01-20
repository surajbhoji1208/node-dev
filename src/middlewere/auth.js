const jwt = require('jsonwebtoken')
const User = require('../modal/user')

const userAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token)
        {
         return res.status(401).json({message:"Token is not valid"})
        }
        const decodeObj = await jwt.verify(token,'DEV@Tinder$790')
        const {_id} = decodeObj
        const user = await User.findById(_id);

        if(!user)
        {
            throw new Error('user not found')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

module.exports = {userAuth}