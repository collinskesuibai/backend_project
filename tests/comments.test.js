/* // During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const requestUrl = 'https://teamwork-apis.herokuapp.com';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../index');

// const should = chai.should();
chai.use(chaiHttp);

describe('/gifs/:id', () => {
  it('it should post a  specific comment to a gif', (done) => {
    chai
      .request(requestUrl)
      .post('/gifs/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

  */
