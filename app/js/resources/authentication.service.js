/**
 * Created by steve on 11/22/15.
 */
app.constant('AUTH_EVENTS',{
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  notAuthenticated: 'auth-not-authenticated'
});

app.factory("AuthService", [
  "$http",
  "$q",
  "$window",
  "store",
  "$rootScope",
  "AUTH_EVENTS",
  "jwtHelper",
  "$state",
  "toastr",
  function ($http, $q, $window, store, $rootScope, AUTH_EVENTS, jwtHelper, $state, toastr) {

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
          username: email,
          email: email,
          password: password
        }
      })
      .then(function successCallback(response) {
        var responseToken = response.data.token;

        // Store Token in Local Storage
        store.set(TOKEN_NAME, responseToken);

        //Redirect to account page



        //console.log('Auth Service Token: ', responseToken); //token payload
        //console.log('Auth Service Response: ', response);   //server response

        currentUser = response;

        var tokenPayload = jwtHelper.decodeToken(responseToken);
        //console.log('this is the token name: ', TOKEN_NAME);
        console.log('call from auth service token payload is: ',tokenPayload);

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
      store.remove(TOKEN_NAME);
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      // Return Home when logged out
      $state.go('home');
      //Success Message
      toastr.info('Logged Out');
      //console.log('Log Out');
      $rootScope.signedIn = false;
    },

    isAuthenticated: function() {
      console.log('you must be logged in to view');
      // Get rid of the token if it's already expired
      if (store.get(TOKEN_NAME) && jwtHelper.isTokenExpired(store.get(TOKEN_NAME))) {
        store.remove(TOKEN_NAME);
      }
      //$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

      return store.get(TOKEN_NAME) !== null;
    },

    currentUser: function(){
      //console.log('I am the current user function!!!');
      if (this.isAuthenticated()){
        console.log('Yo man he is authenticated');
        $rootScope.signedIn = true;
        return jwtHelper.decodeToken(store.get(TOKEN_NAME));
      }
    }
  };







}]);