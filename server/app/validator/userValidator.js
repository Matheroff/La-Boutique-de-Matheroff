const Joi = require("joi")

const validateUser = (user) =>  {
    const result = Joi.object({
        pseudo: Joi.string().min(3).max(100).presence("required"),
        email: Joi.string().email().presence("required"),
        password: Joi.string().min(3).max(100).presence("required")
    })
    .required()
    .validate(user, { abortEarly: false }).error // abortEarly : permet à la vérification de ne pas s'arrêter à la première erreur
    
    if(result) {
        const errorMessage = result.details.map((error) =>  ({
            message: error.message,
        }))
        return {
            errorCount: result.details.length,
            errorMessage
        }
    }
    return false
}

module.exports = validateUser;