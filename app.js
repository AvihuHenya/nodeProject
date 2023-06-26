const usersRoute = require('./routes/users')
const githubRoute = require('./routes/github')
const guestsRoute = require('./routes/guests')
const config = require('config');
const express = require('express')

const app = express()
const port = config.get('app.port') || 3000;
const host = config.get('app.host') || 3000;


app.use('/users', usersRoute)
app.use('/github', githubRoute)
app.use('/guests', guestsRoute)




app.listen(port, host, () => {
    console.log(`Example app listening on port ${host}:${port}`)
})