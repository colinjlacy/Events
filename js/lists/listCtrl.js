angular.module("boomCal")
    .controller("listCtrl", function($scope, $http, $location, $route, $rootScope) {

        var init = function(id) {
            $http({
                url: "server/retrieve_lists.php",
                method: "GET",
	            params: {
		            google_id: id
	            }
	        })
                .success(function(response) {
                    $scope.lists = response;
		            console.log(response);

                    if(response.owned.length > 0) {
                        $scope.hasLists = true;
                    }

                })
                .error(function(error) {
                    $scope.status = error || "Request Failed";
                });
        };
        init($rootScope.google_id);

		$scope.viewList = function(list) {
			$rootScope.activeList = list;
			$location.path('lists/' + list.id);
		};

        $scope.deleteList = function(id, index) {
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
                    $scope.lists.owned.splice(index, 1);
                    if ($scope.lists.owned.length == 0) {
                        $scope.hasLists = false;
                    }
                });
        };

        $scope.add = {};

        $scope.addItem = function(item) {

            if(!($scope.add.items)) {
                $scope.add.items = [];
            }

            $scope.add.items.push(item);
            $scope.add.itemToAdd = "";
            var input = document.getElementById('addInput');
            input.focus();
        };

        $scope.remove = function(index) {
            $scope.add.items.splice(index, 1);
        };

        $scope.save = function() {
            $scope.add.google_id = $rootScope.google_id;
            var add = $scope.add;
            var url = 'server/create_list.php';

            $http({
                url: url,
                method: "POST",
                data: add
            })
                .success(function(data) {
//                    console.log(data);
                    if(!isNaN(data)) {
                        $scope.add.error = null;
                        add.id = data;
                        $scope.lists.owned.push(add);
                        $scope.hasLists = true;
                        $scope.add = {};
                        $location.path('#/lists/');
                    } else {
                        $scope.add.error = data;
                    }
                })
                .error(function(error) {
                    console.log(error);
                    $scope.add.error = error;
                });
        };

    });
