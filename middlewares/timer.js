const timer = (req, res, next) => {
    console.log('Time:', Date.now())
    next()
    
}

module.exports = timer;