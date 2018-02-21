angular
  .module('bringItApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as vm'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as vm'
    })
    .state('userShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as vm'
    })
    .state('editUser', {
      url: '/users/:id',
      templateUrl: 'js/views/users/edit.html',
      controller: 'EditUserCtrl as vm'
    })
    .state('createEvent', {
      url: '/events',
      templateUrl: 'js/views/events/new.html',
      controller: 'NewEventCtrl as vm'
    })
    .state('editEvent', {
      url: '/events/:id',
      templateUrl: 'js/views/events/edit.html',
      controller: 'EventEditCtrl as vm'
    })
    .state('showEvent', {
      url: '/events/:id',
      templateUrl: 'js/views/events/show.html',
      controller: 'EventsShowCtrl as vm'
    });
  $urlRouterProvider.otherwise('/');
}
