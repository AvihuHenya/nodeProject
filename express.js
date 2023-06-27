const express = require('express')
const axios = require('axios');
const logger = require('./middlewares/logger')
const formatError = require('./middlewares/formatError')
const jsontoxml = require ('jsontoxml')
const app = express()
const port = 3000
const host = 'localhost';

//const logStatus = require('./middlewares/logStatus')

app.use(express.urlencoded({extended: false}));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


  

const auth =  function (req, res, next) {
    authorization = req.headers.authorization
    if (!auth){
        res.status(401).send();
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
    baseURL = 'https://jsonplaceholder.typicode.com/users';
    try {
        //`${baseURL}/?format=xml&offset=2&limit=2`
        response = await axios.get(baseURL);
        const jsonData = response.data;
        xmlData = jsontoxml(jsonData);        
        
        if (req.query.format){
            if (req.query.format === 'xml'){
                res.status(200).send(xmlData);
            }
            else if (req.query.format === 'json'){
                offset = req.query.offset;
                limit = req.query.limit;

                res.status(200).send(jsonData.slice(offset, limit));

            }
            else (next("not a suppurted format"))
        }
        else {
            res.status(200).send(jsonData);
        } 
    }
    catch (err) {
        res.status(404).send(err)
    }
    
})
app.use(formatError)




const errorHandler = (err, req, res, next) => {
    if (err === "Bad username") {
        res.status(404).send(`Username ${req.body.name} is invalid`);
    }
}

app.use(errorHandler)

app.listen(port, host, () => {
    console.log(`app listening on port ${port}`)
})