
const express = require('express')
const { validateEditProfileData } = require('../utils/validation')

const profileRoute = express.Router()

profileRoute.get('/profile/view',async (req,res)=>{
    try {
        
        const user = req.user
        
        res.send(user)
    } catch (error) {
        
    }
})

profileRoute.get('/profile/edit',async (req,res)=>{
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
        
    }
})

module.exports = profileRoute
