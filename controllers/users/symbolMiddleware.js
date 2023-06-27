const createHttpError = require("http-errors");

module.exports = (validator) => async (req, res, next) => {
    try {
        const validated = await validator.validateAsync(req.body);
        req.body = validated;
        return next();
    } catch (err) {
        if (err.isJoi) {
            //return next(`Unprocessable Content ${err.message}`)
            return next (createHttpError(422, {message : err.message}))
        }
        return next(createHttpError(500))
    }
}