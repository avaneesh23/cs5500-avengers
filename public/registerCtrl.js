scotchApp.controller("LoginCtrl", function ($scope, $location, MyService, $rootScope) {

        $rootScope.isLoggedIn = false;
        $scope.register = function () {
            if ($scope.newUser.password == $scope.newUser.confirmpassword) {
                MyService.register($scope.newUser, function (res) {
                    if (res == 'Error') {
                        alert("System Error")
                    }
                    else {

                        //var user = {"firstname": $scope.newUser.firstname, "lastname": $scope.newUser.lastname};
                        //MyService.login(user, function (res) {
                        //    if (res == 'error') {
                        //        alert("System Error")
                        //    }
                        //    if (res == null) {
                        //        alert("Incorrect details")
                        //    }
                        //    else {
                        //        $rootScope.isLoggedIn = true;
                        //    }
                        //});
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