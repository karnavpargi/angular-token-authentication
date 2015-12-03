/**
 * Created by steve on 11/24/15.
 */
app.controller('headerCtrl', function($scope, AUTH_EVENTS, AuthService){

  console.log('Auth Service: ', AuthService.isAuthenticated);

  $scope.logout = function(){
    console.log('logging out from controller');
    AuthService.logout();
  };

  //$scope.signedIn = true;



  //$scope.loggedIn = function(){
  //  return AuthService.loginSuccess();
  //};
  //$scope.loggedIn = true


});