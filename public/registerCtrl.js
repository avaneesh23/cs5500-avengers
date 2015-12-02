scotchApp.controller("registerCtrl", function ($scope, $location, MyService, $rootScope, $filter) {

        $scope.categories = $rootScope.categoriesList.category;
        $scope.selectedCategories = function () {
            $scope.newUser.categories = $filter('filter')($scope.categories, {checked: true});
        };

        $rootScope.isLoggedIn = false;
        $scope.register = function () {
            if ($scope.newUser.password == $scope.newUser.confirmpassword) {
                MyService.register($scope.newUser, function (res) {
                    if (res == 'Error') {
                        alert("System Error")
                    }
                    else {
                        $rootScope.isLoggedIn = true;
                        $location.url("/");
                    }
                });
            } else {
                alert("passwords do not match.");
            }

        };

        $scope.gotohome = function () {
            $location.url("/home");
        };

    }
);