//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

describe('/GET users', () => {
  it('it should GET all the users', done => {
    chai
      .request('http://localhost:3000')
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/GET /users/:id', () => {
  it('it should GET all the users by Id ', done => {
    chai
      .request('http://localhost:3000')
      .get('/users/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
describe('/Post users', () => {
  it('it should create a new user', done => {
    chai
      .request('http://localhost:3000')
      .post('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/auth/signin', () => {
  it('it should check if the user exists in the database', done => {
    chai
      .request('http://localhost:3000')
      .post('/auth/signin')
      .set('content-type', 'application/json')
      .send({
        email: 'collins@gmail.com',
        password: '2222',
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

describe('/Post /users/:id', () => {
  it('it should edit user information', done => {
    chai
      .request('http://localhost:3000')
      .put('/users/:id')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// describe('/DELETE /users/:id', () => {
//   it('it should delete user information', done => {
//     chai
//       .request('http://localhost:3000')
//       .delete('/users/1')
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('array');
//         done();
//       });
//   });
// });
