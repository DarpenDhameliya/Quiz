const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  connectionLimit: 100,
  host: process.env.DB_HOST, //This is your localhost IP
  user: process.env.DB_USER, // "newuser" created in Step 1(e)
  password: process.env.DB_PASSWORD, // password for the new user
  port: process.env.DB_PORT, // port name, "3306" by default
  insecureAuth: true,
  database: process.env.DB_DATABASE,
});

module.exports = db;
