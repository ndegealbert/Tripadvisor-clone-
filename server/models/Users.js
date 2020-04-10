const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({ 
    name:{
        type:String,
        require:true,
        min:6,
        max:234
    },
    email:{                       
        type:String,
        required:true,
        min:6,
        max:256,

        
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:256,
},

    phone_number:{
        type:String,
        required:true,
        min:10,
        max:250
    },
        date:{
        type:Date,
        default:Date.now
    }


 })

 module.exports = mongoose.model("User", userSchema)


 