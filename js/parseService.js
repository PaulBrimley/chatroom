var app = angular.module('chatroom');

app.service('parseService', function($http, $filter){

  this.getAvailableRooms = function() {
    return $http.get('https://api.parse.com/1/classes/chat?order=-createdAt').then(function(response) {
      response = response.data.results;
      return response;
    });

  }
  
  this.postData = function(currentUserName, currentRoomName, newPost) {
    return $http.post('https://api.parse.com/1/classes/chat', {[currentRoomName]: newPost, userId: currentUserName}).then(function(response) {
      return response;
    })
  }
  
  this.getData = function(currentRoomName) {
    return $http.get('https://api.parse.com/1/classes/chat?order=-createdAt').then(function(response) {
      var chatArray = [];
      response = response.data.results;
      for (var i = 0; i < response.length; i++) {
        for (var prop in response[i]) {
          if (prop === currentRoomName && prop !== undefined) {
            chatArray.push({userId: response[i].userId, text:response[i][prop], createdAt:$filter('date')(response[i].createdAt, 'short'), parsedDate:Date.parse(response[i].createdAt)});
          }
        }          
      }
      return chatArray;
    });
  }


});
