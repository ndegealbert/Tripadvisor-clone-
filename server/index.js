var express = require('express')
var app  = express()
var mongoose  = require('mongoose')
var cors = require('cors')
const  logger = require('./config/logger')
const bodyParser = require('body-parser')

var mongoDB = 'mongodb+srv://Albert:Albert@ricto-g6vpu.mongodb.net/project?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { 
  useNewUrlParser: true,
  useUnifiedTopology: true

});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.on('connection',console.log("Coonected to  the Database "))



//Connect  to  the atlas  Database 
/**mongoose.connect('mongodb+srv://Albert:Albert@ricto-g6vpu.mongodb.net/project?retryWrites=true&w=majority',
    { 
      useUnifiedTopology: true,
      useNewUrlParser: true
    },

    () => {
      logger.log('info',"Connected to Db")
    })
*/
    //helper  middlware
  

    //middlwre  used in the Application 
    app.use(cors())
  
    // parse application/x-www-form-urlencoded
   app.use(bodyParser.urlencoded({ extended: false }))
  
    // parse application/json
  app.use(bodyParser.json())
 
//import Routes
var auth= require('./routes/auth')
var payment = require('./routes/payment')
var coments =  require('./routes/commentM')
var comentn =  require('./routes/commentsN')




//use the  middleware to  define  the Routes to use
app.use("/api/user/",auth)
app.use("/api/payment/",payment)
app.use("/api/comments/",coments)
app.use("/api/comments/",comentn)
  
app.listen(3001,()=>{
    logger.log('info','listening port 3001')
})
