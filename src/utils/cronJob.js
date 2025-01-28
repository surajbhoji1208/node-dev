const { subDays, startOfDay, endOfDay } = require("date-fns")
const cron = require("node-cron")
const ConnectionRequest = require("../modal/connectionRequest")
const {sendEmail} = require("../utils/sendMail")

cron.schedule("0 8 * * *", async ()=>{
    try {
        const yesterday = subDays(new Date(),1)
        const startDate = startOfDay(yesterday)
        const endDate = endOfDay(yesterday)

        const pendingRequests = await ConnectionRequest.find({
            status: "interested",
            createdAt: {
                $gte: startDate,
                $lt: endDate,
              },
        }).populate("fromUserId toUserId");

        const listOfEmails = [
            ...new Set(pendingRequests.map((req) => req.toUserId._id)),
          ];        console.log(listOfEmails);
        if(!listOfEmails[0])
        {
            return
        }
        for(const email of listOfEmails)
        {
            const emailDetails = {
                to:email,
                subject: 'Pending request',        // Email subject
                text: 'This is a dynamically sent email.', // Plain text content
                html: '<h1>Please accept or reject pending request !</h1>', // HTML content
                
            };  
            try {
                await sendEmail(emailDetails)
            } catch (error) {
                console.log("sent mails fail",error);
                
            }
        }
        

    } catch (error) {
        console.log(error);
        
    }
})