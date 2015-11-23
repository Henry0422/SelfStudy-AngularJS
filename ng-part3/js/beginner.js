var app = angular.module('myApp', []),
    apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';


app.controller('PlayerController', ['$scope', '$http', function($scope, $http) {

  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    // Now we have a list of the stories (data.list.story)
    // in the data object that the NPR API 
    // returns in JSON that looks like:
    // data: { "list": {
    //   "title": ...
    //   "story": [
    //     { "id": ...
    //       "title": ...
    $scope.programs = data.list.story;
  }).error(function(data, status) {
    // Some error occurred
  });

}]);

app.controller('RelatedController', ['$scope', function($scope) {
}]);

// Parent scope
app.controller('FrameController', ['$scope', function($scope) {

}]);