const router = require('express').Router()
const authmid =  require('../middleware/authmi')
const Coments = require('../models/CommentsM')

//authmid 
//for tokent  Authentication 
router.post("/mombasa", authmid ,async(req,res)=>{

    console.log(req.body.comment)
    const comments = new Coments({
        comment:req.body.comment,  
    })
    
    //Save commnet to  the Database
    try{
        const comment = await comments.save()
        res.status(200).send(comment)
    }catch(err){
        res.status(404).send(err)
        }

    // res.status(200).json({
    //     auth:"Authorized to make coments"
    // })

})

router.get("/mombasa", authmid,async(req,res) =>{

    //retrive comments from the database
    //UserEmail
    console.log(req.email)

    const comment =  await Coments.find() 
    res.status(200).send(comment)
   

})
module.exports =  router