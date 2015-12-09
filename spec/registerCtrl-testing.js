describe('Testing sign up functionality in registration controller', function() {
    beforeEach(module('scotchApp'));

    //beforeEach(module('scotchApp'));

    var $controller, $rootScope, $scope;

    beforeEach(inject(function($injector){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $controller = $injector.get('$controller');

    }));


    it('should result in having a logged in user ', function() {
        var catList = new Object();
        catList.category = ['Concerts'];

        $rootScope.categoriesList = catList;

        var user = new Object();
        user.password = "pswd";
        user.confirmpassword = "pswd";

        $rootScope.newUser = user;
        var controller = $controller('registerCtrl', { $scope: $scope });
        $scope.register();
        expect($rootScope.isLoggedIn).toBe(false);
        //expect(res).toBe("?");
        });
});