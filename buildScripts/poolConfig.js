// const Pool = require('pg');

// const pool = new Pool.Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'users',
//   password: '10377164',
//   port: 5432,
// });
const { Client } = require('pg');

const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

pool.connect();
pool.query('SELECT * FROM test1', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

module.exports = {
  pool,
};
