/**
 * Created by steve on 12/2/15.
 */
app.controller( 'accountCtrl', function ($scope, User, AuthService) {
  console.log('this is the user: ', User);
  //$scope.user = User.get({id: AuthService.currentUser().auth.id});


  console.log('Current User: ', AuthService.currentUser());
  $scope.user = AuthService.currentUser();


});