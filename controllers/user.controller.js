

const  bcrypt = require('bcryptjs'); // -- > Esta libreria funciona para encriptar la contraseña
const jwt = require('jsonwebtoken') // para crear los gafetes
const dotenv = require('dotenv')
//Utils
const {catchAsync} =require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')
// Models

const { User } = require('../models/users.model');

dotenv.config( {path:'./config.env'});

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

        const token =  await jwt.sign({ id: userOkay.id}, process.env.JWT_LOGIN, {
            expiresIn: "5m", // Este token dura 5m
        }) 
                  // Meto dentro del token el id del usuario, la firma , tiempo de vida del token
   
    
       res.status(200).json({
            status:"succes",
            token,

       })

    }
)


const updateUser =  catchAsync(async(req, res, next) => {

    const { user } = req;

    const {name, email} = req.body;

    await user.update({ name, email,})

    res.status(204).json(
    {
        status:"sucess",
    })
   
 });


  const deleteUser = catchAsync(
     async (req,res) => {

        const { user } = req;

        await user.update({status:"disabled"})
       
        
        res.status(200).json(
            {
                status:"succes"
            }
        )
     })
  



module.exports = { singUp ,getUsers, login, updateUser, deleteUser }