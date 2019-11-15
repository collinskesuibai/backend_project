const Pool = require('../buildScripts/poolConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = Pool.pool;

const getUsers = (request, response) => {
  pool.pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createUser = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { firstName, lastName, email, password } = request.body;
  // eslint-disable-next-line object-curly-newline
  const { gender, jobRole, department, address } = request.body;

  bcrypt.hash(request.body.password, 16).then(hash => {
    pool.query(
      'INSERT INTO users ( firstName, lastName, email, password, gender, jobRole, department, address ) VALUES ($1, $2,$3,$4,$5,$6,$7,$8)',
      [firstName, lastName, email, hash, gender, jobRole, department, address],
      (error, result) => {
        if (error) {
          throw error;
        }
        const token = jwt.sign({ userId: email }, 'RANDOM_TOKEN_SECRET', {
          expiresIn: '24h',
        });
        response.status(201).send({
          status: 'success',
          data: {
            message: 'User account successfully created',
            token: token,
            userId: 'jkjkj',
          },
        });
      },
    );
  });
};
const logIn = (request, response) => {
  const { email, password } = request.body;

  pool.query(
    'SELECT password FROM users WHERE  email = $1',
    [email],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result);

      bcrypt
        .compare(password, result.rows[0].password)
        .then(valid => {
          if (!valid) {
            response.status(401).send({
              status: 'error',
              data: {
                message: 'Check password ',
                userId: email,
              },
            });
          }
          const token = jwt.sign({ userId: email }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h',
          });
          response.status(201).send({
            status: 'success',
            data: {
              message: 'Log in successfully',
              token: token,
              userId: email,
            },
          });
        })
        .catch(error => {
          res.status(500).json({
            error: error,
          });
        });
    },
  );
};
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    },
  );
};
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  logIn,
};
