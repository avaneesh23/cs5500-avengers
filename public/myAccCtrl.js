/**
 * Created by RavitejaSomisetty on 11/26/2015.
 */
scotchApp.controller("myAccCtrl", function ($scope, $location, MyService, $rootScope, $filter) {
    $scope.firstName = $rootScope.currentUser.firstname;
    $scope.lastName = $rootScope.currentUser.lastname;
    $scope.email = $rootScope.currentUser.email;

    $scope.withinRadius = $rootScope.currentUser.withinRadius;

    $scope.categories = [];
    for (var i = 0; i < $rootScope.categoriesList.category.length; i++) {
        for (var j = 0; j < $rootScope.currentUser.categories.length; j++) {

            if ($rootScope.categoriesList.category[i].id == $rootScope.currentUser.categories[j].id
                && $rootScope.categoriesList.category[i].name == $rootScope.currentUser.categories[j].name) {

                $scope.categories[i] = $rootScope.currentUser.categories[j];
                //console.log($scope.categories[i] + "passed");
                // $scope.categories[i].checked=($rootScope.currentUser.categories[j].checked);

            }
            else {
                $scope.categories[i] = $rootScope.categoriesList.category[i];
                //console.log($scope.categories[i] + "outside");
            }
        }
    }
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
            MyService.updatePassword($rootScope.currentUser, $scope.oldpassword, $scope.newpassword, function (res) {
                if (res == 'error')
                    alert('update password failed');
                else if (res == 'ok')
                    alert('password is now updated');
                else
                    alert('system error updating');
            });
        }
        else
            alert('New password doesnot match with confirmed');
    };
});