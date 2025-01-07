const jwt = require('jsonwebtoken')
const User = require('../modal/user')

const userAuth = async(req,res)=>{
    try {
        const token = req.cookies
        if(!token)
        {
            throw new Error("token is not valid")
        }
        const decodeObj = await jwt.verify(token,'DEV@Tinder$790')
        const {_id} = decodeObj
        const user = await User.find(_id)

        if(!user)
        {
            throw new Error('user not found')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(400).send('Error: '+error.message)
    }
}

module.exports = {userAuth}