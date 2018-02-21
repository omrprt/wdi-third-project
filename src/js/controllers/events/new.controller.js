angular
  .module('bringItApp')
  .controller('NewEventCtrl', NewEventCtrl);

NewEventCtrl.$inject = ['Event', '$state', '$http'];
function NewEventCtrl(Event, $state, $http) {
  const vm = this;
  vm.event = {};
  vm.createEvent = newEvent;

  function newEvent() {

    getCoordinates();
    function getCoordinates() {
      $http({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBKstuur4XOTCAojB7tzkVjo4XlA0jbGmY&components=postal_code:${vm.event.location.postal_code}`,
        skipAuthorization: true
      })
        .then(res => {
          vm.event.location.lat = res.data.results[0].geometry.location.lat;
          vm.event.location.lng = res.data.results[0].geometry.location.lng;
          console.log(res);
        })
        .then(() => {
          Event
            .save(vm.event)
            .$promise
            .then((res) => {
              $state.go('showEvent', {id: res.id});
            });
        });
    }
  }

}
