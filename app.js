const express = require('express')
const axios = require('axios');
const config = require('./mainConfig/default.json')
const timer = require('./middlewares/timer')
const jsontoxml = require ('jsontoxml')
const app = express()
const users = require('./routes/users')




const host = config.app.host;
const port = config.app.port;


//const logStatus = require('./middlewares/logStatus')

app.use(express.urlencoded({extended: false}));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

  

// const auth =  function (req, res, next) {
//     authorization = req.headers.authorization
//     if (!auth){
//         res.status(401);
//         res.send()
//     }
//     else if (auth == 'Bearer 123') res.status(401);
//     next()
// }
// app.use(auth)


app.use('/users', users)


// const myLogger = (req, res, next) => {
//     if (req.method == 'POST') {
//         console.log(res.statusCode)
//     }
//     next()
// }

// app.use(myLogger)


function errorHandler (err, req, res, next) {
    console.log(err);
    res.send();
  }

app.use(errorHandler)


app.listen(port, host, () => {
    console.log(`Example app listening on ${host}:${port}`)
})