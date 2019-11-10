//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let server = require('../index');
let should = chai.should();

describe('/GET gifs', () => {
  it('it should GET all the gif posts', done => {
    chai
      .request('http://localhost:3000')
      .get('/gifs')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/GET /gifs/:id', () => {
  it('it should GET specific gif', done => {
    chai
      .request('http://localhost:3000')
      .get('/gifs/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done();
      });
  });
});

describe('/Post /upload', () => {
  it('it should upload a new gif and return a new url', done => {
    chai
      .request('http://localhost:3000')
      .post('/upload')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/Post /gifs/:id', () => {
  it('it should dlete a specific gif post', done => {
    chai
      .request('http://localhost:3000')
      .delete('/gifs/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
