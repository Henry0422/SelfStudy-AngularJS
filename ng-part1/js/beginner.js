var app = angular.module('myApp', []);

app.controller('MyController', function($scope) {
  $scope.person = {
    name: "Henry Han"
  };
    
    var updateClock = function() {
        $scope.clock = new Date();
    };
    var timer = setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
    
});


app.controller('ParentController', function($scope) {
  $scope.person2 = {greeted: false};
});

app.controller('ChildController', function($scope) {
  $scope.sayHello = function() {
    $scope.person2.greeted = true;
  }
});


app.controller('DemoController', function($scope) {
  $scope.counter = 0;
  $scope.add = function(amount) { $scope.counter += amount; };
  $scope.subtract = function(amount) { $scope.counter -= amount; };
});

app.directive('ngLiveResult', ['$parse', '$filter', function($parse, $filter) {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div class="code_with_result">' +
              '<input type="text" ng-model="ngModel" placeholder="{{ ngPlaceholder }}" />' +
              '<pre class="syntax-highlight result">= {{ result }}</pre></div>' +
              '</div>',
    link: function(scope, el, attrs) {
      scope.$watch('ngModel', function(v) {
        if (v === undefined) {
          scope.ngModel = '2 + 1';
        } else {
          try {
            scope.result = $parse(v)(scope);
          } catch (err) {}
        }
      });
    }
  }
}]);


app.controller('AlertWindow', ['$scope',function($scope) {
  $scope.sayHello2 = function() {
    alert("hello!");
  }
}]);


app.controller('LoopController', ['$scope', function($scope) {
  $scope.group = [
    { name: 'Tom'},
    { name: 'Jim'},
    { name: 'Tim'},
    { name: 'Kim'}
  ];

  $scope.color = {
    'Ari': 'orange',
    'Q': 'blue',
    'Sean': 'green'
  };
}]);



app
  .factory('githubService1', ['$http', function($http) {
    var doRequest = function(username, path) {
      return $http({
        method: 'JSONP',
        url: 'https://api.github.com/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
      });
    }

    return {
      events: function(user) { return doRequest(user, 'events'); }
    };
  }]);

app
  .factory('githubService2', ['$http', function($http) {
    var _username;

    var doRequest = function(path) {
      return $http({
        method: 'JSONP',
        url: 'https://api.github.com/users/' + _username + '/' + path + '?callback=JSON_CALLBACK'
      });
    }

    return {
      events: function() { return doRequest('events'); },
      setUsername: function(username) { _username = username; }
    };
  }]);

app.controller('ServiceController', ['$scope', '$timeout', 'githubService1', 'githubService2',
    function($scope, $timeout, githubService1, githubService2) {

    var timeout;
    $scope.$watch('username', function(newVal) {
      if (newVal) {
        if (timeout) $timeout.cancel(timeout);
        timeout = $timeout(function() {
          githubService2.setUsername(newVal);
          githubService2.events()
          .success(function(data, status) {
            $scope.events = data.data;
          });
        }, 350);
      }
    });

    $scope.fetchEvents = function() {
      $scope.auserEvents = null;
      githubService1.events($scope.username)
        .success(function(data, status, headers) {
          $scope.auserEvents = data.data;
        });
    }
}]);