var  nodemailer = require('nodemailer')

//trying  to  read file for Htm Formating 
// var fs = require('fs')

// const { promisify } = require('util');

// const readFile = promisify(fs.readFile);

const sendmail =(receiver_mail,details)=>{
var  transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'mail.test.com',
    port: 465,
    secure: true,
    transportMethod: 'SMTP',
    auth:{
        user:'albertndege2@gmail.com',
        pass:'@albertmunene'
    }   
});
var  mailOptions = {
    from:'albertndege2@gmail.com',
    to:receiver_mail,
    subject:'Account ',
    html:details

}
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    }

    else{
        
        console.log('Email sent' + info.response)
        
    }
})
}
module.exports = sendmail