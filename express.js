const express = require('express')
const axios = require('axios');
const timer = require('./middlewares/timer')
const jsontoxml = require ('jsontoxml')
const app = express()
const port = 3000
const host = 'localhost';

//const logStatus = require('./middlewares/logStatus')

app.use(express.urlencoded({extended: false}));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})
  

const auth =  function (req, res, next) {
    authorization = req.headers.authorization
    if (!auth){
        res.status(401);
        res.send()
    }
    else if (auth == 'Bearer 123') res.status(401);
    next()
}
app.use(auth)


app.post('/', (req, res, next) => {
    console.log("*POST*");
    if (req.body.name !== 'avihu') {
        next("Bad username");
    }
    next()
    res.status(200).send("good username");
    
})

app.get('/', (req, res, next) => {
    console.log("*GET*");
    
    next()
    res.send()
})

app.get('/users', async (req, res, next) => {
    usersURL = 'https://jsonplaceholder.typicode.com/users';
    responce = await axios.get(usersURL);
    data = responce.data;
    
    try {
        if (req.query.format === 'xml'){
            res.status(200).send(jsontoxml(data));
        }
        else if (req.query.format === 'json'){
            res.status(200).send(jsontoxml(data));
        }
        response = await axios.get(`${usersURL}/?format=xml&offset=2&limit=2`);
        const data = response.data;
        xml = jsontoxml(data);        
        res.status(200).send(xml); 
    }
    catch (err) {
        res.status(404).send(err)
    }
    
})

const myLogger = (req, res, next) => {
    if (req.method == 'POST') {
        console.log(res.statusCode)
    }
    next()
}
app.use(myLogger)



app.use(timer)

function errorHandler (err, req, res, next) {
    if (err === "Bad username") {
        res.status(404).send(`Username ${req.body.name} is invalid`);
    }
    
  }

app.use(errorHandler)
