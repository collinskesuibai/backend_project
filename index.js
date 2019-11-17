/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const express = require('express'); /* eslint linebreak-style: ["error", "windows"] */
const bodyParser = require('body-parser');
const dbComment = require('./controllers/comments');
const dbArticles = require('./controllers/articles');
const dbUser = require('./controllers/users');
const dbGif = require('./gifs');
const auth = require('./middleware/auth');
const cors = require('cors');
const fileupload = require('express-fileupload');

const app = express();
app.use(cors());

app.use(
  fileupload({
    useTempFiles: true,
  }),
);
const port = process.env.PORT || 3000;
app.get('/', function(request, response) {
  response.send('hello world');
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
