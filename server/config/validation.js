var  Joi =  require('@hapi/joi')

//Validation 
const regesterValidation =  data =>{
    const schema = Joi.object({ 
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required(),
        phone_number:Joi.number()
        .integer()
        .min(20)
        .required()
        
        
    })

    
      return  schema.validate(data)
    };
    
    
    const  loginValidation  = data =>{
        const schema = Joi.object({ 
            email: Joi.string()
            .min(6)
            .required()
            .email(),
            password: Joi.string()
            .min(6)
            .required()
        
        })
        return schema.validate(data)
        };
        
    module.exports.regesterValidation = regesterValidation
    module.exports.loginValidation  =  loginValidation 