// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const requestUrl = 'https://teamwork-apis.herokuapp.com';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../index');

// const should = chai.should();
chai.use(chaiHttp);

describe('/GET articles', () => {
  it('it should GET all the articles', (done) => {
    chai
      .request(requestUrl)
      .get('/articles')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/GET /articles/:id', () => {
  it('it should GET a specific article', (done) => {
    chai
      .request(requestUrl)
      .get('/articles/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done();
      });
  });
});

describe('/Post /articles/:id', () => {
  it('it should GET all the books', (done) => {
    chai
      .request(requestUrl)
      .post('/articles/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/Post /articles', () => {
  it('it should post a new articles', (done) => {
    chai
      .request(requestUrl)
      .post('/articles')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/Patch /articles/:id', () => {
  it('it should update a specific article', (done) => {
    chai
      .request(requestUrl)
      .patch('/articles/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
});

describe('/Delete /articles/:id', () => {
  it('it should delete a specific article', (done) => {
    chai
      .request(requestUrl)
      .delete('/articles/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
});
