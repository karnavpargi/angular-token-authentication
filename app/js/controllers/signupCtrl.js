/**
 * Created by steve on 11/22/15.
 */
app.controller('signupCtrl', function ($scope, $http) {

  $scope.signupSubmit = function () {
    console.log('submitting sign up form');



    $http({
      method: 'POST',
      url: 'http://localhost:8080/api/signup',
      headers: {
        'Content-Type': 'application/json'
      },
      data:{
        email: $scope.email,
        password: $scope.password
      }
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);



    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });




  }


});