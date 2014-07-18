angular.module("boomCal")
	.controller('eventControl', function ($scope, $rootScope, $http, $sce, eventfulServices) {

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
                sort = $scope.sortOrder;

			$rootScope.findEvents = eventfulServices.findEvents(start, end, page, category.id, sort);
			$scope.eventView = "partials/listEvents.html";
		};

        $scope.sortEvents = function(sortOrder) {
            $scope.sortOrder = sortOrder;

            var start = $rootScope.startDate,
                end = $rootScope.endDate,
                page = 1,
                category = $scope.activeCategory ? $scope.activeCategory.id : "";

            $rootScope.findEvents = eventfulServices.findEvents(start, end, page, category, sortOrder);
        };

		$scope.eventPage = function(pageNumber) {

			var start = $rootScope.startDate,
				end = $rootScope.endDate,
				category = $scope.activeCategory ? $scope.activeCategory.id : "",
                sort = $scope.sortOrder ? $scope.sortOrder : "popularity";

			$rootScope.findEvents = eventfulServices.findEvents(start, end, pageNumber, category, sort);
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
					// TODO: Figure out why ngSanitize isn't working - had to do a slit/join to replace the HTML &amp; character
					for (var i = 0; i < data.category.length; i++) {
						data.category[i].name = data.category[i].name.split("&amp;").join("&");
						console.log(data.category[i].name);
					}
					$scope.eventCategories = data;
				});

		})();


	});
