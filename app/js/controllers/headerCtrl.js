/**
 * Created by steve on 11/24/15.
 */
app.controller('headerCtrl', function($scope, AUTH_EVENTS, authService){

  $scope.logout = function(){
    console.log('logging out from controller');
    authService.logout();
  }


});