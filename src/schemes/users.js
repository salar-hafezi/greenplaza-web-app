import * as Joi from '@hapi/joi';

const name_schema = Joi.string()
    .min(2)
    .max(35)
    .pattern(new RegExp('^[a-zA-Z]+$'))
    .required();

const password_schema = Joi.string()
    .max(32).error(new Error('Password must be at most 32 characters'))
    .min(8).error(new Error('Password must be at least 8 characters'))
    .required();

const mobile_schema = Joi.string().error(new Error('mobile is required'))
    .length(10)
    .pattern(new RegExp('^[0-9]+$'))
    .required();

const otac_schema = Joi.string()
    .length(8)
    .required();

const registerSchema = Joi.object().keys({
    first_name: name_schema,
    last_name: name_schema,
    mobile: mobile_schema,
    password: password_schema
});

const loginSchema = Joi.object({
    mobile: mobile_schema,
    password: password_schema,
});

export const userSchemes = {
    mobile_schema,
    otac_schema,
    loginSchema,
    registerSchema,
};
