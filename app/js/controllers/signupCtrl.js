/**
 * Created by steve on 11/22/15.
 */
app.controller('signupCtrl', function ($scope, $http, authenticationSvc, toastr) {




  $scope.signupSubmit = function () {
    console.log('submitting sign up form');
    $http({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/consumer',
      headers: {
        'Content-Type': 'application/json'
      },
      data:{
        email: $scope.email,
        password: $scope.password
      }
    }).then(function successCallback(response) {
      console.log('response: ' , response);



      authenticationSvc.authenticate($scope.email, $scope.password)
        .then(function(data, res) {
          if(res.status === 500){
            alert ('there was a problem');
          }
          console.log("Data", data);
        }, function(err, res) {
          if(res.status === 500){
            alert ('there was a problem');
          }
          console.log("Error: ", err);
        });
    }, function errorCallback(response) {
      console.log('Response: ', response);
      console.log ('Response Data Message: ', response.data.message);


      toastr.error(response.data.message, 'Error');



    });




  }


});