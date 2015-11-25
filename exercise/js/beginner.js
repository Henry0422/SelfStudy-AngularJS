var app = angular.module('myApp', []);


//Script for Example 1, Example 3 - Data binding & Example 5
app.controller('MyController', function($scope) {
  $scope.person = {
    name: "Henry"
  };
});


//Script for Example 4 - Clock
app.controller('myClock', function($scope) {
    $scope.person2 = {
        name: ""
    };
    var updateClock = function() {
        $scope.clock = new Date();
    };
    var timer = setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
});


//Script for Example 2
app.controller('ParentController', function($scope) {
  $scope.person2 = {greeted: false};
});


//Script for Example 2
app.controller('ChildController', function($scope) {
  $scope.sayHello = function() { $scope.person2.greeted = true; }
  $scope.reset = function() { $scope.person2.greeted = false; }
});

//Script for Example 5 - The simplest adding machine ever
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


//Script for Example 10 - using ng-click to call a function
app.controller('AlertWindow', ['$scope',function($scope) {
  $scope.sayHello2 = function() {
    alert("hello!");
  }
}]);


//Script for Example 12 - using ng-repeat
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


//Script for Example 14 - Check GitHub Account
app.factory('githubService1', ['$http', function($http) {
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


app.factory('githubService2', ['$http', function($http) {
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

//Script for Example 15 - Name Filter
app.controller('ConvertToUpperCase', 
   ['$scope', function($scope) {
    $scope.name = "Henry";
    $scope.today = new Date();

    $scope.todayFilter = function(expr) {
      return $filter('date')($scope.today, expr);
    }

    $scope.isCapitalized = function(str) { return str[0] == str[0].toUpperCase(); }
}]);

//Script for Example 16 - Currency Filter
app.controller('Currency',
    ['$scope', function($scope) {
    $scope.amount = "0";
}]);

//Script for Example 17 - Date & Time Filter
app.controller('TimeStamp',
    ['$scope', function($scope) {
    $scope.today = new Date();
}]);


app.controller('TimeStamp2',
    ['$scope', function($scope) {
    $scope.today = new Date();
}]);

//Customized filter
app.filter('capitalize', function() {
  return function(input) {
    // input will be ginger in the usage below
    if (input) 
      return input[0].toUpperCase() + input.slice(1);
  }  
});


app.controller('ControllerForCapitalize', 
  ['$scope', function($scope) {
    $scope.isCapitalized = function(str) { return str[0] == str[0].toUpperCase(); }
}]);
