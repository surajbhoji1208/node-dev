
const express = require('express')
const { validateEditProfileData } = require('../utils/validation')
const { userAuth } = require('../middlewere/auth')

const profileRoute = express.Router()

profileRoute.get('/profile/view' ,userAuth,async (req,res)=>{
    try {
        
        const user = req.user
        
        res.send(user)
    } catch (error) {
        
    }
})

profileRoute.get('/profile/edit',userAuth,async (req,res)=>{
    try {
        
        if(!validateEditProfileData(req))
        {
            throw new Error("invalid edit request")
        }
        const loggedInUser = req.user

        Object.keys(req.body).forEach((key)=>(loggedInUser[key] =req.body[key]))
       await loggedInUser.save()

        res.json({message:`${loggedInUser.firstName} your profile update successful`,loggedInUser})
    } catch (error) {
        res.status(404).json({message:"error"+error.message})
    }
})

module.exports = profileRoute
