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
        })

        .when('/register', {
            templateUrl: 'pages/registerHTML.html',
            controller: 'registerCtrl'
        })

        .when('/myaccount', {
            templateUrl: 'pages/myAccount.html',
            controller: 'myAccCtrl'
        });
});


scotchApp.controller('aboutController', function ($scope) {
    $scope.message = 'WHAM (What\'s Happening Around Me)';
});

scotchApp.controller('contactController', function ($scope) {
    $scope.message = 'info@msd-avengers.com';
});

scotchApp.controller('getLocation', function ($rootScope, $scope, $http, NgMap, $filter) {

    //google.maps.event.trigger(map, "resize");
    $scope.gPlace,
        $scope.searchKeyword = "",
        $scope.keyword = "",
        $scope.range = 10,
        $scope.eventDetails = [],
        $scope.origeventDetails = [],
        $scope.busy = false,
        $scope.loader = true,
        $scope.pageNo = 1,
        $scope.pageCount = 0,
        $scope.userlat = "0",
        $scope.userlong = "0",
        $scope.error = "",
        $scope.showErr = false,
        $scope.visibility = false,
        $scope.searchQuery = "",
        $scope.category = "",
        $scope.sortOptions = ["Popularity","Date","Relevance"],
        $scope.sortOrder = "Popularity",
        $scope.where = "",
        $scope.clickedEvent = null,
        $scope.toggleDislikeColor = false,
        $scope.toggleLikeColor = false,
        $scope.apiKey = "rcnxbzfT3dLNF3ff",
        $scope.url = "";
    //  $scope.url = "http://api.eventful.com/json/events/search?app_key="+$scope.apiKey+"&keywords=books&location="+$scope.searchQuery+"&date=Future";

    $scope.dislikeEvent = function (event) {
        if ($rootScope.isLoggedIn) {
            console.log("Saving disliked");
            $rootScope.currentUser.dislikedEvents.push(event.id);
            console.log("disliked : " +$rootScope.currentUser.dislikedEvents);
            event.toggleDislikeColor = true;
            event.toggleLikeColor = false;
        }
        else alert("Please log in");

    };

    $scope.likeEvent = function (event)
    {
        if ($rootScope.isLoggedIn) {
            //  event.toggleLikeColor = true;
            event.toggleLikeColor = !event.toggleLikeColor;
            if(event.toggleDislikeColor) {
                event.toggleDislikeColor = false;
                $rootScope.currentUser.dislikedEvents.splice($rootScope.currentUser.dislikedEvents.indexOf(event.id),1);
            }
            console.log("liked : " +$rootScope.currentUser.dislikedEvents);
        }
        else alert("Please log in");
    };

    $scope.$on("initial", function (event, args) {
        $scope.showCategories();
    });

    $scope.init = function () {
        //google.maps.event.trigger(map, "resize");
        console.log("In init");
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        }
        else {
            $scope.loader = false;
            $scope.error = "Geolocation is not supported by this browser";
            $scope.showErr = true;
        }
    };

    $scope.showPosition = function (position) {
        console.log("In showPosition");
        $scope.userlat = position.coords.latitude;
        $scope.userlong = position.coords.longitude;
        $scope.where = $scope.userlat + "," + $scope.userlong;
        //$scope.url = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within=10&units=mi&date=Future&page_size=50&include=categories,price,links&sort_order=" + $scope.sortOrder;
        $scope.categoryUrl = "http://api.eventful.com/json/categories/list?app_key=" + $scope.apiKey +"&dataType=json&callback=JSON_CALLBACK";
        $scope.showCategories();
        $scope.show();
        $scope.$apply();

    };

    $scope.$on("ShowCategories", function (event, args) {
        $scope.showCategories();
    });

    $scope.showCategories = function () {
        $scope.visibility = true;
        $http.jsonp($scope.categoryUrl).success(function (data, status, headers, config) {
            $rootScope.categoriesList = data;

            var categoriesObj = new Object();
            $scope.category = [];
            if ($rootScope.isLoggedIn) {
                if($rootScope.currentUser.categories.length>0) {
                    for (var i = 0; i < $rootScope.currentUser.categories.length; i++) {
                        for (var j = 0; j < data.category.length; j++) {
                            if (data.category[j].name == $rootScope.currentUser.categories[i].name) {
                                var categoryObj = new Object();
                                categoryObj.name = data.category[j].name;
                                categoryObj.event_count = data.category[j].event_count;
                                categoryObj.id = data.category[j].id;
                                $scope.category.push(categoryObj);
                            }

                        }
                    }
                    categoriesObj.category = $scope.category;
                    $scope.categoriesData = categoriesObj;
                }
                else{
                    $scope.categoriesData = data;
                }
            }
            else {
                $scope.categoriesData = data;
            }
        }).error(function (error) {
        });
    };

    $scope.showEvent = function (event) {
        $scope.clickedEvent = event;
    };

    $scope.showError = function (error) {
        $scope.loader = false;
        $scope.showErr = true;
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

    /*    $scope.search = function () {
     $scope.showSearchResults = true;
     //alert("searching..");
     $scope.showErr = false;
     // $scope.eventDetails.splice(0, $scope.eventDetails.length);
     //alert($scope.searchQuery);
     if($scope.searchQuery != ""){

     $http.get('http://maps.google.com/maps/api/geocode/json?address=' +$scope.searchQuery).success(function(mapData) {
     console.log(JSON.stringify(mapData.results[0].geometry.location));

     if(mapData.results.length!=0) {
     $scope.where = mapData.results[0].geometry.location.lat + "," + mapData.results[0].geometry.location.lng;
     console.log("In search"+$scope.where);
     $scope.callRequiredFunctions();
     // alert($scope.where);
     }
     else{
     $scope.error = "Could not find entered location";
     $scope.showErr = true;
     return;
     //alert("Could not find entered location");

     }
     }).error(function (error){
     $scope.error = "Could not find entered location";
     $scope.showErr = true;
     });
     }
     else if($scope.searchKeyword != ""){
     $scope.keyword = "title:"+$scope.searchKeyword;
     $scope.sortOrder = "Relevance";
     $scope.callRequiredFunctions();
     }
     else
     {
     $scope.where = $scope.userlat + "," + $scope.userlong;
     $scope.callRequiredFunctions();
     }
     };


     $scope.callRequiredFunctions = function()
     {
     $scope.pageNo = 1;
     console.log("Before in show");
     $scope.loader = true;
     if($scope.category == null)
     $scope.category = "";
     if($scope.range == "")
     $scope.range = 10;
     //alert(typeof $scope.searchQuery);
     //$scope.url = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within=10&units=mi&date=Future&page_size=50&include=categories,price,links&sort_order=" + $scope.sortOrder;
     //alert($scope.url);
     $scope.show();
     if($scope.eventDetails.length == 0){
     $scope.error = "No events found!";
     $scope.showErr = true;
     return;
     }
     }
     */

    $scope.search = function () {
        //alert("searching..");
        //alert($scope.searchKeyword);
        $scope.showErr = false;
        /*$scope.eventDetails.splice(0, $scope.eventDetails.length);
         $scope.eventDetails.length = 0;*/
        $scope.eventDetails = [];
        //debugger;
        //alert($scope.searchQuery);

        if($scope.searchKeyword != ""){
            //alert("here");
            $scope.keyword = "title:"+$scope.searchKeyword;
            $scope.sortOrder = "Relevance";
        }
        else{
            $scope.keyword = "";
            $scope.sortOrder = "Popularity";
        }

        $scope.pageNo = 1;
        $scope.loader = true;

        $scope.category = $scope.category == null? "" : $scope.category;
        $scope.range = $scope.range == "" ? 10 : $scope.range;

        if($scope.searchQuery != ""){
            $http.get('http://maps.google.com/maps/api/geocode/json?address=' +$scope.searchQuery).success(function(mapData) {
                if(mapData.results.length!=0) {
                    $scope.where = mapData.results[0].geometry.location.lat + "," + mapData.results[0].geometry.location.lng;
                }
                else{
                    $scope.error = "Could not find entered location";
                    $scope.showErr = true;
                }
                $scope.show();
            }).error(function (error){
                $scope.error = "Could not find entered location";
                $scope.showErr = true;
            });
        }
        else
        {
            $scope.where = $scope.userlat + "," + $scope.userlong;
            $scope.show();
        }
    };

    $scope.more = function(){
        //alert($scope.pageNo + " " + $scope.pageCount);
        //console.log("In more");
        $scope.showErr = false;
        if($scope.eventDetails.length == 0){
            $scope.error = "No events found!";
            $scope.showErr = true;
            return;
        }
        if($scope.pageNo<$scope.pageCount){
            //alert($scope.pageNo + " " + $scope.pageCount);
            if($scope.busy) return;
            $scope.busy = true;
            $scope.pageNo = $scope.pageNo + 1;
            $scope.show();
        }
    };

    $scope.$on("filterEvents", function (event, args) {
        //console.log("In broadcast show!");
        $scope.origeventDetails = $scope.eventDetails;
        console.log($scope.origeventDetails);
        for (var i = 0; i < $rootScope.currentUser.dislikedEvents.length; i++)
        {
            var dislikedEvent = String($rootScope.currentUser.dislikedEvents[i]);
            $scope.eventDetails = $scope.eventDetails.filter(function(ev){
                return ev.id !== dislikedEvent;
            });
        }
        //$scope.show();
    });

    $scope.$on("Show", function (event, args) {
        $scope.show();
    });

    $scope.show = function () {
        $scope.showErr = false;
        //$scope.loader = true;
        $scope.visibility = true;
        //$scope.eventDetails = [];
        //alert($scope.pageNo);

        $scope.url = "http://api.eventful.com/json/events/search?app_key=" + $scope.apiKey + "&keywords=" + $scope.keyword + "&category=" + $scope.category.id + "&where=" + $scope.where + "&within="+ $scope.range + "&units=mi&date=Future&page_size=10&page_number=" + $scope.pageNo + "&include=categories,price,links&sort_order=" + $scope.sortOrder+"&dataType=json&callback=JSON_CALLBACK";

        console.log($scope.url);
        $http.jsonp($scope.url).success(function(data){

            $scope.eventData = data;
            //alert(JSON.stringify($scope.eventData));
            $scope.pageCount = $scope.eventData.page_count;

            /*
             else {
             $scope.eventDetails = $scope.origeventDetails;*/
            //console.log($scope.eventDetails);
            if($scope.eventData.events == null){
                $scope.error = "No events found!";
                $scope.loader = false;
                $scope.showErr = true;
                return;
            }
            //Changed on Dec 1
            else if($scope.eventData.total_items == 1){
                var eventObj = new Object();
                eventObj.id = $scope.eventData.events.event.id;
                eventObj.url = $scope.eventData.events.event.url;
                eventObj.title = $scope.eventData.events.event.title;
                eventObj.desc = $scope.eventData.events.event.description;
                if(eventObj.desc == null)
                    eventObj.desc = "There is no description for this event.";
                eventObj.start_time = $scope.eventData.events.event.start_time;
                eventObj.stop_time = $scope.eventData.events.event.stop_time;
                eventObj.venue_name = $scope.eventData.events.event.venue_name;
                eventObj.venue_address = $scope.eventData.events.event.venue_address;
                eventObj.city = $scope.eventData.events.event.city_name;
                eventObj.latitude = $scope.eventData.events.event.latitude;
                eventObj.longitude = $scope.eventData.events.event.longitude;
                eventObj.image = "images/default_image.png";
                eventObj.price = "Free";
                if($scope.eventData.events.event.links !=null)
                    eventObj.ticketLink = $scope.eventData.events.event.links.link[0].url;
                else
                    eventObj.ticketLink = "";
                if($scope.eventData.events.event.price != null){
                    eventObj.price = "$ " + $scope.eventData.events.event.price;
                }
                if ($scope.eventData.events.event.image != null) {
                    eventObj.image = $scope.eventData.events.event.image.medium.url;
                }
                eventObj.categories = $scope.eventData.events.event.categories.category;

                $scope.eventDetails.push(eventObj);
            }
            else {
                for (var j = 0; j < $scope.eventData.events.event.length; j++) {
                    var eventObj = new Object();
                    eventObj.id = $scope.eventData.events.event[j].id;
                    eventObj.url = $scope.eventData.events.event[j].url;
                    eventObj.title = $scope.eventData.events.event[j].title;
                    eventObj.desc = $scope.eventData.events.event[j].description;
                    if (eventObj.desc == null)
                        eventObj.desc = "There is no description for this event.";
                    eventObj.start_time = $scope.eventData.events.event[j].start_time;
                    eventObj.stop_time = $scope.eventData.events.event[j].stop_time;
                    eventObj.venue_name = $scope.eventData.events.event[j].venue_name;
                    eventObj.venue_address = $scope.eventData.events.event[j].venue_address;
                    eventObj.city = $scope.eventData.events.event[j].city_name;
                    eventObj.latitude = $scope.eventData.events.event[j].latitude;
                    eventObj.longitude = $scope.eventData.events.event[j].longitude;
                    eventObj.image = "images/default_image.png";
                    eventObj.price = "Free";
                    if($scope.eventData.events.event.links !=null)
                        eventObj.ticketLink = $scope.eventData.events.event[j].links.link[0].url;
                    else
                        eventObj.ticketLink = "";
                    if ($scope.eventData.events.event[j].price != null) {
                        eventObj.price = "$ " + $scope.eventData.events.event[j].price;
                    }
                    if ($scope.eventData.events.event[j].image != null) {
                        eventObj.image = $scope.eventData.events.event[j].image.medium.url;
                    }
                    eventObj.categories = $scope.eventData.events.event[j].categories.category;

                    $scope.eventDetails.push(eventObj);
                    console.log(JSON.stringify($scope.eventDetails));
                }

                if ($rootScope.isLoggedIn)
                {
                    $scope.origeventDetails = $scope.eventDetails;
                    console.log($scope.origeventDetails);
                    for (var i = 0; i < $rootScope.currentUser.dislikedEvents.length; i++)
                    {
                        var dislikedEvent = String($rootScope.currentUser.dislikedEvents[i]);
                        $scope.eventDetails = $scope.eventDetails.filter(function(ev){
                            return ev.id !== dislikedEvent;
                        });
                    }
                }
            }
            //}
            //alert($scope.eventDetails.length);
            $scope.busy = false;
            $scope.loader = false;
        }).error(function (error) {
            $scope.busy = false;
            $scope.loader = false;
            $scope.error = "Unexpected error. Could not fetch events data..";
            $scope.showErr = true;
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

