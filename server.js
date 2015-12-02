var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var nodemailer = require("nodemailer");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());   //for parsing application/json

app.use(multer()); // for parsing multipart/form-data

app.use(session({
    secret: process.env.SESSION_SECRET || 'this is the secret',
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/wham');

app.get("/", function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);

var UserProfileSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    withinRadius: String,
    categories: Array,
    dislikedEvents: Array
}, {collection: "UserProfile"});

var UserProfileModel = mongoose.model("UserProfileModel", UserProfileSchema);

passport.use('Authentication', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {

        console.log(email+" "+password)
        UserProfileModel.findOne({email: email, password: password}, function (err, user) {
            if (user != null) {
                if (err) {
                    return done("Error");
                } else {
                    return done(null, user);
                }
            } else {
                return done("Error");
            }
        });

    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post("/logout", function (req, res) {
    var reqUser = req.body;
    UserProfileModel.findOne({email: reqUser.email}, function (err, userProfile) {
        if (userProfile != null) {
            req.session.destroy();
            res.send(200);
        }

        else {
            res.send("Error");
        }
    });
});

app.post("/login", passport.authenticate('Authentication'), function (req, res) {
    var user = req.user;
    UserProfileModel.findOne({email: user.email}, function (err, userProfile) {
        if (userProfile != null) {
            res.json(userProfile);
        }
        else res.send("Error");
    });

});

app.post("/register", function (req, res) {

    var newUserAuth = req.body;
    var newUserAuthObject = new UserProfileModel(newUserAuth);
    UserProfileModel.findOne({email: newUserAuth.email}, function (err, userProfile) {
        if (userProfile != null) {
            res.send("error");
        }
        else {
            newUserAuthObject.save(function (err, user) {
                if (err) {
                    res.send('error');
                }
                else {
                    res.send('ok');
                }
            })
        }
    });


});

app.post("/dislikeEvent", function (req, res) {
    var newUserAuth = req.body;
    UserProfileModel.findOne({email: newUserAuth.email}, function (err, userProfile) {
        if (userProfile != null) {
            userProfile.dislikedEvents = newUserAuth.dislikedEvents;
            userProfile.save(function (err, user) {
                if (err)
                {
                    res.send('error');
                }
                else
                {
                    console.log('Logging out ..');
                    res.send('ok');
                }
            });
        }
        else res.send('Please log in');
    })
});