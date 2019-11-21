const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbComment = require('./controllers/comments');
const dbArticles = require('./controllers/articles');
const dbUser = require('./controllers/users');
const dbGif = require('./controllers/gifs');
const auth = require('./middleware/auth');
const dbFeeds = require('./controllers/feeds');

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;
app.get('/', (request, response) => {
  response.send('hello world');
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/gifs', auth, dbGif.getGifs);
app.get('/feed', auth, dbFeeds.getFeed);
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

app.listen(port);
