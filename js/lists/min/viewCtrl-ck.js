angular.module("boomCal").controller("viewCtrl",function(e,o,i,t,n){var s=function(i){o({url:"server/retrieve_list_items.php",method:"GET",params:{list_id:i}}).success(function(o){console.log(o),e.items=o}).error(function(o){e.viewError=o})};s(i.id),e.doneToggle=function(e){e.done=1==e.done?!1:!0},e.hideDoneToggle=function(){e.hideDone?(e.hideDone=!1,document.getElementById("hide-toggle").innerHTML="Hide Checked"):(e.hideDone=!0,document.getElementById("hide-toggle").innerHTML="Show Checked")},e.shouldBeHidden=function(o){return e.hideDone&&1==o.done?!0:void 0},e.updateList=function(){var i=[];console.log(e.items);for(var t=0;t<e.items.length;t++)console.log(e.items[t].id+" = "+e.items[t].done),1==e.items[t].done&&(i.push(e.items[t].id),e.items.splice(t,1),t-=1);console.log(i),o({url:"delete_items.php",method:"POST",data:i}).success(function(e){console.log(e),n.path("/")})},e.deleteList=function(e){var i="delete_list.php";o({url:i,method:"POST",data:e}).success(function(o){for(var i=0;i<t.lists.length;i++)if(console.log("id: "+e),console.log("list id: "+t.lists[i].id),e==t.lists[i].id){console.log("list id: "+t.lists[i].id),t.lists.splice(i,1);break}n.path("/")})},e.editList=function(e){n.path("lists/edit/"+e)}});