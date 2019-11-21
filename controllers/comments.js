const Pool = require('../buildScripts/poolConfig');

const { pool } = Pool;

const createArticleComment = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { comment } = request.body;
  const id = parseInt(request.params.id, 10);
  const dateobj = new Date();
  const B = dateobj.toISOString();
  const splitDate = B.split('T');

  pool.query(
    'INSERT INTO commentarticle (articleId,comment,createdon) VALUES ($1, $2, $3)',
    [id, comment, splitDate[0]],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: id,
          createdOn: result.row[0].createdOn,
          title: comment,
        },
      });
    },
  );
};

const createGifComment = (request, response) => {
  // eslint-disable-next-line object-curly-newline
  const { comment } = request.body;
  const id = parseInt(request.params.id, 10);
  const dateobj = new Date();
  const B = dateobj.toISOString();
  const splitDate = B.split('T');

  pool.query(
    'INSERT INTO commentgif (gifId,comment,createdon) VALUES ($1,$2,$3)',
    [id, comment, splitDate[0]],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send({
        status: 'success',
        data: {
          message: 'Comment successfully posted',
          articleId: result.gitId,
          createdOn: 'UIRUIEUR',
          title: result.comment,
        },
      });
    },
  );
};

module.exports = {
  createArticleComment,
  createGifComment,
};
