/**
 * Created by RavitejaSomisetty on 11/22/2015.
 */
scotchApp.controller("mainController", function ($scope, $location, MyService, $rootScope) {

    $scope.hideWelcome = true;
    $scope.signup = function () {
        $location.url("/register");
    };

    $scope.$watch(function () {
            return $rootScope.isLoggedIn;
        },
        function () {
            $scope.toggleAfterLogin();
            $scope.user = $rootScope.currentUser;
            $scope.name = $rootScope.currentUser.firstname;
        },
        true);

    $scope.toggleAfterLogin = function () {
        if ($rootScope.isLoggedIn) {
            $scope.hideLogin = true;
            $scope.hideWelcome = false;
        } else {
            $scope.hideWelcome = true;
        }
    };

    $scope.login = function () {
        MyService.login($scope.user, function (res) {
            if (res == 'error') {
                alert("System Error")
            }
            if (res == null) {
                alert("Incorrect details")
            }
            else {
                $scope.name = $rootScope.currentUser.firstname;
                $rootScope.isLoggedIn = true;
                //   $location.url("/register");
                $location.url("/");
                $scope.$broadcast("ShowCategories");
                $scope.$broadcast("Show");
            }
        })

    };

    $scope.logout = function () {
        MyService.logout($scope.user, function (res) {
            if (res == 'Error') {
                alert("System Error")
            }
            else {
                alert("Logged out");
                MyService.dislikeEvent(function (res) {
                    if (res == 'error') alert('Log out error');
                    if (res == null) alert('Seems you are not logged in');
                    else {
                        $scope.hideLogin = false;
                        $scope.hideWelcome = true;
                        $location.url("/");
                        $rootScope.isLoggedIn = false;
                        $scope.$broadcast("Show");
                    }
                });

            }
        });
    }
});
