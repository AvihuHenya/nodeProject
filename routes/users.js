const express = require('express');
const router = express.Router();
const Joi = require('express-validation');
const addSymbolValidator = require('../controllers/users/symbolMiddleware')
const symbolController = require('../controllers/users/controlles')
const { 
    addSymbol, 
    welcome, 
    dashboard, 
    logout,
} = require('../controllers/users/users.controller');

const mongo = require('../middlewares/mongo');
const { middleware: db } = require('../middlewares/db');

router.use(db);
router.use(mongo);

router.get('/welcome', (req, res, next) => {
    res.render('users/welcome')
})

router.get('/dashboard', (req, res, next) => {
    res.render('users/dashboard')
})

router.get('/logout', (req, res, next) => {})

router.post('/addSymbol', addSymbolValidator(symbolController), (req, res, next) => {
    res.send();
})



module.exports = router