var mongoose =  require('mongoose')

var login_schema =  mongoose.Schema({

    password:{
        type:String,
        required:true,
        min:6,
        max:256,
},
    email:{
        type:String,
        required:true,
        min:6,
        max:255

    }
   
})
module.exports =  mongoose.model('login',login_schema)
