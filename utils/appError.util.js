
/* Esto lo mandamos al global error habdler para manejar los errores de mejor manera 
la respuesta del error que se le manda al cliente
App error es para los errores que podemos controlar y sabemos que pueden ocurrir*/

/* Nos ayuda a debugear */

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);  // Cuando heredamos una clase de otro constructor para poder usar sus atributos debemos invocarla con el metodo super
        
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("5") ? 'fail' : 'error' ;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { AppError }