var express = require("express");
var router = express.Router(); 
var User = require(".././models/user");
var passport = require("passport");
var session = require("express-session");
var cookieParser = require("cookie-parser");


/////////////////RESTful ROUTES//////////////////
router.get("/", function(req, res){
    
    res.redirect("/designs");
});


//AUTH ROUTES
router.get("/register", function(req, res) {
    res.render("register", {currentUser: req.user});
});

router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if (err){
        
           return res.render("register", {currentUser: req.user});
       } 
       passport.authenticate("local")(req, res, function(){
        
           res.redirect("/designs");
       });
   });
});

//SHOW LOGIN FORM

router.get("/login", function(req, res) {
    
    res.render("login", {currentUser: req.user, message:req.flash("loginerror")});
});

router.post("/login", passport.authenticate("local", 
    {
    successRedirect: "/designs",
    failureRedirect: "/login" ,
    failureFlash: true

    }) , function(err, res){
        if(err){
            req.flash("loginerror","login error");
            res.redirect("/login");
        }
           
});

//LOGOUT

router.get("/logout", function(req, res) {

    req.flash("logout", "Logged out...");
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("loginerror", "Username or password incorrect!");
    res.redirect("/login");
}


 module.exports = router;
 