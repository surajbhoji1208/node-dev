const express = require('express')
const connectDB = require('./config/database')

var cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
const requestRoute = require('./routes/request')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/',authRoute)
app.use('/',profileRoute)
app.use('/',requestRoute)





connectDB().then(()=>{
    console.log("database iss connected successful");
    app.listen(3000,()=>{
        console.log("Server is listening on port 3000");
    })
}).catch((err)=>{
    console.log("getting error while connecting with database");
})

