/**
 * Created by steve on 11/22/15.
 */
app.controller('signupCtrl', function ($scope, $http, $location, toastr) {




  $scope.signupSubmit = function () {
    console.log('submitting sign up form');
    $http({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/consumer',
      headers: {
        'Content-Type': 'application/json'
      },
      data:{
        username: $scope.email,
        email: $scope.email,
        password: $scope.password
      }
    }).then(function successCallback(response) {


      //Success Message
      toastr.success('Submission Successful!', 'Success');

      // Redirect User to Login Page
      $location.path('/login');


    }, function errorCallback(response) {
      console.log('Response: ', response);
      console.log ('Response Data Message: ', response.data.message);
      toastr.error(response.data.message, 'Error');
    });




  }


});