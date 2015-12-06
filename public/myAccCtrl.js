/**
 * Created by RavitejaSomisetty on 11/26/2015.
 */
scotchApp.controller("myAccCtrl", function ($scope, $location, MyService, $rootScope, $filter) {
    $scope.firstName = $rootScope.currentUser.firstname;
    $scope.lastName = $rootScope.currentUser.lastname;
    $scope.email = $rootScope.currentUser.email;

    $scope.withinRadius = $rootScope.currentUser.withinRadius;

    $scope.categories = $filter('filter')($rootScope.currentUser.categories + $rootScope.categoriesList.categories, {checked: true});
    //$scope.categories = $filter('filter1')($rootScope.categoriesList.category, {name: 'Conferences &amp; Tradeshows'});
    $scope.selectedCategories = function () {
        $rootScope.currentUser.categories = $filter('filter')($scope.categories, {checked: true});
    }

    $scope.update = function () {
        $rootScope.currentUser.withinRadius = $scope.withinRadius;
        MyService.update($rootScope.currentUser, function (res) {
            if (res == 'error')
                alert('Update failed');
            else
                $location.url("/myaccount");
        });

    };

    //update password
    $scope.updatePassword = function () {
        if ($scope.newpassword == $scope.confirmpassword) {
            console.log("controller called");
            MyService.updatePassword($rootScope.currentUser, $scope.oldpassword, $scope.newpassword, function (res) {
                if (res == 'error')
                    alert('update password failed');
                else if(res=='ok')
                    alert('password is now updated');
                else
                alert('system error updating');
            });
        }
        else
            alert('New password doesnot match with confirmed');
    };
});