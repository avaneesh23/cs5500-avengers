scotchApp.factory("MyService", function ($http, $location, $rootScope) {
    $rootScope.currentUser = {"firstname": null, "lastname": null, "email": null, "password": null};
    var update = function (user, callback) {
        $http.post("/update", user)
            .success(function (res) {
                callback(res);
            })
            .error(function (res) {
                callback(null);
            })
    };
    var sendemail = function (user, callback) {
        $http.post("/sendEmail", user)
            .success(function (res) {
                callback(res);
            })

            .error(function (res) {
                callback(null);
            })
    };
    var login = function (user, callback) {
        $http.post("/login", user)
            .success(function (res) {
                $rootScope.currentUser.firstname = res.firstname;
                $rootScope.currentUser.lastname = res.lastname;
                $rootScope.currentUser.email = res.email;
                $rootScope.currentUser.password = res.password;
                $rootScope.currentUser.categories = res.categories;
                $rootScope.currentUser.withinRadius = res.withinRadius;
                $rootScope.currentUser.dislikedEvents = res.dislikedEvents;
                callback(res);
            })
            .error(function (res) {
                callback(null);
            })
    };
    var register = function (newUser, callback) {
        $http.post("/register", newUser)
            .success(function (res) {
                if (res == 'ok') {
                    $http.post("/login", newUser)
                        .success(function (res) {
                            $rootScope.currentUser.firstname = newUser.firstname;
                            $rootScope.currentUser.lastname = newUser.lastname;
                            $rootScope.currentUser.email = newUser.email;
                            $rootScope.currentUser.password = newUser.password;
                            $rootScope.currentUser.categories = res.categories;
                            $rootScope.currentUser.withinRadius = res.withinRadius;
                            $rootScope.currentUser.dislikedEvents = res.dislikedEvents;
                            callback(res);
                        })
                }
                else if (res == 'error') {
                    alert("Username already registered.")
                }
            });
    };

    var logout = function (user, callback) {
        if (user) {
            console.log(user);
            $http.post("/logout", user)
                .success(function (res) {
                    callback(res);
                })
                .error(function (res) {
                    callback(null);
                })
        }
    };

    var updatePassword = function (user, oldpassword, newpassword, callback) {
        console.log("myservice:" + oldpassword + " " + newpassword);
        var request = {};
        request.user = user;
        request.oldpassword = oldpassword;
        request.newpassword = newpassword;
        $http.post("/updatepassword", request)
            .success(function (res) {
                if (res == 'invalid')
                    alert('invalid password entered');
                else if (res == 'ok')
                    callback(res);
            })
            .error(function (res) {
                callback(null)
            })
    };

    var dislikeEvent = function (callback) {
        $http.post("/dislikeEvent", $rootScope.currentUser)
            .success(function (res) {
                callback(res);
            })
            .error(function (res) {
                callback(null);
            })
    };


    return {
        login: login,
        register: register,
        dislikeEvent: dislikeEvent,
        update: update,
        updatePassword: updatePassword,
        sendemail:sendemail,
        logout: logout

    }

});