angular
  .module('bringItApp')
  .controller('EditUserCtrl', EditUserCtrl);

EditUserCtrl.$inject = ['User', '$state'];
function EditUserCtrl(User, $state) {
  const vm = this;

  User.get($state.params)
    .$promise
    .then((user) => {
      vm.user = user;
    });

  function userUpdate() {
    User
      .update({id: vm.user.id}, vm.user)
      .$promise
      .then(() => {
        $state.go('userShow', {id: vm.user.id});
      });
  }

  vm.updateUser = userUpdate;
}
