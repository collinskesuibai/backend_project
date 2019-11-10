const Pool = require('../buildScripts/poolConfig');
const pool = Pool.pool;

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
  const id = parseInt(request.params.id);
  // IN (SELECT * FROM commentarticles WHERE artcicleid = $1)

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
        (error, result) => {
          if (error) {
            throw error;
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
          console.log(results);
        },
      );
    },
  );
};
const createArticle = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { title, article } = request.body;
  let dateobj = new Date();
  let B = dateobj.toISOString();
  let splitDate = B.split('T');

  pool.query(
    'INSERT INTO articles ( title, article,createdon) VALUES ($1, $2,$3)',
    [title, article, splitDate],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result);
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
  const id = parseInt(request.params.id);
  //const id = 2;
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
          title: title,
          article: article,
        },
      });
    },
  );
};

const deleteArticle = (request, response) => {
  const id = parseInt(request.params.id);

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
