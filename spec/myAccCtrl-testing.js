describe('Testing preferences through myAccCtrl', function() {
    beforeEach(module('scotchApp'));

    var $controller, $rootScope, $scope;

    beforeEach(inject(function($injector){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $controller = $injector.get('$controller');

    }));

    beforeEach( function() {

        //var allCatList = new Object();
        //allCatList.category = ['Concerts', 'Restaurants', 'Festivals'];
        //$rootScope.categoriesList = allCatList;
        var controller = $controller('getLocation', {$scope: $scope});


    });

    beforeEach( function() {


        //var user = new Object();
        //user.categories = $rootScope.categoriesList.category;
        //$rootScope.currentUser = user;
    });


    it('Should only keep categories user has selected when registering', function() {

        //$rootScope.currentUser.categories = $rootScope.categoriesList.category;
        //expect($rootScope.currentUser.categories.length).toBe(3);
        //var controller = $controller('myAccCtrl', { $scope: $scope });
        //$scope.init()
        //expect($rootScope.currentUser.categories).toContain('Concerts');
        expect($scope.categories).toBe([]);
    });
});