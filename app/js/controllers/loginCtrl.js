/**
 * Created by steve on 11/22/15.
 */
/**
 * Created by steve on 11/22/15.
 */
app.controller('loginCtrl', function ($scope, authService) {

  //console.log(authenticationSvc);


  $scope.loginSubmit = function(){
    console.log('login form is being submitted');
    authService.authenticate($scope.email, $scope.password)
      .then(function(data) {
        console.log(data);
      }, function(err) {
        console.log(err);
      });
  };




    //$http({
    //  method: 'POST',
    //  url: 'http://localhost:8080/api/authenticate',
    //  headers: {
    //    'Content-Type': 'application/json'
    //  },
    //  data:{
    //    email: $scope.email,
    //    password: $scope.password
    //  }
    //}).then(function successCallback(response) {
    //  // this callback will be called asynchronously
    //  // when the response is available
    //  console.log(response);
    //
    //
    //
    //}, function errorCallback(response) {
    //  // called asynchronously if an error occurs
    //  // or server returns response with an error status.
    //});



});