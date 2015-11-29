var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngMap']);

// configure our routes
//noinspection JSUnresolvedFunction
scotchApp.config(function ($routeProvider) {
    //noinspection JSUnresolvedFunction
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
        }).when('/register', {
        templateUrl: 'pages/registerHTML.html',
        controller: 'LoginCtrl'
    }).when('/myaccount', {
        templateUrl: 'pages/myAccount.html',
        controller: 'myAccCtrl'
    });
});


scotchApp.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('getLocation', function ($scope, $http, NgMap) {

    //google.maps.event.trigger(map, "resize");
    $scope.gPlace,
        $scope.eventDetails = [],
        $scope.busy = false,
        $scope.loader = true,
        $scope.pageNo = 1,
        $scope.pageCount = 0,
        $scope.userlat = "0",
        $scope.userlong = "0",
        $scope.error = "",
        $scope.visibility = false,
        $scope.searchQuery = "",
        $scope.category = "",
        $scope.sortOptions = ["Popularity","Date","Relevance"],
        $scope.sortOrder = "Popularity",
        $scope.where = "",
        $scope.clickedEvent = null,
        $scope.apiKey = "rcnxbzfT3dLNF3ff",
        $scope.url = "";
    //  $scope.url = "http://api.eventful.com/json/events/search?app_key="+$scope.apiKey+"&keywords=books&location="+$scope.searchQuery+"&date=Future";

    $scope.init = function () {
        //google.maps.event.trigger(map, "resize");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        }
        else {
            $scope.error = "Geolocation is not supported by this browser";
        }
    };

    $scope.showPosition = function (position) {
        $scope.userlat = position.coords.latitude;
        $scope.userlong = position.coords.longitude;
        $scope.where = $scope.userlat + "," + $scope.userlong;
        //$scope.url = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within=10&units=mi&date=Future&page_size=50&include=categories,price,links&sort_order=" + $scope.sortOrder;
        $scope.categoryUrl = "http://api.eventful.com/json/categories/list?app_key=" + $scope.apiKey;
        $scope.showCategories();
        $scope.show();
        $scope.$apply();

    };

    $scope.showCategories = function () {
        $scope.visibility = true;
        $http.get($scope.categoryUrl).success(function (data, status, headers, config) {

            $scope.categoriesData = data;
            //alert(JSON.stringify($scope.categoriesData));
        }).error(function (error) {
        });
    };

    $scope.showEvent = function (event) {
        $scope.clickedEvent = event;
    };

    $scope.showError = function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $scope.error = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                $scope.error = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                $scope.error = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                $scope.error = "An unknown error occurred.";
                break;
        }
        $scope.$apply();
    };

    NgMap.getMap().then(function (map) {
        //console.log('map', map);
        $scope.map = map;
    });

    $scope.clickEventInfo = function (event, e) {
        //alert("here"+JSON.stringify(e));
        $scope.mapEvent = e;
        $scope.map.showInfoWindow('map-event');
    };

    $scope.hideDetail = function () {
        $scope.map.hideInfoWindow('map-event');
    };

    $scope.search = function () {
        //alert("searching..");
        $scope.where = $scope.searchQuery;
        if($scope.where == "")
            $scope.where = $scope.userlat + "," + $scope.userlong;

        $scope.eventDetails.length = 0;
        $scope.pageNo = 1;
        $scope.loader = true;
        if($scope.category == null)
            $scope.category = "";
        //alert(typeof $scope.searchQuery);
        //$scope.url = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within=10&units=mi&date=Future&page_size=50&include=categories,price,links&sort_order=" + $scope.sortOrder;
        //alert($scope.url);
        $scope.show();
    };

    $scope.more = function(){
        //alert($scope.pageNo + " " + $scope.pageCount);
        if($scope.pageNo<$scope.pageCount){
            //alert($scope.pageNo + " " + $scope.pageCount);
            if($scope.busy) return;
            $scope.pageNo = $scope.pageNo + 1;
            $scope.busy = true;
            $scope.show();
        }
    };

    $scope.show = function () {
        //$scope.loader = true;
        $scope.visibility = true;
        //$scope.eventDetails = [];
        //alert($scope.pageNo);
        $scope.url = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within=10&units=mi&date=Future&page_size=10&page_number=" + $scope.pageNo + "&include=categories,price,links&sort_order=" + $scope.sortOrder;
        $http.get($scope.url).success(function (data, status, headers, config) {

            $scope.eventData = data;
            //alert(JSON.stringify($scope.eventData));

            $scope.pageCount = $scope.eventData.page_count;
            //alert($scope.pageCount);
            //alert($scope.eventData.events.event.length);
            //  for(var i=1; i<$scope.eventData.page_count;i++)
            //  {
            for (var j = 0; j < $scope.eventData.events.event.length; j++) {
                var eventObj = new Object();
                eventObj.url = $scope.eventData.events.event[j].url;
                eventObj.title = $scope.eventData.events.event[j].title;
                eventObj.desc = $scope.eventData.events.event[j].description;
                if(eventObj.desc == null)
                    eventObj.desc = "There is no description for this event."
                eventObj.start_time = $scope.eventData.events.event[j].start_time;
                eventObj.stop_time = $scope.eventData.events.event[j].stop_time;
                eventObj.venue_name = $scope.eventData.events.event[j].venue_name;
                eventObj.venue_address = $scope.eventData.events.event[j].venue_address;
                eventObj.city = $scope.eventData.events.event[j].city_name;
                eventObj.latitude = $scope.eventData.events.event[j].latitude;
                eventObj.longitude = $scope.eventData.events.event[j].longitude;
                eventObj.image = "images/default_image.png";
                eventObj.price = "Free";
                if($scope.eventData.events.event[j].price != null){
                    eventObj.price = "$ " + $scope.eventData.events.event[j].price;
                }
                if ($scope.eventData.events.event[j].image != null) {
                    eventObj.image = $scope.eventData.events.event[j].image.medium.url;
                }
                eventObj.categories = $scope.eventData.events.event[j].categories.category;

                $scope.eventDetails.push(eventObj);
            }
            //  }
            $scope.busy = false;
            $scope.loader = false;
        }).error(function (error) {
        });
    };

});

scotchApp.filter('ampersand', function () {
    return function (input) {
        return input ? input.replace(/&amp;/, '&') : '';
    }
});

scotchApp.directive('googleplace', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.$apply(function () {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});

scotchApp.filter('dateInMillis', function () {
    return function (dateString) {
        return Date.parse(dateString);
    };
});

scotchApp.directive("scrollend", function() {
    return function(scope, element, attrs) {
        var container = angular.element(element);
        container.bind("scroll", function(evt) {
            if (container[0].offsetHeight + container[0].scrollTop >= container[0].scrollHeight) {
                //alert('On the bottom of the world I\'m waiting.');
                scope.$apply("more()");
            }
        });
    };
});
