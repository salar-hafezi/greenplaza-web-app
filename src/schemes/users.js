import * as Joi from '@hapi/joi';

const passwordSchema = Joi.string()
    .max(32).error(new Error('Password must be at most 32 characters'))
    .min(8).error(new Error('Password must be at least 8 characters'))
    .required();
const mobile_schema = Joi.string().error(new Error('mobile is required'))
    .length(10)
    .pattern(new RegExp('^[0-9]+$'))
    .required();

const loginSchema = Joi.object({
    mobile: mobile_schema,
    password: passwordSchema,
});

export const userSchemes = {
    loginSchema,
};
