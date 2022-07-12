const { User } = require('../models/users.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');
const jwt = require('jsonwebtoken') // para crear los gafetes
const dotenv = require('dotenv')



const userExist = catchAsync(
    async (req,res,next) => {
        
        const {id} = req.params;

        const user = await User.findOne( { where: { id } })

        if(!user){
            return next( new AppError ('User not found', 404))
        }
         
        req.user = user;
        next();
    }
  
)


const validateUser = catchAsync(
    async (req,res,next) =>{
        console.log(req.headers);
    // Extraemos el token 
    let token = undefined;

    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next( new AppError('Invalid Token'), 403);
    }

    console.log(token);

     // Validar si el token caduco
     const decoded = await jwt.verify(token, process.env.JWT_LOGIN)

     console.log(decoded.id)
 
     const userActive = await User.findOne( { where: { id : decoded.id}, status:"active"})
 
     if(!userActive) {
         return next(new AppError("The owner of this token dont exist anymore", 403))
     }
     req.userActive = userActive;
     next();
    }

    
    
    
)

module.exports = { userExist, validateUser }