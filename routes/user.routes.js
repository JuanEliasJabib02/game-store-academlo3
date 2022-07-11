const express = require('express')
// Controllers  -> Son las funciones que envian la respuesta al cliente

const { singUp, getUsers, login } = require('../controllers/user.controller')



const usersRouter = express.Router(); 


//endpoints

usersRouter.get('/', getUsers);
usersRouter.post('/singup', singUp);
usersRouter.post('/login', login)




module.exports = { usersRouter }