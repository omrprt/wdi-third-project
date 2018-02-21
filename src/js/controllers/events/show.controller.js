angular
  .module('bringItApp')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['$auth', '$state', '$sce', 'Event', 'EventComment', 'EventItem', 'AssignItem', 'EventGuest'];
function EventsShowCtrl($auth, $state, $sce, Event, EventComment, EventItem, AssignItem, EventGuest) {
  const vm = this;

  vm.isAttending = isAttending;

  Event.get($state.params)
    .$promise
    .then((event) => {
      vm.event = event;

      isAttending();
    });

  vm.delete = eventsDelete;

  function eventsDelete(){
    Event.delete($state.params)
      .$promise
      .then(() => {
        $state.go('eventsIndex');
      });
  }

  function addItem() {
    EventItem
      .save({ eventId: vm.event.id }, vm.newItem)
      .$promise
      .then((item) => {
        vm.event.items.push(item);
        vm.newItem = {};
      });
  }

  vm.addItem = addItem;

  function assignBringer(item) {
    AssignItem
      .update({ eventId: vm.event.id , itemId: item.id}, { status: 'assign' })
      .$promise
      .then((response) => {
        console.log(response);
        item.bringer = response.bringer;
      });
  }

  vm.assignBringer = assignBringer;

  function  unassignBringer(item) {
    AssignItem
      .update({ eventId: vm.event.id , itemId: item.id}, { status: 'unassign' })
      .$promise
      .then((response) => {
        console.log(response);
        item.bringer = response.bringer;
      });
  }

  vm.unassignBringer = unassignBringer;

  function addComment() {
    EventComment
      .save({ eventId: vm.event.id }, vm.newComment)
      .$promise
      .then((comment) => {
        vm.event.comments.push(comment);
        vm.newComment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    EventComment
      .delete({ eventId: vm.event.id, id: comment.id })
      .$promise
      .then(() => {
        const index = vm.event.comments.indexOf(comment);
        vm.event.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

  function addGuest() {
    console.log('addGuest function');
    EventGuest
      .update({ id: vm.event.id })
      .$promise
      .then((guest) => {
        vm.event.guests.push(guest);
      });
  }

  vm.addGuest = addGuest;

  function isAttending() {
    return vm.event.guests.some(guest => guest._id === $auth.getPayload().userId);
  }

}
