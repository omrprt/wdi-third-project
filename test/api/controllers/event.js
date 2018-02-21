/* global describe, afterEach, beforeEach, it, api, expect */

require('../../spec_helper');

const Event = require('../../../models/event');
const User = require('../../../models/user');

const testUserData = {
  firstName: 'Matt',
  lastName: 'Harlow',
  username: 'MattHarlow',
  email: 'matt@harlow.com',
  password: 'password',
  passwordConfirmation: 'password',
  bio: 'I love pizza'
};

const testEventData = {
  eventName: 'Pizza Night',
  description: 'Let\'s ignore this Valentine-guy and eat pizza!',
  date: 'Feb 14, 2018',
  location: {
    firstLine: '119 Drayton Rd',
    secondLine: '',
    city: 'London',
    postal_code: 'NW10 4DH',
    lat: 51.54035,
    lng: -0.24488
  },
  image: 'https://images.unsplash.com/photo-1509403491765-9fb9d773ca6d?ixlib=rb-0.3.5&s=7384d4b273bc43324d89f08f92d818ae&auto=format&fit=crop&w=1036&q=80'
};

describe('Events Controller Tests', () => {
  afterEach(done => {
    Event.collection.drop();
    User.collection.drop();
    done();
  });

  // POST ROUTE
  describe('POST /api/events', () => {
    let token = null;

    beforeEach(done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send(testUserData)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });


    it('should return a 201 response', done => {
      api
        .post('/api/events')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(testEventData)
        .end((err, res) => {
          expect(res.status).to.eq(201);
          done();
        });
    });

    it('should return created event data in response body', done => {
      api
        .post('/api/events')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(testEventData)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.have.all.keys([
              '__v',
              '_id',
              'id',
              'eventName',
              'eventKey',
              'location',
              'comments',
              'date',
              'description',
              'guests',
              'items',
              'image',
              'createdBy',
              'photos'
            ]);
          done();
        });
    });
  });

  // SHOW ROUTE
  describe('GET /api/events/:id', () => {

    let testEvent = null;
    let token = null;

    beforeEach(done => {

      User
        .create(testUserData)
        .then(user => {
          testEventData.createdBy = user;

          return Event.create(testEventData);
        })
        .then(event => {
          testEvent = event;

          api
            .post('/api/register')
            .set('Accept', 'application/json')
            .send(testUserData)
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        })
        .catch(done);
    });

    it('should reutrn a 200 response', done => {
      api
        .get(`/api/events/${testEvent.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, done);
    });

  });

  // UPDATE ROUTE
  describe('PUT /api/events/:id', () => {

    let testEvent = null;
    let token = null;

    beforeEach(done => {

      User
        .create(testUserData)
        .then(user => {
          testEventData.createdBy = user;

          return Event.create(testEventData);
        })
        .then(event => {
          testEvent = event;

          api
            .post('/api/register')
            .set('Accept', 'application/json')
            .send(testUserData)
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        })
        .catch(done);
    });

    it('should return a 200 response', done => {
      testEvent.eventName = 'Pizza Party';

      api
        .put(`/api/events/${testEvent.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(testEvent)
        .expect(200, done);
    });

    it('should return updated event data in response body', done => {
      testEvent.eventName = 'Pizza Party';

      api
        .put(`/api/events/${testEvent.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(testEvent)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .and.to.have.property('eventName', 'Pizza Party');

          done();
        });
    });
  });


  // DELETE ROUTE
  describe('DELETE /api/events/:id', () => {

    let testEvent = null;
    let token = null;

    beforeEach(done => {

      User
        .create(testUserData)
        .then(user => {
          testEventData.createdBy = user;

          return Event.create(testEventData);
        })
        .then(event => {
          testEvent = event;

          api
            .post('/api/register')
            .set('Accept', 'application/json')
            .send(testUserData)
            .end((err, res) => {
              token = res.body.token;
              done();
            });
        })
        .catch(done);
    });

    it('should return a 404 response', done => {
      api
        .delete(`/api/shoes/${testEvent.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(404, done);
    });
  });
});
