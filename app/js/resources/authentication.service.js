/**
 * Created by steve on 11/22/15.
 */
app.constant('AUTH_EVENTS',{
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  notAuthenticated: 'auth-not-authenticated'
});

app.factory("authService", ["$http", "$q", "$window", "store", "$rootScope", "AUTH_EVENTS", function ($http, $q, $window, store, $rootScope, AUTH_EVENTS) {

  var currentUser = {};

  var TOKEN_NAME = 'token';

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


        // Store Token in Local Storage
        store.set(TOKEN_NAME, response.data.token);

        //Redirect to account page


        console.log('Auth Service Token: ', response.data.token);
        console.log('Auth Service Response: ', response);

        currentUser = response;

        //console.log("current user data: ", currentUser);
        resolve(response);


      }, function errorCallback(error) {
        reject(error);
      });
    })
  }



  return {
    authenticate: authenticate,

    logout: function() {
      console.log('Logging Out from service return');
      store.remove(TOKEN_NAME);
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }
  };







}]);