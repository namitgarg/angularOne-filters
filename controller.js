var app = angular.module("myApp", ['ui.router']);
app.config(function ($stateProvider) {
  var formState = {
    name: 'form',
    url: '/form',
    templateUrl: 'form.html'
  }
  var thanksState = {
    name: 'thanks',
    url: '/thanks.html',
    templateUrl: 'thanks.html',
    params: {'term': null}
  }

  $stateProvider.state(formState);
  $stateProvider.state(thanksState);
});
app.controller("myCtrl", function ($scope, $http, $state, $stateParams, myFactory) {
  // alert('abc');
  $scope.myTxt = "You have not yet clicked submit";
  $scope.data = {};
  myFactory.setArtist("namit");
  $scope.factoryName = myFactory.getArtist();
  $scope.makeUrl=myFactory.callItunes();
  console.log($scope);
  $scope.user = {};
  $scope.myFunc = function () {
    $scope.myTxt = "You clicked submit!";

    $http({
      url: 'request.php',
      method: "POST",
      data: {'aa': $scope.user},

    })
      .then(function (response) {
        // success
      },
        function (response) { // optional
          // failed
        });
    $state.go('thanks', {'term': $scope.user})
  }

});
app.factory('myFactory', function ($http, $q) {
  var service = {};
  var baseUrl = 'https://itunes.apple.com/search?term='
  var _artist = '';
  var _finalUrl = '';

   makeUrl = function () {
    alert("make url");
    _artist = _artist.split(' ').join('+');
    _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK';
    return _finalUrl;
  }

  service.setArtist = function (artist) {
    alert("set");
    _artist = artist;
  }

  service.getArtist = function () {
    alert("get");
    return _artist;
  }

  service.callItunes = function () {
    return makeUrl()
//    var deferred = $q.defer();
//    $http({
//      method: 'JSONP',
//      url: _finalUrl
//    }).success(function (data) {
//      deferred.resolve(data);
//    }).error(function () {
//      deferred.reject('There was an error');
//    })
//
//    return deferred.promise;
  }

  return service;
});
