// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const requestUrl = 'https://teamwork-apis.herokuapp.com';
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('/GET users', () => {
  it('it should GET all the users', (done) => {
    chai
      .request(requestUrl)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/GET /users/:id', () => {
  it('it should GET all the users by Id ', (done) => {
    chai
      .request(requestUrl)
      .get('/users/2')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
describe('/Post users', () => {
  it('it should create a new user', (done) => {
    chai
      .request(requestUrl)
      .post('/users')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// describe('/auth/signin', () => {
//   it('it should check if the user exists in the database', (done) => {
//     chai
//       .request(requestUrl)
//       .post('/auth/signin')
//       .set('content-type', 'application/json')
//       .send({
//         email: 'collins@gmail.com',
//         password: '2222',
//       })
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//   });
// });

describe('/Post /users/:id', () => {
  it('it should edit user information', (done) => {
    chai
      .request(requestUrl)
      .put('/users/1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// describe('/DELETE /users/:id', () => {
//   it('it should delete user information', done => {
//     chai
//       .request(requestUrl)
//       .delete('/users/1')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('array');
//         done();
//       });
//   });
// });
