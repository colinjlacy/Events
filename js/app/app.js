angular.module('boomCal', [
		'directive.g+signin',
		'ui.bootstrap',
		'eventDisplay',
		'eventfulServices',
		'ngRoute',
		'ngSanitize'
	])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when("/", {
			templateUrl: "partials/calendar.html"
		});
		$routeProvider.when("/events/", {
			templateUrl: "partials/eventList.html"
		});
		$routeProvider.when("/lists/", {
			templateUrl: "partials/allLists.html"
		});
		$routeProvider.when("/lists/add", {
			templateUrl: "partials/addList.html"
		});
		$routeProvider.when("/lists/edit/:id", {
			templateUrl: "partials/editList.html"
		});
		$routeProvider.when("/lists/:id", {
			templateUrl: "partials/viewList.html"
		});
//		$routeProvider.when("/movies", {
//			templateUrl: "partials/movies.html"
//		});
//		$routeProvider.when("/movies/:id", {
//			templateUrl: "partials/viewMovie.html"
//		});
		$routeProvider.otherwise({
			redirectTo: "/"
		});
	}])
	.filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	});


Date.prototype.addDays = function(days)
{
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
};
