const mongoose = require('mongoose');
const config = require('config');
const axios = require('axios');
const cheerio = require ('cheerio');
const util = require ('util');
const mysql = require ('mysql2');
const { symbol } = require('@hapi/joi');


const pool = mysql.createPool({
    host: "localhost",
    user: "username",
    password: "password",
    database: 'mydb',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
  });
  
pool.query = util.promisify(pool.query);
pool.execute = util.promisify(pool.execute)


const symbolSchema = new mongoose.Schema({
    symbol: String,
    timestamp : Date,
    rate: Number
});

const Symbol = mongoose.model('Symbols', symbolSchema);


const scrape = async (symbol) => {
    const html = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const cryptoRate = cheerio.load(html.data);
    const value = cryptoRate(`.YMlKec.fxKbKc`).text().replace(",",""); 

    const data = new Symbol ({
        symbol : symbol,
        timestamp : new Date(),
        rate : value
    })  

    await data.save();

    console.log("symbol created, check in mongo");

}



// setInterval(()=>{
//     scrape("BTC")
// }, config.get('worker.interval'))


const loop = async() => {
    const symbols = await pool.execute("select distinct symbol from users_symbols");
    const promises = symbols.map(({symbol}) => scrape(symbol));
    await Promise.allSettled(promises);
    setTimeout(loop, 10000)
}

( async () => {
    try {
        await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`);
        console.log("connected succuesfuly to mongoDB");
        loop();
    } catch (err) {
        console.log(err);
    }
}
)