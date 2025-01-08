const express = require('express')

const requestRoute = express.Router()
requestRoute.get('/request',async (req,res)=>{
    try {
        
        const user = req.user
        
        res.send(user)
    } catch (error) {
        
    }
})
module.exports  = requestRoute