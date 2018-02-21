angular
  .module('bringItApp')
  .controller('EventEditCtrl', EventsEditCtrl);

EventsEditCtrl.$inject = ['$state', 'Event'];
function EventsEditCtrl($state, Event) {
  const vm = this;

  Event.get($state.params)
    .$promise
    .then((event) => {
      event.date = new Date(event.date);
      vm.event = event;
    });

  function eventsUpdate(){
    Event
      .update({ id: vm.event.id }, vm.event)
      .$promise
      .then(() => {
        $state.go('showEvent',
          { id: vm.event.id });
      });


  }

  vm.updateEvent = eventsUpdate;
}
