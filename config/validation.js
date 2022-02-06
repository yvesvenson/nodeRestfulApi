const Joi = require('@hapi/joi');

const registerValidation = data => {
    const registerSchema = Joi.object({
        email: Joi.string().min(8).max(50).required().email(),
        password: Joi.string().min(6).max(50).required(),
        role: Joi.string().min(3).max(15).required()
    });

    return registerSchema.validate(data);
}

const loginValidation = data => {
    const loginSchema = Joi.object({
        password: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(8).max(50).required().email()
    });

    return loginSchema.validate(data);
}

const emailValidation = data => {
    const emailSchema = Joi.object({
        email: Joi.string().min(8).max(50).required().email()
    });

    return emailSchema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation,
    emailValidation
}