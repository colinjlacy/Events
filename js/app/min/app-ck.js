angular.module("boomCal",["directive.g+signin","ui.bootstrap","eventDisplay","eventfulServices","ngRoute"]).config(["$routeProvider",function(t){t.when("/",{templateUrl:"partials/calendar.html"}),t.when("/events/",{templateUrl:"partials/eventList.html"}),t.when("/lists/",{templateUrl:"partials/allLists.html"}),t.when("/lists/add",{templateUrl:"partials/addList.html"}),t.when("/lists/:id",{templateUrl:"partials/viewList.html"}),t.otherwise({redirectTo:"/"})}]),Date.prototype.addDays=function(t){var e=new Date(this.valueOf());return e.setDate(e.getDate()+t),e};