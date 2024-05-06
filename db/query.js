const db = require('./db');

const queryPromise = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        console.log('Database query error:', error); // Log the error for debugging
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  queryPromise,
};