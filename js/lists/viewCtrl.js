angular.module("boomCal")
    .controller("viewCtrl", function($scope, $http, $routeParams, $rootScope, $location) {

        var getList = function(id) {
            $http({
	            url: 'server/retrieve_list_items.php',
	            method: "GET",
	            params: {
		            list_id: id
	            }
            })
                .success(function(data) {
		            console.log(data);
                    $scope.items = data;
                })
                .error(function(error) {
                    $scope.viewError = error;
                })
        };
        getList($routeParams.id);

        $scope.doneToggle = function(item) {
            if (item.done == true) {
                item.done = false;
            } else {
                item.done = true;
            }
        };

        $scope.hideDoneToggle = function() {
            if ($scope.hideDone) {
                $scope.hideDone = false;
                document.getElementById('hide-toggle').innerHTML="Hide Checked";
            } else {
                $scope.hideDone = true;
                document.getElementById('hide-toggle').innerHTML="Show Checked";
            }
        };

        $scope.shouldBeHidden = function(item) {
            if ($scope.hideDone && item.done == true) {
                return true;
            }
        };

        $scope.updateList = function() {
            var doneArray = [];

            console.log($scope.items);

            for(var i = 0; i < $scope.items.length; i++) {
                console.log($scope.items[i].id + " = " + $scope.items[i].done);
                if ($scope.items[i].done == true) {
                    doneArray.push($scope.items[i].id);
                    $scope.items.splice(i, 1);
                    i = i - 1;
                }
            }

            console.log(doneArray);

            $http({
                url: 'delete_items.php',
                method: "POST",
                data: doneArray
            })
                .success(function(data) {
                    console.log(data);
                    $location.path('/');
                });
        };

        $scope.deleteList = function(id) {
            var url = 'delete_list.php';

            $http({
                url: url,
                method: "POST",
                data: id
            })
                .success(function(data) {
                    for (var i = 0; i < $rootScope.lists.length; i++) {
                        console.log("id: "+id);
                        console.log("list id: "+$rootScope.lists[i].id);

                        if (id == $rootScope.lists[i].id) {
                            console.log("list id: "+$rootScope.lists[i].id);
                            $rootScope.lists.splice(i, 1);
                            break;
                        }
                    }
                    $location.path('/');
                });
        };

		$scope.editList = function(id) {
			$location.path('lists/edit/' + id);
		};


    });
