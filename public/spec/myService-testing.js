describe('Testing navigation provided by MyService', function () {

// load the controller's module
    beforeEach(module('scotchApp'));

    it('Should start at home page', inject(function($route) {
        expect($route.routes['/'].controller).toBe('mainController');
        expect($route.routes['/'].templateUrl).toEqual('pages/home.html');
    }));

    it('Should change to about page', inject(function($route) {
        expect($route.routes['/about'].controller).toBe('aboutController');
        expect($route.routes['/about'].templateUrl).toEqual('pages/about.html');
    }));

    it('Should change to contact page', inject(function($route) {
        expect($route.routes['/contact'].controller).toBe('contactController');
        expect($route.routes['/contact'].templateUrl).toEqual('pages/contact.html');
    }));

    it('Should change to register page', inject(function($route) {
        expect($route.routes['/register'].controller).toBe('registerCtrl');
        expect($route.routes['/register'].templateUrl).toEqual('pages/registerHTML.html');
    }));

    it('Should change to account page', inject(function($route) {
        expect($route.routes['/myaccount'].controller).toBe('myAccCtrl');
        expect($route.routes['/myaccount'].templateUrl).toEqual('pages/myAccount.html');
    }));

});