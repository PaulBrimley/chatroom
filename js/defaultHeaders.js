var app = angular.module('chatroom');

app.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers = {'X-Parse-Application-Id': 'LU4mg4i8uwOlFU35zuFOrR8GdxbL1dQJn9ghCqb0', 'X-Parse-REST-API-Key': 'Xk7CXGbIrPy6ApqyJShgPfvpTH9dxcCtKIYeZR1C'}
      return config;
    }
  };
});
