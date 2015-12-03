/**
 * Created by steve on 12/2/15.
 */
app.factory('User', ['$resource', function ($resource) {
  return $resource('/api/v1/sessions/:id', {}, {
    'get': {
      method: 'GET',
      isArray: false
    }
  });
}]);