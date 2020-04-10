const jwt =  require('jsonwebtoken')

module.exports =function (req,res,next){

    const token =  req.header('Authoraization')
    const decode = jwt.verify(token,'qwertyuioqwerui')
    req.body =decode
    next()
}
