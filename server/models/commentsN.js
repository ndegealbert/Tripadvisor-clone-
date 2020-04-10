var mongoose =  require('mongoose')

var comment_Schema =  mongoose.Schema({

    comment:{
        type:String,
        required:true,
        min:89,
        max:300
    },

    date:{
        type:Date,
        default:Date.now
    }  
})
module.exports =  mongoose.model('commentsN',comment_Schema)
