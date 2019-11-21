const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Pool = require('../buildScripts/poolConfig');

const { pool } = Pool;

// Contents of above date object is
// converted into a string using toISOString() function.

const getGifs = (request, response) => {
  pool.query('SELECT * FROM gifs ORDER BY gifId ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const getGifById = (request, response) => {
  const id = parseInt(request.params.id, 10);
  // IN (SELECT * FROM commentarticles WHERE artcicleid = $1)

  pool.query('SELECT * FROM gifs WHERE gifid = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    pool.query(
      'SELECT * FROM commentgif WHERE gifid = $1',
      [id],
      (errors, result) => {
        if (errors) {
          throw errors;
        }
        response.status(200).json({
          status: 'success',
          data: {
            id: results.rows[0].gifid,
            createdOn: results.rows[0].createdon,
            title: results.rows[0].title,
            url: results.rows[0].url,
            comments: result.rows,
          },
        });
        // xconsole.log(results);
      },
    );
  });
};

// MULTER
const storage = multer.diskStorage({
  // eslint-disable-next-line func-names
  // eslint-disable-next-line object-shorthand
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // eslint-disable-next-line no-console
    console.log(file);
    cb(null, file.originalname);
  },
});

const createGifPost = (req, res) => {
  const upload = multer({ storage }).single('name-of-input-key');
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }
    // res.json(req.file);

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: 'dqsfvc7vo',
      api_key: '624745128193233',
      api_secret: '9m-0-49SHbf_7lfazdUH1tGsPqw',
    });

    const { path } = req.file;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `images/${uniqueFilename}`, tags: 'images' }, // directory and tags are optional
      (error, image) => {
        if (error) return res.send(error);
        // remove file from server

        fs.unlinkSync(path);
        // return image details
        //  res.json(image);

        // post the git to the database
        //  const { images, title } = request.body;

        pool.query(
          'INSERT INTO gifs ( image, title,createdOn) VALUES ($1, $2 ,$3)',
          [image.url, 'image one', image.created_at],
          (errors, result) => {
            if (errors) {
              throw errors;
            }

            const dates = image.created_at;
            const splitDate = dates.split('T');

            return res.status(201).send({
              status: 'success',
              data: {
                gifId: 8989,
                message: 'GIF image successfully posted',
                createdOn: splitDate[0],
                title: 'image one',
                imageUrl: image.url,
              },
            });
          },
        );
        return image.url;
      },
    );
    return 'image uploaded';
  });
};

const deleteGif = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM gifs WHERE gifId = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send({
      status: 'success',
      data: {
        message: 'gif successfully deleted',
      },
    });
  });
};

module.exports = {
  getGifs,
  getGifById,
  createGifPost,
  deleteGif,
};
