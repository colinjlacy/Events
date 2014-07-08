angular.module("eventDisplay",[]).factory("eventDisplay",function(e){return{listEventsOnLoad:function(t){var s={};return e.get("https://www.googleapis.com/plus/v1/people/me?access_token="+t).success(function(a){s.user=a;var i=s.user.emails[0].value;e.get("contacts.php?token="+t+"&email="+s.user.emails[0].value).success(function(e){s.contacts=[];for(var t=e.feed.entry,a=0;a<t.length;a++)if(t[a].gd$email&&t[a].gd$email[0].address){var i={email:t[a].gd$email[0].address,title:""!=t[a].title.$t?t[a].title.$t:t[a].gd$email[0].address};s.contacts.push(i)}console.log(s.contacts)});var n=new Date,r=n.toISOString(),c=n;c.setDate(c.getDate()+30),c=c.toISOString(),s.events=[],e.get("https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin="+r+"&timeMax="+c+"&access_token="+t).success(function(a){for(var i=a.timeZone,n=0;n<a.items.length;n++)a.items[n].recurrence?e.get("https://www.googleapis.com/calendar/v3/calendars/primary/events/"+a.items[n].id+"/instances?timeMin="+r+"&timeMax="+c+"&timeZone="+i+"&access_token="+t).success(function(e){for(var t=0;t<e.items.length;t++)e.items[t].wcStart=e.items[t].start.date?e.items[t].start.date:e.items[t].start.dateTime,s.events.push(e.items[t])}):(a.items[n].wcStart=a.items[n].start.date?a.items[n].start.date:a.items[n].start.dateTime,s.events.push(a.items[n]))})}),s},listCalendars:function(t){var s={};return s.active=[],e.get("https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token="+t).success(function(e){s.calsList=e.items;for(var t=0;t<s.calsList.length;t++)s.calsList[t].hasOwnProperty("primary")&&s.active.push(s.calsList[t].id)}),s},reviseEvents:function(t,s){var a={},i=new Date,n=i.toISOString(),r=i;r.setDate(r.getDate()+30),r=r.toISOString(),a.events=[];for(var c=0;c<t.length;c++){var o=t[c];e.get("https://www.googleapis.com/calendar/v3/calendars/"+o+"/events?timeMin="+n+"&timeMax="+r+"&access_token="+s).success(function(t){for(var i=0;i<t.items.length;i++)t.items[i].hasOwnProperty("recurrence")?e.get("https://www.googleapis.com/calendar/v3/calendars/"+o+"/events/"+t.items[i].id+"/instances?timeMin=2014-06-02T15%3A23%3A56.706Z&timeMax=2014-07-02T15%3A23%3A56.706Z&timeZone=2014-06-09T15%3A23%3A56.706Z&access_token="+s).success(function(e){for(var t=0;t<e.items.length;t++)e.items[t].wcStart=e.items[t].start.date?e.items[t].start.date:e.items[t].start.dateTime,a.events.push(e.items[t])}):(t.items[i].wcStart=t.items[i].start.date?t.items[i].start.date:t.items[i].start.dateTime,a.events.push(t.items[i]))})}return a.events},addEvent:function(t,s){e({url:"https://www.googleapis.com/calendar/v3/calendars/"+t.calID+"/events?key=185024779579-go9t2i4b44oaffv6as49ijotubekkcql.apps.googleusercontent.com&access_token="+s,method:"POST",data:{start:{date:t.start},end:{date:t.end},summary:t.title,description:t.description}})}}});