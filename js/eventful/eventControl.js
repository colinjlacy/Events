angular.module("boomCal")
	.controller('eventControl', function ($scope, $rootScope, $http, eventfulServices) {

		var token = $scope.token;

		$scope.eventView = "partials/listEvents.html";

		$scope.showThisEvent = function(event) {
			$scope.data.showEvent = event;
			$scope.eventView = "partials/viewEvent.html";
		};

		$scope.showList = function() {
			$scope.eventView = "partials/listEvents.html";
			$rootScope.eventToBeAdded = null;
		};

		$rootScope.eventAdd = function() {
			console.log("click");
			$rootScope.eventToBeAdded = $scope.data.showEvent;
		};

		$rootScope.postToCal = function(event) {
			var attendees = $scope.attendees;

			eventfulServices.postToCal(event, token, attendees);
		};

		(function() {

			$http({
				url: "server/event_categories.php",
				method: "GET"
			})
				.success(function(data) {
					console.log(data);
					$scope.eventCategories = data;
				});

		})();


	});
