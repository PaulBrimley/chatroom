var app = angular.module('chatroom');


app.controller('mainCtrl', function($scope, $http, $filter, parseService){

  $scope.availableRoomArray = [];
  $scope.availableUserArray = [];
  $scope.currentRoomChats = [];
  $scope.currentRoomName = 'main';
  $scope.currentUserName = 'anonymous';
  $scope.order = '-';

  $scope.getAvailableRooms = function() {
    parseService.getAvailableRooms().then(function(response) {
      for (var i = 0; i < response.length; i++) {
        for (var prop in response[i]) {
          if (prop !== '$$hasKey' && prop !== 'createdAt' && prop !== 'objectId' && prop !== 'updatedAt' && prop !== 'userId') {
            $scope.availableRoomArray.push(prop);
          }
          if (prop === 'userId') {
            $scope.availableUserArray.push(response[i].userId);
          }
        }
      }
      $scope.availableRoomArray = $scope.availableRoomArray.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
      },[]);
      $scope.availableUserArray = $scope.availableUserArray.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
      },[]);
    });
  }

  $scope.getParseData = function(currentRoomName) {
    parseService.getData(currentRoomName).then(function(response) {
      $scope.currentRoomChats = response;
    })
  }

  $scope.postData = function(currentUserName, currentRoomName, newPost) {
    $scope.message = '';
    $scope.roomNameError = parseService.postData(currentUserName, currentRoomName, newPost);
  }

  $scope.switchRooms = function(newRoom) {
    $scope.currentRoomName = newRoom;
    $scope.getParseData($scope.currentRoomName);
  }

  $scope.switchUser = function(newUser) {
    $scope.currentUserName = newUser;
  }

  $scope.createNewRoom = function(newRoomName) {
    for (var i = 0; i < newRoomName.length; i++) {
      if (newRoomName[i] === ' ' || ((newRoomName[i].toUpperCase() === newRoomName[i].toLowerCase()) && (isNaN(newRoomName[i])))) {
        alert('Must contain letters/numbers and no spaces');
        return;
        break;
      } 
    }
    for (var i = 0; i < $scope.availableRoomArray.length; i++) {
      if (newRoomName === $scope.availableRoomArray[i]) {
        alert('Room already exists. Choose a new name');
        return;
      }
    }
    $scope.currentRoomName = newRoomName;
    $scope.newRoomName = '';
  }

  $scope.createNewUser = function(newUserName) {
    for (var i = 0; i < newUserName.length; i++) {
      if (newUserName[i] === ' ' || ((newUserName[i].toUpperCase() === newUserName[i].toLowerCase()) && (isNaN(newUserName[i])))) {
        alert('Must contain letters/numbers and no spaces');
        return;
        break;
      } 
    }
    $scope.currentUserName = newUserName;
  }

  setInterval(function(){
    $scope.getParseData($scope.currentRoomName);
    $scope.getAvailableRooms();
  }, 1500)

/*$scope.getParseData($scope.currentRoomName);
$scope.getAvailableRooms();*/
  

})
