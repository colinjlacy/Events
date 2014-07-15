angular.module("eventfulServices", [])
	.factory("eventfulServices", function($http) {
		return {
			findEvents: function(start, end, page, category) {

				var listOfEvents = [];

				// get the current date, which will be the minimum value of the initial event request
				var date = start ? start : new Date(),
					now = date.toISOString().slice(0,10), // revert the current date to an ISO string
					page = page ? page : 1;

				// get a date 30 days in the future
				var future = end ? end : date.addDays(30);
				future = future.toISOString().slice(0,10); // revert the future date to an ISO string

				// reformat dates for the eventful API

				var reformat = function(date) {
					var split = date.split("-");
					var newdate = split.join("");
					return newdate;
				};

				now = reformat(now);
				future = reformat(future);

				var monthNames = [ "neverUsed", "January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December" ];

				var queryParams = {
					date_start: now + "00",
					date_stop: future + "00",
					page_size: page,
					category: category
				};

				$http({
					url: 'server/call.php',
//					url: 'call.php?date_start=' + now + '&date_stop=' + future,
					method: 'GET',
					params: queryParams
				}).success(function(data) {

						console.log(data);

						for (var i = 0; i < data.events.event.length; i++) {

							// Start Year
							data.events.event[i].year = data.events.event[i].start_time.substring(0,4);

							// Start Month
							var monthNum = data.events.event[i].start_time.substring(5,7); // pulls it from the start_time string
							if(monthNum.substr(0,1) == '0') { // if the first number is 0
								monthNum = monthNum.substr(1,1); // only use the second number
							}
							data.events.event[i].month = monthNames[monthNum]; // set the month name by the index in the monthNames array

							data.events.event[i].day = data.events.event[i].start_time.substring(8,10);

							if(data.events.event[i].description) {
								data.events.event[i].description = data.events.event[i].description.replace(/(<([^>]+)>)/ig," ").trim();
							}

							// arrange for a bulk datalist that can be spit out as a long list
							listOfEvents.push(data.events.event[i]);

							console.log(data.events.event[i]);

						}
					});

				return listOfEvents;
			},

			postToCal: function(event, token,attendees) {

				// first I want to make a variable out of the calendar chosen, just to get that out of the way.
				var calID = encodeURIComponent(event.calendar.id);

				// the next step is to map the eventful event object into an object formatted to insert properly into the Google Calendar API

				var startDate = event.start_time.slice(0,10),
					endDate = event.stop_time ? event.stop_time.slice(0,10) : startDate,
					summary = event.title,
					description = event.description + " View the event description on Eventful:" + event.url,
					location = event.venue_name,
					eventAttendees = [];

				if (attendees) {
					for (var i = 0; i < attendees.length; i++) {
						eventAttendees.push({email: attendees[i].email});
					}
				}


				$http({
					url: "https://www.googleapis.com/calendar/v3/calendars/" + calID + "/events?sendNotifications=true&key=185024779579-go9t2i4b44oaffv6as49ijotubekkcql.apps.googleusercontent.com&access_token=" + token,
					method: "POST",
					data: {
						start: {
							date: startDate
						},
						end: {
							date: endDate
						},
						location: location,
						summary: summary,
						description: description,
						attendees: eventAttendees
					}
				});
			}

		}
	});
