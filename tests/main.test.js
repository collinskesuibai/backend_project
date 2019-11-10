//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('TeamWork', () => {
  describe('/GET feed', () => {
    it('it should GET all the articles and gifs', done => {
      chai
        .request('http://localhost:3000')
        .get('/feed')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});
