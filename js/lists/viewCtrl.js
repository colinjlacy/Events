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
            if (item.done == 1) {
                item.done = 0;
            } else {
                item.done = 1;
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
            if ($scope.hideDone && item.done == 1) {
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


		// TODO: Pull this out into a service, and revise so that a message is displayed on the $rootScope
        $scope.deleteList = function(id) {
            var url = 'server/delete_list.php';

            $http({
                url: url,
                method: "POST",
                data: {
	                list_id: id,
	                google_id: $rootScope.google_id
                }
            })
                .success(function(data) {
                    $location.path('lists/');
                });
        };

		$scope.editList = function(id) {
			$location.path('lists/edit/' + id);
		};

		$scope.addItem = function(item) {

			$scope.items.push(item);
			$scope.itemToAdd = "";
			var input = document.getElementById('addInput');
			input.focus();
		};

		$scope.remove = function(index) {
			$scope.items.splice(index, 1);
		};

		$scope.saveEditedList = function() {
			var url = 'server/edit_list.php';
			var data = {
				google_id: $rootScope.google_id,
				list_id: $rootScope.activeList.id,
				items: $scope.items
			}

			$http({
				url: url,
				method: "POST",
				data: data
			})
				.success(function(returnedID) {
					$location.path('lists/' + returnedID);
					$rootScope.activeList.alert = {
						type: "alert-success",
						message: "This list has been updated!  Nicely done!"
					}
				});
		}


    });
