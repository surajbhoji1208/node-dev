const express = require('express')
const connectDB = require('./config/database')

const app = express()
var cookieParser = require('cookie-parser')
var cors = require('cors')
require('dotenv').config()
require("./utils/cronJob")

app.use(  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
  
app.use(express.json())
app.use(cookieParser())

const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
const requestRoute = require('./routes/request')
const userRoute = require('./routes/user')

app.use('/',authRoute)
app.use('/',profileRoute)
app.use('/',requestRoute)
app.use('/',userRoute)





connectDB().then(()=>{
    console.log("database iss connected successful");
    app.listen(3000,()=>{
        console.log("Server is listening on port 3000");
    })
}).catch((err)=>{
    console.log("getting error while connecting with database");
})

