//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET articles', () => {
  it('it should GET all the articles', done => {
    chai
      .request('http://localhost:3000')
      .get('/articles')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/GET /articles/:id', () => {
  it('it should GET all the books', done => {
    chai
      .request('http://localhost:3000')
      .patch('/articles/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done();
      });
  });
});

describe('/Post /articles/:id', () => {
  it('it should GET all the books', done => {
    chai
      .request('http://localhost:3000')
      .post('/articles/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/Post /articles', () => {
  it('it should GET all the books', done => {
    chai
      .request('http://localhost:3000')
      .post('/articles')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/Post /articles/:id', () => {
  it('it should GET all the books', done => {
    chai
      .request('http://localhost:3000')
      .patch('/articles/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
});

describe('/Post /articles/:id', () => {
  it('it should GET all the books', done => {
    chai
      .request('http://localhost:3000')
      .delete('/articles/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });
});
