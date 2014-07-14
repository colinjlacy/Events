angular.module("boomCal")
	.constant("movieURL", "http://207.200.75.22/")
	.controller("movieCtrl", function($scope, $http, $location, $route, $rootScope, movieURL) {
//		$scope.movieTemplate = "partials/movieDates.html";
//
//		$scope.resetTemplate = function() {
//			$scope.movieTemplate = "partials/movieDates.html";
//		};

		$scope.findMovies = function() {
			var zip = $scope.movieZip,
				date = $scope.movieDate.toISOString().slice(0,10).split("-").join("");

			console.log(date);

			$http({
				url: "server/get_theaters.php",
				method: "GET",
				params: {
					zip: zip,
					date: date
				}
			}).success(function(data) {
					$scope.theaterList = data;
					$scope.movieTemplate = "partials/theaterList.html";
				});
		};

		$scope.getTheaterShowTimes = function(id) {
			$http({
				url: "server/get_showtimes.php",
				method: "GET",
				params: {
					id: id,
					date: $scope.movieDate.toISOString().slice(0,10).split("-").join("")
				}
			})
				.success(function(data) {
					console.log(data);
//					$scope.movieTemplate = "partials/theaterMovies.html";
				});
		}
	});