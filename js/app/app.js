angular.module('boomCal', [
		'directive.g+signin',
		'ui.bootstrap',
		'eventDisplay',
		'eventfulServices',
		'ngRoute'
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
		$routeProvider.when("/lists/:id", {
			templateUrl: "partials/viewList.html"
		});
		$routeProvider.otherwise({
			redirectTo: "/"
		});
	}]);


Date.prototype.addDays = function(days)
{
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
};
