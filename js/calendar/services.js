angular.module("eventDisplay", [])
	.factory("eventDisplay", function($http, $rootScope) {

		return {
			listEventsOnLoad: function(token, start, end) {

				// Set an object that will be returned
				var session = {};

				// make the initial AJAX call to retrieve the user account information
				$http.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + token).success(function(data) {

					// save user data as a property of the returned object, which will be used globally
					session.user = data;

					var email = session.user.emails[0].value;
					var id = session.user.id;

					$rootScope.google_id = id;

					$http({
						url: "server/set_user.php",
						method: "POST",
						data: {
							email: email,
							google_id: id
						}
					}).success(function(userData) {
							console.log(userData);
						});

					// TODO: Take this out, make it a separate call somewhere else

					// now use the user data to get their contacts
					$http.get('server/contacts.php?token=' + token +'&email=' + email).success(function(contacts) {

						// create an array in which I'll store the values I need from the returned contacts
						session.contacts = [];

						// simplify this convoluted object into an easy-to-write variable
						var rawContactsArray = contacts.feed.entry;

						// loop through the contacts...
						for (var i = 0; i < rawContactsArray.length; i++) {

							// if there is an email address set (Droid creates Google contacts without email addresses)
							if (rawContactsArray[i].gd$email && rawContactsArray[i].gd$email[0].address) {
								var contact = { // create a simple object on the local scope

									// set the email address to the email property
									email: rawContactsArray[i].gd$email[0].address,

									// if there is a title for this person, set that to the title property, otherwise use their email address
									// TODO: figure out why I can't use this.email in the line below to define the email fallback for the title property
									title: rawContactsArray[i].title.$t != "" ? rawContactsArray[i].title.$t : rawContactsArray[i].gd$email[0].address
								};

								// push the new contact into the session.contacts array
								session.contacts.push(contact);
							}
						}
					});

					// get the current date, which will be the minimum value of the initial event request
					var date = start ? start : new Date(),
						now = date.toISOString(); // revert the current date to an ISO string


					// get a date 30 days in the future
					var future = end ? end : date.addDays(30);
					future = future.toISOString(); // revert the future date to an ISO string

					// set an empty array for the events property of the returned object
					session.events = [];

					// TODO: revise this AJAX call so that it's passed as an object, not a massive unreadable string
					// get all events over the course of the next month from the user's primary calendar (as set by their email address
					$http.get('https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=' + now + '&timeMax=' + future + '&access_token=' + token).success(function(theseEvents) {

						var timeZone = theseEvents.timeZone;

						// loop through all returned events
						for (var i = 0; i < theseEvents.items.length; i++) {

							// if the current event has a "recurrence" property
							if (theseEvents.items[i].recurrence) {

								// TODO: revise this AJAX call so that it's passed as an object, not a massive unreadable string
								// AJAX call for all instances of the event over the next month
								$http.get('https://www.googleapis.com/calendar/v3/calendars/primary/events/' + theseEvents.items[i].id + '/instances?timeMin=' + now + '&timeMax=' + future + '&timeZone=' + timeZone + '&access_token=' + token).success(function(thisEventRecurrences) {

									// loop through each instance of this recurring event
									for (var j = 0; j < thisEventRecurrences.items.length; j++) {

										// set a wcStart value to be displayed
										thisEventRecurrences.items[j].wcStart = thisEventRecurrences.items[j].start.date ? thisEventRecurrences.items[j].start.date : thisEventRecurrences.items[j].start.dateTime;
										// add this event to the returned object's events array property
										session.events.push(thisEventRecurrences.items[j]);
									}
								});

								// if there is no "recurrence" property
							} else {

								// set a wcStart date
								theseEvents.items[i].wcStart = theseEvents.items[i].start.date ? theseEvents.items[i].start.date : theseEvents.items[i].start.dateTime;

								// add this event to the returned object's events array property
								session.events.push(theseEvents.items[i]);
							}
						}
					});
				});

				return session;

			},

			listCalendars: function(token) {

				// TODO: I know this can be written better, but for now it works

				// set a blank object to be returned
				var cals = {};

				// create an array in the blank object, which will house the active calendars
				cals.active = [];

				// make the AJAX call to get the calendar list
				$http.get('https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=' + token).success(function(data) {
					cals.calsList = data.items; // set a property for the returnable object

					// loop through the list of calednars
					for (var i = 0; i < cals.calsList.length; i++) {

						// find the primary calendar...
						if (cals.calsList[i].hasOwnProperty('primary')) {
							cals.active.push(cals.calsList[i].id); // ...and add it to the active calendars array
						}
					}
				});

				// return the list of calendars as a property of an object
				return cals;
			},

			reviseEvents: function(array, token) {

				// TODO: This needs to be fixed.  Right now it's showing only one or two calendars at a time, usually the last calendar in the array.  Not what you want.

				// set an object that will be returned to the $scope of the app
				var revised = {};

				// get the current date, which will be the minimum value of the initial event request
				var date = new Date(),
					now = date.toISOString(), // revert the current date to an ISO string
					future = date;

				// get a date 30 days in the future
				future.setDate(future.getDate() + 30);
				future = future.toISOString(); // revert the future date to an ISO string

				// set a blank array, which will be filled by the AJAX request
				revised.events = [];

				// start looping through the array parameter, which will be full of Google Calendar IDs
				for (var i = 0; i < array.length; i++) {

					// set a local variable for the calendar ID
					var calID = encodeURIComponent(array[i]);

					// create an ajax call to get that calendar's events
					$http.get('https://www.googleapis.com/calendar/v3/calendars/' + calID + '/events?timeMin=' + now + '&timeMax=' + future + '&access_token=' + token).success(function(theseEvents) {

//						console.log(theseEvents.items);

						// now loop through those events for recurrences
						for (var j = 0; j < theseEvents.items.length; j++) {

//							console.log(theseEvents.items[j] + Date.now());

							// if this is a recurring event
							if (theseEvents.items[j].recurrence) {

								// send an ajax request to get all the instances that fall between the now and the future variables
								$http.get('https://www.googleapis.com/calendar/v3/calendars/' + calID + '/events/' + theseEvents.items[j].id + '/instances?timeMin=' + now + '&timeMax=' + future + '&timeZone=2014-06-09T15%3A23%3A56.706Z&access_token=' + token).success(function(thisEventRecurrences) {

									// add a wcStart property
									for (var k = 0; k < thisEventRecurrences.items.length; k++) {
										thisEventRecurrences.items[k].wcStart = thisEventRecurrences.items[k].start.date ? thisEventRecurrences.items[k].start.date : thisEventRecurrences.items[k].start.dateTime;
										// add it to the revised object
										revised.events.push(thisEventRecurrences.items[k]);
									}
								});
							} else { // or, if it's not a recurring event

								// add a wcStart property
								theseEvents.items[j].wcStart = theseEvents.items[j].start.date ? theseEvents.items[j].start.date : theseEvents.items[j].start.dateTime;

								// add it to the revised object
								revised.events.push(theseEvents.items[j]);
							}
						}

					});
				}

				return revised.events;

			},

			addEvent: function(object, token) {

				// TODO: Build this out. Right now it only supports manual date entry, title, description, and attendees.  No time, reoccurring events, etc.

				$http({
					url: "https://www.googleapis.com/calendar/v3/calendars/" + object.calID + "/events?key=185024779579-go9t2i4b44oaffv6as49ijotubekkcql.apps.googleusercontent.com&access_token=" + token,
					method: "POST",
					data: {
						start: {
							date: object.start
						},
						end: {
							date: object.end
						},
						summary: object.title,
						description: object.description
					}
				})
			}

//			getContacts: function(user, token) {
//				var contacts = {},
//					email = user.emails[0].value;
//
//				$http.get('contacts.php?token=' + token +'&email=' + email).success(function(data) {
//					contacts.data = data;
//					console.log(data);
//				});
//
//				return contacts.data;
//			}
		}
	});
