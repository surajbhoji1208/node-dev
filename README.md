# node-dev

************\*\*\*\*************EP 5**************\*\*\*\***************
#Middleware and Error handling
what is use of next
-> app.use("path",
(res,req,next)=>{
log("1")
res.send("1st")
next()
},
(res,req)=>{
log("2")
res.send('2nd')
}
)

above code is worked perfectly but we got error after 2nd log next is use to handle next rout function 
