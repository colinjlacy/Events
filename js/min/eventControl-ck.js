angular.module("boomCal").controller("eventControl",function(n,o,t){n.findEvents=t.findEvents(),n.showThisEvent=function(o){n.data.showEvent=o},o.eventAdd=function(){console.log("click"),o.eventToBeAdded=n.data.showEvent,n.data.showEvent=void 0},o.postToCal=function(o){var e=n.token,a=n.attendees;t.postToCal(o,e,a)}});