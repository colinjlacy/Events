angular.module("boomCal")
	.controller('boomControl', function ($scope, $http, eventDisplay, eventfulServices) {


		// on sucessful login
		$scope.$on('event:google-plus-signin-success', function (event, authResult) {

			// get the access token
			var token = (authResult.access_token);
			$scope.token = token;

			// call the method that displays the first 30 events from the primary calendar
			$scope.data = eventDisplay.listEventsOnLoad(token);

			$scope.cals = eventDisplay.listCalendars(token);

			$scope.findEvents = eventfulServices.findEvents();

		});

		// on failed login
		$scope.$on('event:google-plus-signin-failure', function (event, authResult) {
			// User has not authorized the G+ App!
			console.log('Not signed into Google Plus.');
		});

		// displaying a single event
		$scope.getEvent = function(event) {
			$scope.data.activeEvent = event;
		};

		// toggle whether or not a calendar is in the active list
		$scope.toggleActive = function(cal) {

			// set a variable that will act as a toggle-able value
			var isActive = false;
			for (var i = 0; i < $scope.cals.active.length; i++) { // loop through the array
				if($scope.cals.active[i] == cal.id) { // if the id of the calendar in question matches the id of the current calendar in the array...

					// ...if it's the first item in the array...
					if(i == 0) {
						$scope.cals.active.shift(); // ...drop the first item...
						isActive = true; // ...set the toggle to true so the second part doesn't run...
						break; // ...then break the loop, since you already did what you came to do.

						// ...or, if not...
					} else {
						$scope.cals.active.splice(i, i); // ...splice if out of the cartData array...
						isActive = true; // ...set the toggle to true so the second part doesn't run...
						break; // ...then break the loop, since you already did what you came to do.
					}
				}
			}

			// if the toggle is still false
			if (isActive == false) {
				$scope.cals.active.push(cal.id); // add the id to the array of active calendars
			}
		};

		// revise the events displayed based on the calendars selected
		$scope.reviseEvents = function() {

			// TODO: Fix this.  Right now it only displays the last calendar in the Active array

				var array = $scope.cals.active, // finds the active-calendar array
					token = $scope.token; // as well as the OAuth token

			$scope.data.events = eventDisplay.reviseEvents(array, token); // calls the reviseEvents function on the active-cals array
		};


		$scope.addEvent = function() {

			var object = $scope.data.addEvent, // finds an object built using the event-insert form in the view
				token = $scope.token; // as well as the OAuth token

			object.calID = encodeURIComponent(object.calID); // encodes the calendar ID so that it can be passed as a property of the AJAX url

			// the http POST request
			eventDisplay.addEvent(object, token);

		};


		// Determine whether or not a calendar should be checked
		$scope.shouldBeChecked = function(cal) {

			// set a boolean, which when returned will tell angular whether or not the checkbox should be checked.
			var checkIt = false;
			for (var i = 0; i < $scope.cals.active.length; i++) { // loop through the active calendar array
				if($scope.cals.active[i] == cal.id) { // if the id of the item in question matches the id of the current object in the cart...
					checkIt = true; // ...set the boolean to true so that the checkbox will be checked...
					break; // ...then break the loop, since you already did what you came to do.
				}
			}
			return checkIt;
		};

		$scope.addToAttendees = function() {
			if (!($scope.attendees && $scope.attendees.length > 0)) {
				$scope.attendees = [];
			}
			$scope.attendees.push($scope.attendee);
			$scope.attendee = undefined;
		}

		var date = new Date();

		$scope.today = function() {
			$scope.startDate = date.toISOString().slice(0,10);
		};
		$scope.today();

		$scope.future = function() {
			var future = date.addDays(30);
			$scope.endDate = future.toISOString().slice(0,10);
		};
		$scope.future();

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.reviseDates = function() {
			var token = $scope.token,
				start = $scope.startDate,
				end = $scope.endDate;

			$scope.data = eventDisplay.listEventsOnLoad(token, start, end);
			$scope.findEvents = eventfulServices.findEvents(start, end);
		};

//		$scope.initDate = new Date('2016-15-20');
		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[3];



	});

