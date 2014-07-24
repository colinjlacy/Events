angular.module("eventDisplay",[]).factory("eventDisplay",function(e,t){return{listEventsOnLoad:function(s,a,i){var n={};return e.get("https://www.googleapis.com/plus/v1/people/me?access_token="+s).success(function(r){n.user=r;var c=n.user.emails[0].value,o=n.user.id,m=n.user.displayName;t.google_id=o,e({url:"server/set_user.php",method:"POST",data:{email:c,google_id:o,displayName:m}}).success(function(e){console.log(e)}),e.get("server/contacts.php?token="+s+"&email="+c).success(function(e){n.contacts=[];for(var t=e.feed.entry,s=0;s<t.length;s++)if(t[s].gd$email&&t[s].gd$email[0].address){var a={email:t[s].gd$email[0].address,title:""!=t[s].title.$t?t[s].title.$t:t[s].gd$email[0].address};n.contacts.push(a)}});var l=a?a:new Date,d=l.toISOString(),u=i?i:l.addDays(30);u=u.toISOString(),n.events=[],e.get("https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin="+d+"&timeMax="+u+"&access_token="+s).success(function(t){for(var a=t.timeZone,i=0;i<t.items.length;i++)t.items[i].recurrence?e.get("https://www.googleapis.com/calendar/v3/calendars/primary/events/"+t.items[i].id+"/instances?timeMin="+d+"&timeMax="+u+"&timeZone="+a+"&access_token="+s).success(function(e){for(var t=0;t<e.items.length;t++)e.items[t].wcStart=e.items[t].start.date?e.items[t].start.date:e.items[t].start.dateTime,n.events.push(e.items[t])}):(t.items[i].wcStart=t.items[i].start.date?t.items[i].start.date:t.items[i].start.dateTime,n.events.push(t.items[i]))})}),n},listCalendars:function(t){var s={};return s.active=[],e.get("https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token="+t).success(function(e){s.calsList=e.items;for(var t=0;t<s.calsList.length;t++)s.calsList[t].hasOwnProperty("primary")&&s.active.push(s.calsList[t].id)}),s},reviseEvents:function(t,s){var a={},i=new Date,n=i.toISOString(),r=i;r.setDate(r.getDate()+30),r=r.toISOString(),a.events=[];for(var c=0;c<t.length;c++){var o=encodeURIComponent(t[c]);e.get("https://www.googleapis.com/calendar/v3/calendars/"+o+"/events?timeMin="+n+"&timeMax="+r+"&access_token="+s).success(function(t){for(var i=0;i<t.items.length;i++)t.items[i].recurrence?e.get("https://www.googleapis.com/calendar/v3/calendars/"+o+"/events/"+t.items[i].id+"/instances?timeMin="+n+"&timeMax="+r+"&timeZone=2014-06-09T15%3A23%3A56.706Z&access_token="+s).success(function(e){for(var t=0;t<e.items.length;t++)e.items[t].wcStart=e.items[t].start.date?e.items[t].start.date:e.items[t].start.dateTime,a.events.push(e.items[t])}):(t.items[i].wcStart=t.items[i].start.date?t.items[i].start.date:t.items[i].start.dateTime,a.events.push(t.items[i]))})}return a.events},addEvent:function(t,s){e({url:"https://www.googleapis.com/calendar/v3/calendars/"+t.calID+"/events?key=185024779579-go9t2i4b44oaffv6as49ijotubekkcql.apps.googleusercontent.com&access_token="+s,method:"POST",data:{start:{date:t.start},end:{date:t.end},summary:t.title,description:t.description}})}}});