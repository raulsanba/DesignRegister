var express = require("express");
var router = express.Router(); 
var User = require(".././models/user");
var passport = require("passport");


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
           console.log(err);
           return res.render("register", {currentUser: req.user});
       } 
       passport.authenticate("local")(req, res, function(){
           req.flash("error", "Hello");
           res.redirect("/designs");
       });
   });
});

//SHOW LOGIN FORM

router.get("/login", function(req, res) {
    res.render("login", {currentUser: req.user});
});

router.post("/login", passport.authenticate("local", 
    {
    successRedirect: "/designs",
    failureRedirect: "/login"    
    }) ,function(req, res){
});

//LOGOUT

router.get("/logout", function(req, res) {
    
    req.logout();
    req.flash("error", "Logged you out");
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/logout");
}


 module.exports = router;
 