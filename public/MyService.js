scotchApp.factory("MyService", function ($http, $location, $rootScope) {
    $rootScope.currentUser = {"firstname": null, "lastname": null, "email": null, "password": null};
    var login = function (user, callback) {
        $http.post("/login", user)
            .success(function (res) {
                $rootScope.currentUser.firstname = res.firstname;
                $rootScope.currentUser.lastname = res.lastname;
                $rootScope.currentUser.email = res.email;
                $rootScope.currentUser.password = res.password;
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
                    console.log("service ")
                    console.log(newUser)
                    $http.post("/login", newUser)
                        .success(function (res) {
                            $rootScope.currentUser.firstname = newUser.firstname;
                            $rootScope.currentUser.lastname = newUser.lastname;
                            $rootScope.currentUser.email = newUser.email;
                            $rootScope.currentUser.password = newUser.password;
                            callback(res);
                        })
                }
                else if (res == 'error'){
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

    return {
        login: login,
        register: register,
        logout: logout,
    }

});