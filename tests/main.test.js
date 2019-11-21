/* // During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const requestUrl = 'https://teamwork-apis.herokuapp.com';
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../index');

// const should = chai.should();

chai.use(chaiHttp);

describe('TeamWork', () => {
  describe('/GET feed', () => {
    it('it should GET all the articles and gifs', (done) => {
      chai
        .request(requestUrl)
        .get('/feed')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

*/
