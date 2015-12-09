describe('Testing Events module through the mainController', function() {
    beforeEach(module('scotchApp'));

    //beforeEach(module('scotchApp'));

    var $controller, $rootScope, $scope;

    beforeEach(inject(function($injector){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $controller = $injector.get('$controller');

    }));


    it('Should initialize main controller', function() {

        var controller = $controller('mainController', { $scope: $scope });
        expect($scope.hideWelcome).toBe(true)

    });
});

// run a search and check that all categories are in preferences