var express = require("express");
var router = express.Router();
var Comment = require(".././models/comment");
////COMMENTS ROUTES////
router.get("/designs/:id/comments/new", function(req, res){
    res.render("comments/new", {currentUser: req.user});
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/logout");
}

 module.exports = router;
