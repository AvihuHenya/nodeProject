module.exports = (validator) => async (req, res, next) => {
    try {
        const validated = await validator.validateAsync(req.body);
        req.body = validated;
        return next();
    } catch (err) {
        if (err.isJoi) {
            next(`Unprocessable Content ${err.message}`)
        }
        return next("Something bad happend")
    }
}