/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const express = require('express'); /* eslint linebreak-style: ["error", "windows"] */
const bodyParser = require('body-parser');
const dbComment = require('./controllers/comments');
const dbArticles = require('./controllers/articles');
const dbUser = require('./controllers/users');
const dbGif = require('./controllers/gifs');
const auth = require('./middleware/auth');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();
app.get('/', function(request, response) {
  response.send('hello world');
  client.query('SELECT * FROM test1', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
});

//app.use('port', port);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/gifs', auth, dbGif.getGifs);
app.get('/feed', auth, dbGif.getFeed);
app.get('/articles', auth, dbArticles.getArticles);
app.get('/users', dbUser.getUsers);
app.get('/users/:id', auth, dbUser.getUserById);
app.get('/gifs/:id', auth, dbGif.getGifById);
app.get('/articles/:id', auth, dbArticles.getArticlesById);
app.post('/users', dbUser.createUser);
app.post('/auth/signin', dbUser.logIn);
app.post('/gifs/:id', auth, dbComment.createGifComment);
app.post('/articles/:id', auth, dbComment.createArticleComment);
app.post('/upload', auth, dbGif.createGifPost);
app.post('/articles', auth, dbArticles.createArticle);
app.put('/users/:id', auth, dbUser.updateUser);
app.patch('/articles/:id', auth, dbArticles.updateArticles);
app.delete('/users/:id', auth, dbUser.deleteUser);
app.delete('/articles/:id', auth, dbArticles.deleteArticle);
app.delete('/gifs/:id', auth, dbGif.deleteGif);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
