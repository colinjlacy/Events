angular.module("boomCal",["directive.g+signin","ui.bootstrap","eventDisplay","eventfulServices","ngRoute"]).config(function(e){e.when("/",{templateUrl:"/events/partials/eventList.html"}),e.otherwise({templateUrl:"/events/partials/eventList.html"})});