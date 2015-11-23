/**
 * Created by steve on 11/22/15.
 */
app.config(function($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider){


  $urlRouterProvider.otherwise('/home');
  $locationProvider.html5Mode({enabled: true, requireBase: false});


  $stateProvider

    .state('home', {
      url : '/',
      templateUrl: 'templates/home.tmpl.html'
    })

    .state('signup', {
      url : '/signup',
      templateUrl: 'templates/signup.tmpl.html'
    })

    .state('login', {
      url : '/login',
      templateUrl: 'templates/login.tmpl.html'
    })


    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.tmpl.html',
      requiresLogin: true
    });



});