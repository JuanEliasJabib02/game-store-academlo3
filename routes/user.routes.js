const express = require('express')
// Controllers  -> Son las funciones que envian la respuesta al cliente

const { singUp, getUsers, login, updateUser, deleteUser } = require('../controllers/user.controller');
const { userExist, validateUser } = require('../middleware/user.middleware');
const { createUserValidators } = require('../middleware/validatores.middleware');





const usersRouter = express.Router(); 


//endpoints

usersRouter.get('/', getUsers);
usersRouter.post('/singup', createUserValidators,singUp);
usersRouter.post('/login', login);
usersRouter.patch('/:id', userExist, validateUser, updateUser)
usersRouter.delete('/:id', userExist,validateUser, deleteUser)



module.exports = { usersRouter }