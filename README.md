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









********************************************SEASON 3*********************************************************
#EPISODE1 -: DEPLOYMENT

CREATE EC2 INSTANCE
1-create aws account 
2- select basic support free version
3- Search EC2 and launch new instance 
4- Create key pair login (it will create pem file)
5- Wait for instance state to "running" and status check "2/2 passed"

CONNECT TO INSTANCE
1- Got to EC2->instance->{id}->connect to instance  
2- Select ssh client
3- Open terminal and got to pem file location where it has stored
4- Change its permission cmd: chmod 400 <file-name>.pem
5- Enter ssh command to logged into machine eg: ssh -i <file-name>.pem <instance-url>
6- Type 'exit' to exit form machine(Optional)

INSTALL REQUIRED SOFTWARES ON NEW OS
1- Install node in machine(make sure the version is same as local)
2- Exit form machine and install node version after nvm
3- Clone git repos in machine


DEPLOYING FRONTEND PROJECT
1- Go to frontend cloned project folder 
2- Install dependencies cmd: npm i 
3- Run npm run build(it will create build)
4- To host frontend project we use NGINX 
4- Update packages cmd: sudo apt update
5- Install NGINX cmd: sudo apt install nginx
6- start NGINX cmd: sudo systemctl start nginx
7- Enable NGINX cmd: sudo systemctl enable nginx 
8- Then we have upload build into http sever repository i.e NGINX
9- Copy code from dist(build file ) and past into NGINX http server (/var/www/html/)
10- Cmd: sudo scp -r dist/* /var/ww/html/ (U should in project folder)
11- NGINX is deployed on port 80 we have to enable it
12- Go to EC2-> security group -> Edit inbound rule   (add custom tcp with port 80)


DEPLOYING BACKEND PROJECT
1- Got to backend cloned project folder
2- install dependencies cmd: npm id
3- If  we change something in local and push code then have to take pull on server also
4- Copy public ip form EC2 and add to mongodb network access (already made it public)
5- Go to EC2-> security group -> Edit inbound rule   (add custom tcp with port 7777)
5- We have run backend on background for the we use pm2 package cmd: npm i pm2 -g
6-command:
    To run project Goto project folder and enter cmd: pm2 start npm -- start
    To check logs use cmd: pm2 log
    to check list of processes use cmd:pm2 list
    To stop processes use cmd: pm2 stop <name_of_process>
    To delete processes use cmd:pm2 delete <name_of_process>
    To give name to processes use cmd: pm2 start npm --name "name_of_process" -- start


MAPPING DOMAIN FRONTEND AND BACKEND(CONFIGURE NGINX)
1- In terminal go to root directory and hit cmd: sudo nano /etc/nginx/sites-available/default
2- Add nginx config : 

    server_name 43.204.96.49;N

    location /api/ {
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
3- Restart NGINX
4- Change base url to /api
5- Deploy frontend again

*************************EP 7 PAYMENT GATEWAY INTEGRATION***********************
-it will done with 2 stapes 1)Create Order 2)Payment verification 
-signup in rayzor pay and complete kyc
#Flow:-
    -When user click pay button from the frontend it make api call that time to backend for "create order" 1st step
    -In backend have secrete key with the secrete ke and create order backend send it to razorpay
    -Razorpay send order id to backend that id backend send to frontend
    -With the order id payment has been done with generated QR
    -Then webhook is get called about payment is success or not with signature id
    -Then payment verification api get called from frontend and backend send success/fail response based on webhook signature 
    





