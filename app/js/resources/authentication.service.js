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
        url: 'http://localhost:8080/api/v1/sessions',
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
      });
    })
  }

  return {
    authenticate: authenticate
  };
}]);