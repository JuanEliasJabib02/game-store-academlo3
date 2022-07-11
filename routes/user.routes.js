const express = require('express')
// Controllers  -> Son las funciones que envian la respuesta al cliente

const { singUp, getUsers, login, updateUser } = require('../controllers/user.controller');
const { userExist } = require('../middleware/user.middleware');



const usersRouter = express.Router(); 


//endpoints

usersRouter.get('/', getUsers);
usersRouter.post('/singup', singUp);
usersRouter.post('/login', login);
usersRouter.patch('/:id', userExist, updateUser)



module.exports = { usersRouter }