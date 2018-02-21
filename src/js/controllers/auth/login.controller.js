angular
  .module('bringItApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    $auth.login(vm.credentials)
    //passing user ID to front end.
      .then((res) => $state.go('userShow', {id: res.data.userId}));
  }

  vm.submit = submit;
}
