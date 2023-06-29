const usersRoute = require('./routes/users')
const githubRoute = require('./routes/github')
const auth = require('./middlewares/auth');
const config = require('config');
const express = require('express')
const path = require('path');


const app = express()


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const port = config.get('app.port') || 3001;
const host = config.get('app.host') || 'localhost';


app.use('/users', usersRoute)
app.use('/github', githubRoute)
// app.get('auth/github', auth.authenticate('github', { scope: ['user:email']}))

app.use((err, req, res, next) => {
    res.send(err);
});


app.listen(port, host, () => {
    console.log(`Example app listening on ${host}:${port}`)
})