angular
  .module('bringItApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"; display: inline-block;">Google Map Goes Here</div>',
    scope: {
      center: '=',
      message: '@'
    },
    link(scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 16,
        center: scope.center
      });

      const infowindow = new $window.google.maps.InfoWindow({
        content: `<h3>${scope.message}</h3>`
      });

      const marker = new $window.google.maps.Marker({
        position: scope.center,
        map: map
      });

      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    }
  };
}
