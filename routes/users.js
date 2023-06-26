const express = require('express')
const router = express.Router()

// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/welcome', (req, res, next) => {})

router.get('/dashboard', (req, res, next) => {})

router.get('/logout', (req, res, next) => {})

router.post('/symbol', (req, res, next) => {})

module.exports = router