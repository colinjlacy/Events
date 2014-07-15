angular.module("eventfulServices",[]).factory("eventfulServices",function(e){return{findEvents:function(t,n,s,r){var a=[],i=t?t:new Date,o=i.toISOString().slice(0,10),s=s?s:1,v=n?n:i.addDays(30);v=v.toISOString().slice(0,10);var c=function(e){var t=e.split("-"),n=t.join("");return n};o=c(o),v=c(v);var l=["neverUsed","January","February","March","April","May","June","July","August","September","October","November","December"],u={date_start:o+"00",date_stop:v+"00",page_size:s,category:r};return e({url:"server/call.php",method:"GET",params:u}).success(function(e){console.log(e);for(var t=0;t<e.events.event.length;t++){e.events.event[t].year=e.events.event[t].start_time.substring(0,4);var n=e.events.event[t].start_time.substring(5,7);"0"==n.substr(0,1)&&(n=n.substr(1,1)),e.events.event[t].month=l[n],e.events.event[t].day=e.events.event[t].start_time.substring(8,10),e.events.event[t].description&&(e.events.event[t].description=e.events.event[t].description.replace(/(<([^>]+)>)/gi," ").trim()),a.push(e.events.event[t]),console.log(e.events.event[t])}}),a},postToCal:function(t,n,s){var r=encodeURIComponent(t.calendar.id),a=t.start_time.slice(0,10),i=t.stop_time?t.stop_time.slice(0,10):a,o=t.title,v=t.description+" View the event description on Eventful:"+t.url,c=t.venue_name,l=[];if(s)for(var u=0;u<s.length;u++)l.push({email:s[u].email});e({url:"https://www.googleapis.com/calendar/v3/calendars/"+r+"/events?sendNotifications=true&key=185024779579-go9t2i4b44oaffv6as49ijotubekkcql.apps.googleusercontent.com&access_token="+n,method:"POST",data:{start:{date:a},end:{date:i},location:c,summary:o,description:v,attendees:l}})}}});