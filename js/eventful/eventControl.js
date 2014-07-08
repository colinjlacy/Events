angular.module("boomCal")
	.controller('eventControl', function ($scope, $rootScope, eventfulServices) {

		$scope.showThisEvent = function(event) {
			$scope.data.showEvent = event;
		};

		$rootScope.eventAdd = function() {
			console.log("click");
			$rootScope.eventToBeAdded = $scope.data.showEvent;
			$scope.data.showEvent = undefined;
		};

		$rootScope.postToCal = function(event) {
			var token = $scope.token,
				attendees = $scope.attendees;

			eventfulServices.postToCal(event, token, attendees);
		};

	});
