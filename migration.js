const mysql = require('mysql');
require('dotenv').config();
var migration = require('mysql-migrations');

const db = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST, //This is your localhost IP
  user: process.env.DB_USER, // "newuser" created in Step 1(e)
  password: process.env.DB_PASSWORD, // password for the new user
  port: process.env.DB_PORT, // port name, "3306" by default
  insecureAuth: true,
  database: process.env.DB_DATABASE,
});
db.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection pool failed:', err);
    process.exit(1); 
  }
  console.log('MySQL connection pool succeeded');
  connection.release(); // Release the connection back to the pool
});
// migration.init(connection, __dirname + '/migrations');
migration.init(db, __dirname + '/migrations', function() {
    console.log("finished running migrations");
  });
module.exports = db;
