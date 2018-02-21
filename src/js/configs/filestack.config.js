angular
  .module('bringItApp')
  .config(FileStack);

FileStack.$inject = ['filepickerProvider'];
function FileStack(filepickerProvider) {
  filepickerProvider.setKey('AGSOYweTDQfeG35ZxTD9Tz');
}
