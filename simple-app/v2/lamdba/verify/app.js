var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "Your Gmail ID",
        pass: "Gmail Password"
    }
});
var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});

app.get('/send',function(req,res){
    
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});



//SM


function sendVerificationeMail(email) {
    var link;
    generateToken(function(data){
        link = process.env.mailLink+"email-verification?id="+data
        //link = config.mail.link+"email-verification?id="+data
    });

    var fromMail = new helper.Email(config.mail.adminMail);
    var toMail = new helper.Email(email);
    var subject = 'Services Marketplace - Please confirm your Email account';
    var content = new helper.Content('text/plain', 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>');
    var mail = new helper.Mail(fromMail, subject, toMail, content);
}

function generateToken(email, callback) {
    // callback(jwt.sign({
    //             email: email,
    //             time: new Date().getTime()
    //         }, config.security.secretKey));

    callback(jwt.sign({
                email: email,
                time: new Date().getTime()
            }, process.env.secretKey));
}
