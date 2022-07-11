

const express = require('express')
const app = express() 
app.use(express.json())
//AppError
//GlobalErrorHandler
//ROUTERS
const { usersRouter } = require('./routes/user.routes')


//ENDPOINTS

app.use('/api/v1/users', usersRouter);



module.exports = { app }