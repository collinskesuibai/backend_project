const Pool = require('../buildScripts/poolConfig');

const { pool } = Pool;

const getFeed = (request, response) => {
  const { feed } = request.body;
  if (feed === 'articles') {
    pool.query('SELECT * FROM articles', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send({
        status: 'success',
        data: [results.rows],
      });
    });
  } else if (feed === 'gifs') {
    pool.query('SELECT * FROM gifs', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send({
        status: 'success',
        data: [results.rows],
      });
    });
  }
};

module.exports = {
  getFeed,
};
