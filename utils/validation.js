import Joi from 'joi';

/**
 * Validate user inputs at registration
 * @param {object} user
 * @returns {object} returns value and error
 */
export function registerValidation (user) {
    const schema = Joi.object({
        username: Joi.string().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(512).required()
    });

    return schema.validate(user);
}

/**
 * Validate user inputs at login
 * @param {object} user
 * @returns {object} returns value and error
 */
export function loginValidation (user) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(512).required()
    });

    return schema.validate(user);
}
