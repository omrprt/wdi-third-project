/* globals api, expect, it, describe, afterEach, beforeEach */
require('../../spec_helper');

const User = require('../../../models/user');

const testUser = {
  firstName: 'john',
  lastName: 'rivera',
  username: 'test',
  email: 'test@test.com',
  password: 'password',
  passwordConfirmation: 'password'
};

const testNonMatchingUser = {
  firstName: 'john',
  lastName: 'rivera',
  username: 'test',
  email: 'test@test.com',
  password: 'password'
};

describe('Authentication Controller Tests', () => {

  afterEach(done => {
    User.collection.remove();
    done();
  });

  // REGISTER ROUTE
  describe('POST /api/register', () => {
    it('should register a user providing the correct credentials', done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq(`Thanks for registering ${testUser.username}, please login`);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should not register a user if password and passwordConfirmation do not match', done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send(testNonMatchingUser)
        .end((err, res) => {
          expect(res.status).to.eq(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Bad Request');
          expect(res.body.errors).to.eq('ValidationError: passwordConfirmation: does not match');
          done();
        });
    });
  });

  // LOGIN ROUTE
  describe('POST /api/login', () => {
    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send(testUser)
        .end(() => {
          done();
        });
    });

    it('should login a user with the correct credentials', done => {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq(`Welcome back ${testUser.username}`);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should not login a user with incorrect credentials', function(done) {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'passworddd'
        })
        .end((err, res) => {
          expect(res.status).to.eq(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eq('Unauthorized');
          expect(Object.keys(res.body)).to.not.include('token');
          done();
        });
    });
  });

});
