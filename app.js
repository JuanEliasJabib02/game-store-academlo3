

const express = require('express')
const app = express() 
app.use(express.json())
const {AppError} = require('./utils/appError.util');
const { globalErrorHandler} = require('./controllers/error.controller')
//ROUTERS
const { usersRouter } = require('./routes/user.routes')


//ENDPOINTS

app.use('/api/v1/users', usersRouter);



// Global error handler -> Para que cualquier error que llegue a ocurrir llegue aca
/*  Express siempre maneja como primer argumento el error cuando le pasamos 4 argumentos */
app.use(globalErrorHandler);



module.exports = { app }