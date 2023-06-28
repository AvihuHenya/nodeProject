const Joi = require('joi');

const schema = Joi.object({
    symbol: Joi.string()
        .alphanum()
        .length(3)
        .required()
        .uppercase()
})

module.exports = schema