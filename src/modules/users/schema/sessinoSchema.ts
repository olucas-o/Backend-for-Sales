const { celebrate, Joi } = require('celebration');

export const sessionSchema = celebrate({
body: Joi.object({
email: Joi.string().email().required(),
password: Joi.string().required()
})
});

