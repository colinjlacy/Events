angular.module("eventfulServices",[]).factory("eventfulServices",function(e,t){return{findEvents:function(n,s,r,a,o){var i=[],v=new Date,c=n?n:v.toISOString().slice(0,10),u=s?s:v.addDays(30).toISOString().slice(0,10),r=r?r:1,o=o?o:"popularity";c=/^(\d{4}\-\d\d\-\d\d)$/.test(c)?c:c.toISOString().slice(0,10),u=/^(\d{4}\-\d\d\-\d\d)$/.test(u)?u:u.toISOString().slice(0,10);var l=function(e){var t=e.split("-"),n=t.join("");return n};c=l(c),u=l(u);var d=["neverUsed","January","February","March","April","May","June","July","August","September","October","November","December"],p={date_start:c+"00",date_stop:u+"00",page:r,category:a,sort:o};return e({url:"server/call.php",method:"GET",params:p}).success(function(e){console.log(e),t.eventPageCount=parseInt(e.page_count),t.eventPageNumber=parseInt(e.page_number);for(var n=0;n<e.events.event.length;n++){e.events.event[n].year=e.events.event[n].start_time.substring(0,4);var s=e.events.event[n].start_time.substring(5,7);"0"==s.substr(0,1)&&(s=s.substr(1,1)),e.events.event[n].month=d[s],e.events.event[n].day=e.events.event[n].start_time.substring(8,10),e.events.event[n].description&&(e.events.event[n].description=e.events.event[n].description.replace(/(<([^>]+)>)/gi," ").trim()),i.push(e.events.event[n]),console.log(e.events.event[n])}}),i},postToCal:function(t,n,s){var r=encodeURIComponent(t.calendar.id),a=t.start_time.slice(0,10),o=t.stop_time?t.stop_time.slice(0,10):a,i=t.title,v=t.description+" View the event description on Eventful:"+t.url,c=t.venue_name,u=[];if(s)for(var l=0;l<s.length;l++)u.push({email:s[l].email});e({url:"https://www.googleapis.com/calendar/v3/calendars/"+r+"/events?sendNotifications=true&key=185024779579-go9t2i4b44oaffv6as49ijotubekkcql.apps.googleusercontent.com&access_token="+n,method:"POST",data:{start:{date:a},end:{date:o},location:c,summary:i,description:v,attendees:u}})}}});