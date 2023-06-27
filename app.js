const usersRoute = require('./routes/users')
const githubRoute = require('./routes/github')
const guestsRoute = require('./routes/guests')
const config = require('config');
const express = require('express')


const app = express()

app.use(express.urlencoded({extended: false}));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const port = config.get('app.port') || 3001;
const host = config.get('app.host') || 'localhost';


app.use('/users', usersRoute)
app.use('/github', githubRoute)
app.use('/guests', guestsRoute)

app.use((err, req, res, next) => {
    res.send(err);
});


app.listen(port, host, () => {
    console.log(`Example app listening on ${host}:${port}`)
})