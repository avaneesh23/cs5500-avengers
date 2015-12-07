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
        $rootScope.categoriesList.category[i].checked = false;
    }
    for (var i = 0; i < $rootScope.currentUser.categories.length; i++) {
        for (var j = 0; j < $rootScope.categoriesList.category.length; j++) {
            $scope.categories[j] = $rootScope.categoriesList.category[j];
            if ($rootScope.categoriesList.category[j].id == $rootScope.currentUser.categories[i].id) {
                $scope.categories[j].checked = true;
            }
        }
    }

    $scope.update = function () {
        var selected = $filter('filter')($scope.categories, {checked: true});
        for (var i = 0; i < selected.length; i++) {
            var duplicate = false;
            for (var j = 0; j < $rootScope.currentUser.categories.length; j++) {
                if ($rootScope.currentUser.categories[j].id == selected[i].id) {
                    duplicate = true;
                }
            }
            if (!duplicate)
                $rootScope.currentUser.categories.push(selected[i]);
        }
        $rootScope.currentUser.withinRadius = $scope.withinRadius;
        MyService.update($rootScope.currentUser, function (res) {
            if (res == 'error')
                alert('Update failed');
            else
                alert("Update success");
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