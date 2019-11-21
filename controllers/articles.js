const Pool = require('../buildScripts/poolConfig');

const { pool } = Pool;

const getArticles = (request, response) => {
  pool.query(
    'SELECT * FROM articles ORDER BY articleId ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    },
  );
};
const getArticlesById = (request, response) => {
  const id = parseInt(request.params.id, 10);
  pool.query(
    'SELECT * FROM articles WHERE articleid = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      pool.query(
        'SELECT * FROM commentarticle WHERE articleid = $1',
        [id],
        (errors, result) => {
          if (errors) {
            throw errors;
          }
          response.status(200).json({
            status: 'success',
            data: {
              id: results.rows[0].articleid,
              createdOn: results.rows[0].createdon,
              title: results.rows[0].title,
              article: results.rows[0].article,
              comments: result.rows,
            },
          });
        },
      );
    },
  );
};
const createArticle = (request, response) => {
  const { title, article } = request.body;
  const dateobj = new Date();
  const B = dateobj.toISOString();
  const splitDate = B.split('T');

  pool.query(
    'INSERT INTO articles ( title, article,createdon) VALUES ($1, $2,$3)',
    [title, article, splitDate],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: result.articleId,
          createdOn: splitDate[0],
          title: result.title,
        },
      });
    },
  );
};
const updateArticles = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const { title, article } = request.body;

  pool.query(
    'UPDATE articles SET title = $1, article = $2 WHERE articleId = $3',
    [title, article, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send({
        status: 'success',
        data: {
          message: 'Article successfully updated',
          title,
          article,
        },
      });
    },
  );
};

const deleteArticle = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query(
    'DELETE FROM articles WHERE articleId = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send({
        status: 'success',
        data: {
          message: 'Article successfully deleted',
        },
      });
    },
  );
};

module.exports = {
  getArticles,
  getArticlesById,
  createArticle,
  updateArticles,
  deleteArticle,
};
