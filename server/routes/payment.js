const router = require('express').Router()
const request = require('request')
const prettyjson = require('prettyjson');
const bodyParser = require('body-parser')
const SendMail = require('./mail')
const auth = require('../middleware/authmi')


const options = {
    noColor: true
};

// create an express app and configure it with boadyParser middleware
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//get the verification token  
router.get("/token", (req, res) => {
    //token  from  safaricom server 
    var request = require('request'),
        consumer_key = "wR1fsgghcJQ9NPHb328IkRHLuCJubRvz",
        consumer_secret = "fwk2CX2chLgSMxfq",
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    	let auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");

    request(
        {
            url: url,
            headers: {
                "Authorization": auth
            }
        },
        function (error, response, body) {
            // TODO: Use the body object to extract OAuth access token

            res.status(200).send(JSON.parse(body))
        }
    )

})


//A midlware to  provaide with  Access Token
function Access(req, res, next) {
    //token  from  safaricom server 
    var request = require('request'),
        consumer_key = "wR1fsgghcJQ9NPHb328IkRHLuCJubRvz",
        consumer_secret = "fwk2CX2chLgSMxfq",
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    	let auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");

    request(
        {
            url: url,
            headers: {
                "Authorization": auth
            }
        },
        function (error, response, body) {
            // TODO: Use the body object to extract OAuth access token
            //res.status(200).send(JSON.parse(body))
            req.Access = JSON.parse(body)

            next()
        }
    )


}
// router.get("/toke", Access, (req, res) => {

//     res.send(req.Access.access_token)
// })
//process the payment request 
router.post("/payment" ,auth,Access, (req, res) => {
        var request = require('request'),
        oauth_token = req.Access.access_token;
        console.log(oauth_token)

    let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    let auth = "Bearer " + oauth_token

    //Remove Zero  from  the number
    var number = req.body.phoneNumber
    let finalnumber  = 254 + number.slice(1,10) 
    console.log(req.body.amount)


    request(
        {
            method: 'POST',
            url: url,
            headers: {
                "Authorization": auth
            },
            json: {
                "BusinessShortCode": "174379",
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTkxMDEwMjAyMTAy",
                "Timestamp": "20191010202102",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": req.body.amount,
                "PartyA": +254791082022,
                "PartyB": "174379",
                "PhoneNumber":finalnumber,
                "CallBackURL": "https://4bc71f1d.ngrok.io/callback",
                "AccountReference": "project presentaion ",
                "TransactionDesc": "test"
            }
        },
        function (error, response, body) {
            // TODO: Use the body object to extract the response
      
                console.log(req.email)
                SendMail(req.email ,`You payment of ${req.body.amount} at this time has ben  received ..Thank You`)
            

            res.status(200).send(body)
           


        }
    )

})

// C2B ValidationURL - /api/v1/c2b/validation

router.post('/callback', (req, res) => {
    console.log('-----------Received M-Pesa callback  url-----------');

    // format and dump the request payload recieved from safaricom in the terminal
    console.log(prettyjson.render(req.body, options));
    console.log('-----------------------');

    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success"
    };

    // respond to safaricom servers with a success message
    res.json(message);
});
module.exports = router