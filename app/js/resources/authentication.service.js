/**
 * Created by steve on 11/22/15.
 */
app.factory("authenticationSvc", ["$http", "$q", "$window", "$cookieStore", function ($http, $q, $window, $cookieStore) {

  var currentUser = {};

  if($cookieStore.get('token')){
    currentUser = User.get();
  }

  function authenticate(email, password) {
    return $q(function(resolve, reject) {
      $http({
        method: 'POST',
        url: 'http://localhost:8080/api/authenticate',
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          email: email,
          password: password
        }
      })
      .then(function successCallback(response) {
        $cookieStore.put('token', response.token);
        currentUser = response;

        console.log("current user data: ", currentUser);
        resolve(response);


      }, function errorCallback(error) {
        reject(error);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    })
  }

  return {
    authenticate: authenticate
  };
}]);