const Joi = require('@hapi/joi');

const registerValidation = data => {
    const registerSchema = Joi.object({
        // fullname: Joi.string().min(6).max(50).required(),
        // dob: Joi.string().min(6).max(50).required(),
        // username: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(8).max(50).required().email(),
        password: Joi.string().min(6).max(50).required(),
        role: Joi.string().min(3).max(15).required()
    });

    return registerSchema.validate(data);
}

const loginValidation = data => {
    const loginSchema = Joi.object({
        //username: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(8).max(50).required().email()
    });

    return loginSchema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation
}