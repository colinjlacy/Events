angular.module("boomCal")
	.controller('eventControl', function ($scope, $rootScope, $http, eventfulServices) {

		var token = $scope.token;

		$scope.eventView = "partials/listEvents.html";

		$scope.showThisEvent = function(event) {
			$scope.data.showEvent = event;
			$scope.eventView = "partials/viewEvent.html";
		};

		$scope.showCategories = function(event) {
			$scope.data.showEvent = event;
			$scope.eventView = "partials/eventCategories.html";
		};

		$scope.showList = function() {
			$scope.eventView = "partials/listEvents.html";
			$rootScope.eventToBeAdded = null;
		};

		$scope.changeCategories = function(category) {
			// set an active category so that it can be used for paging and display
			$scope.activeCategory = category;

			var page = 1,
				start = $scope.startDate,
				end = $scope.endDate,
				category = category.id;

			$rootScope.findEvents = eventfulServices.findEvents(start, end, page, category);
			$scope.eventView = "partials/listEvents.html";
		};

		$scope.eventPage = function(pageNumber) {

			var page = pageNumber,
				start = $rootScope.startDate,
				end = $rootScope.endDate,
				category = $scope.activeCategory ? $scope.activeCategory : "";

			$rootScope.findEvents = eventfulServices.findEvents(start, end, page, category);
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
					$scope.eventCategories = data;
				});

		})();


	});
