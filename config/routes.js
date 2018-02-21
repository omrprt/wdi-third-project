const express     = require('express');
const router      = express.Router();
const auth        = require('../controllers/auth');
const event       = require('../controllers/event');
const users       = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.route('/login')
  .post(auth.login);

router.route('/register')
  .post(auth.register);

router.route('/users/:id')
  // .get(auth.show)
  .put(secureRoute, users.update)
  .get(secureRoute, users.show);

router.route('/events')
  .post(secureRoute, event.create);

router.route('/events/search/:eventKey')
  .get(secureRoute, event.search);

router.route('/events/:id')
  .get(secureRoute, event.show)
  .put(secureRoute, event.update)
  .delete(secureRoute, event.delete);

router.route('/events/:id/join')
  .put(secureRoute, event.addGuest);

router.route('/events/:id/comments')
  .post(secureRoute, event.addComment);

router.route('/events/:id/comments/:commentId')
  .delete(secureRoute, event.deleteComment);

router.route('/events/:id/items')
  .post(secureRoute, event.addItem);

router.route('/events/:id/items/:itemId')
  .delete(secureRoute, event.deleteItem)
  .put(secureRoute, event.assignBringer);

module.exports = router;
