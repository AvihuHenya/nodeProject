module.exports = (req, res, next) => {
    if (req.method == 'POST') {
        console.log(res.statusCode)
    }
    next()
}