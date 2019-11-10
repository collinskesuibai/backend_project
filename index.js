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

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.get('/gifs', dbGif.getGifs);
app.get('/feed', dbGif.getFeed);
app.get('/articles', dbArticles.getArticles);
app.get('/users', dbUser.getUsers);
app.get('/users/:id', dbUser.getUserById);
app.get('/gifs/:id', dbGif.getGifById);
app.get('/articles/:id', dbArticles.getArticlesById);
app.post('/users', dbUser.createUser);
app.post('/auth/signin', dbUser.logIn);
app.post('/gifs/:id', dbComment.createGifComment);
app.post('/articles/:id', dbComment.createArticleComment);
app.post('/upload', dbGif.createGifPost);
app.post('/articles', dbArticles.createArticle);
app.put('/users/:id', dbUser.updateUser);
app.patch('/articles/:id', dbArticles.updateArticles);
app.delete('/users/:id', dbUser.deleteUser);
app.delete('/articles/:id', dbArticles.deleteArticle);
app.delete('/gifs/:id', dbGif.deleteGif);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
