const express = require('express')
const schema = require('../controllers/symbolValidation')
const router = express.Router()



router.get('/welcome', (req, res) => {
    res.send('Birds home page')
})
router.get('/dashboard', (req, res) => {
    res.send('About birds')
})

router.get('/logout', (req, res) => {
    res.send('About birds')
})
router.post('/symbol', async (req, res, next) => {
    if (req.body.name) {
        symbolName = req.body.name;
        try {
            const value = await schema.validateAsync(reqBody);
            console.log(value);
            res.status(200).send();
        }
        catch (err) { next(err) }
    }
    else {
        res.status(404);
        next("err");
    }
})    



  module.exports = router