const express = require('express');
const router = express.Router();
const Joi = require('express-validation');
const symbolMiddleware = require('../controllers/users/symbolMiddleware')
const symbolController = require('../controllers/users/controlles')


router.get('/welcome', (req, res, next) => {})

router.get('/dashboard', (req, res, next) => {})

router.get('/logout', (req, res, next) => {})

router.post('/addSymbol', symbolMiddleware(symbolController), (req, res, next) => {
    res.send();
})



module.exports = router