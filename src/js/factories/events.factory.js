angular
  .module('bringItApp')
  .factory('Event', Event)
  .factory('EventSearch', EventSearch)
  .factory('EventGuest', EventGuest)
  .factory('EventComment', EventComment)
  .factory('EventItem', EventItem)
  .factory('AssignItem', AssignItem);

Event.$inject = ['$resource'];
function Event($resource){
  return $resource('/api/events/:id', { id: '@_id'}, {
    'update': { method: 'PUT' }
  });
}

EventSearch.$inject = ['$resource'];
function EventSearch($resource){
  return $resource('/api/events/search/:eventKey', { eventKey: '@eventKey'}, {
  });
}

EventGuest.$inject = ['$resource'];
function EventGuest($resource){
  return $resource('/api/events/:id/join', { id: '@id'}, {
    'update': { method: 'PUT' }
  });
}

EventItem.$inject = ['$resource'];
function EventItem($resource) {
  return new $resource('/api/events/:eventId/items', { eventId: '@id' }, {
  });
}

AssignItem.$inject = ['$resource'];
function AssignItem($resource) {
  return new $resource('/api/events/:eventId/items/:itemId', { eventId: '@eventId', itemId: '@itemId' }, {
    update: { method: 'PUT' }
  });
}

EventComment.$inject = ['$resource'];
function EventComment($resource) {
  // eventId comes from the addComment() function in show.controller
  // could probably inject the API in here too
  return new $resource('/api/events/:eventId/comments/:id', { id: '@id' }, {
    // if update is run, it sends this to the back-end (routes.js)
    update: { method: 'PUT' }
  });
}
