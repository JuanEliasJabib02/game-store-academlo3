const {body,validationResult} = require('express-validator')

const { AppError } = require('../utils/appError.util');

/* Validationresult nos ayuda a validar si las condiciones puestas en el body se cumplen */
const checkResut = (req, res, next) => {

    const errors = validationResult(req);

    console.log(errors);
    /* si errors no esta vacio */
    if(!errors.isEmpty()){

        const errorMsgs = errors.array().map(err => err.msg); // Esta funcion regresa mi arreglo de errores   
        const message = errorMsgs.join('. ')
        return next(  new AppError(message, 500));
    }

    next()
}
        /* Creo un arreglo de middlewares */
const createUserValidators = [

         /* Con el body le indicamos los campos obligatorios del modelo que requerimos para ejecutar el endpoint 
            , miramos en el controlador lo que requerimos para crear el usuario */
            body('name')
            .notEmpty()//Este metodo nos permite indicar que este campo no puede estar vacio
                .withMessage('Can not be empty'),// Con este metodo le ponemos un mensaje a la condicion que mostrara en el  al cliente si no se cumple
        body('age')
            .isNumeric() // Este metodo nos permite poner la condicion que tiene que ser numerico
                .withMessage('Age must be a number'),
        body('email')
            .isEmail() // Este metodo revisa que tenga lo necesario para ser un email
                .withMessage('Must provide a valid email'),
        body('password')
            .isLength({min:8})// para que el minimo de caracteres sea 8
                .withMessage('password must be at least 8 characters long') // A cada condicion le podemos poner un mensaje por si no se cumple una
            .isAlphanumeric() // Este metodo hace que tenga que tener numeros y letras
                .withMessage('password must contain letters and numbers'),             
        checkResut,  // Para que valide las condiciones del body con ayuda de Validation Result
]

module.exports = { createUserValidators } /* Exporto el middleware */