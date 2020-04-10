const router = require('express').Router()
const sendmail = require('./mail')
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt  =  require('jsonwebtoken')
const {regesterValidation,loginValidation} =  require('../config/validation')

router.post("/register",async(req,res)=>{
    //Validate the data
    const {error} = await regesterValidation(req.body)
    if (error)  return res.send(
      { error:error.details[0].message}
            
            ).status(404)
    
    //check if the User already exist  in the Database

    const EmailExist =  await User.findOne({email:req.body.email})
    

    //Hash  the Paasword 
     let salt  =  await bcrypt.genSalt(10)
     const HashPassword =  await bcrypt.hash(req.body.password,salt)
     if(EmailExist) return res.send({
         error:"Email already exist please try  again"
     }).status(404)


     //to go to the reset page  or forgot passwoard
    //take the user data and create  a new user
  const users = new User({
        name:req.body.name,
        email:req.body.email,
        password :HashPassword,
        phone_number:req.body.phone_number,
    })
    //Save user to  the database 
    try{
        const SavedUser = await users.save()
        res.status(200).send(SavedUser)
        //Send the Mail  to  the user
        sendmail(SavedUser.email,"Your account has been created")
    }catch(err){
        res.status(404).send(err)
        }
})
router.post("/login", async(req,res)=>{
    //validate
    const {error} = loginValidation(req.body)
   // console.log(error)
    //send the Error the user
    if(error) return res.send(
       res.send ({error:error.details[0].message}).status(404)
    )
        //check if the user exist in the Database
        const UserExist = await  User.findOne({email:req.body.email})
        if(!UserExist) return res.send(
            {error:"Email does not Exist  Pleaase create an Account"}
        )

        //check  if the Password Match
        const validPass =  await bcrypt.compare(req.body.password,UserExist.password)
        if(!validPass) return res.send(
            {error:"password not Valid please check you password  and try  again"}
        ).status(404)
            //Create and Assign User token 
    const token = jwt.sign({ email:req.body.email },"qwertyuioqwerui",{ expiresIn: 12960 })
            res.header("Authoraization",token).send(token)
})

module.exports = router