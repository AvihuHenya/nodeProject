const Joi = require('joi'); 

module.exports = Joi.object({
    symbol: Joi.string().required().length(3).alphanum().uppercase()
});
