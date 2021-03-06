// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const requestUrl = 'https://teamwork-apis.herokuapp.com';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

// const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('/GET gifs', () => {
  it('it should GET all the gif posts', (done) => {
    chai
      .request(requestUrl)
      .get('/gifs')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/GET /gifs/:id', () => {
  it('it should GET specific gif', (done) => {
    chai
      .request(requestUrl)
      .get('/gifs/1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/Post /upload', () => {
  it('it should upload a new gif and return a new url', (done) => {
    chai
      .request(requestUrl)
      .post('/upload')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/Post /gifs/:id', () => {
  it('it should dlete a specific gif post', (done) => {
    chai
      .request(requestUrl)
      .delete('/gifs/:id')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
