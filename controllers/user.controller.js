

//Utils
const {catchAsync} =require('../utils/catchAsync.util')
const  bcrypt = require('bcryptjs'); // -- > Esta libreria funciona para encriptar la contraseña
const { AppError } = require('../utils/appError.util')
// Models

const { User } = require('../models/users.model');



const singUp = catchAsync(
    async (req,res,next) => {
        const { name, email, password} = req.body;

        /* Encriptar clave */
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt )

        const newUser = await User.create({
            name,
            email,
            password:hashPassword
        });

        newUser.password = undefined;

        res.status(201).json({
            status:"succes",
            newUser,
        })
    }
)

const getUsers = catchAsync(
    async (req,res,next) => {
        
        const users = await User.findAll( {where: { status:'active'}});

        res.status(200).json({
            status:"succes",
            users
        })

    }   
)

const login = catchAsync(
    async (req,res,next) => {

        // Recibir usuario del front
        const { email, password } = req.body;

        // Validar email
        const userOkay = await User.findOne({
          where : { 
            email, 
            status:'active'
          }
        })

        if(!userOkay){
           
            return next( new AppError('email and password wrong'),400)
        }

        const passOkay =  await bcrypt.compare(password, userOkay.password)

        if(!passOkay){
            return next( new AppError('email and password wrong'), 400);
        }
   

    
       res.status(200).json({
            status:"succes",

       })

    }
)


module.exports = { singUp ,getUsers, login}