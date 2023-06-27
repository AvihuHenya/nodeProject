const mysql = require('mysql2');
const util = require('util');
const config = require('config');

const connection = mysql.createConnection({
  host: config.get('mysql.host'),
  user: config.get("username"),
  password: "password",
  database: 'mydb',
});

// connection.connect = util.promisify(connection.connect);
myNewFunc = util.promisify(connection.connect).bind(connection);

(async () => {
  try {
    // await connection.connect();
    await myNewFunc();
    console.log("Connected!");

    await connection.query(`
      CREATE TABLE users (
        id int auto_increment,
        username varchar(255) not null,
        password varchar(255) not null,
        email varchar(255) not null,
        birthday date not null,
        primary key (id)
      )    
    `);

    await connection.query(`
      insert into users (username, password, email, birthday)
      values ('Avihu', 'password', 'Avihu@gmail.com', '1996-12-25')
    `);
    console.log("user inserted!");
    console.log("created table users!");
  } catch (e) {
    console.log(e);
  }
})();

