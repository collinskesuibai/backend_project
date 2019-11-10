const Pool = require('pg');

const pool = new Pool.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: '10377164',
  port: 5432,
});

module.exports = {
  pool,
};
