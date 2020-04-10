const router = require('express').Router()
const authmid =  require('../middleware/authmi')
const Coments = require('../models/commentsN')

//authmid 
//for tokent  Authentication 
router.post("/nairobi", async(req,res)=>{

    console.log(req.body.comment)
    const comments = new Coments({
        comment:req.body.comment,  
    })
    
    //Save commnet to  the Database
    try{
        const comment = await comments.save()
        res.status(200).send(comment)
        console.log(comment)
    }catch(err){
        res.status(404).send(err)
        }

    // res.status(200).json({
    //     auth:"Authorized to make coments"
    // })

})

router.get("/nairobi", async(req,res) =>{

    //retrive comments from the database
    
    const comment =  await Coments.find() 
    res.status(200).send(comment)
    console.log(comment)

})
module.exports =  router