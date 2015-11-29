/**
 * Created by RavitejaSomisetty on 11/26/2015.
 */
scotchApp.controller("myAccCtrl", function ($scope, $location, MyService, $rootScope) {
    $scope.firstName=$rootScope.currentUser.firstname;
    $scope.lastName=$rootScope.currentUser.lastname;
    $scope.email=$rootScope.currentUser.email;
});