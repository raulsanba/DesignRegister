var express = require("express");
var router = express.Router();
var Design = require(".././models/design");
var User = require(".././models/user");


//INDEX ROUTES
router.get("/designs", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        
        Design.find({"sharepointid": regex}, function(err, founddesigns){
           if(err){
               console.log(err);
           } else {
              if(founddesigns.length < 1) {
                  noMatch = "No designs match that query, please try again.";
              }
              res.render("designs/index",{designs:founddesigns, currentUser: req.user, noMatch: noMatch});
           }
        });
    } else {

    Design.find({}, function(err, designs){
        if (err){
            console.log(err);
        } else {
            res.render("designs/index", {designs: designs, currentUser: req.user, noMatch: noMatch});
        }
    });
}
});
// NEW ROUTE
router.get("/designs/new", isLoggedIn, function(req, res) {
        
        var author = {
            id: req.user._id,
            username: req.user.username
        };
        console.log(author);
        res.render("designs/new",{currentUser: req.user});    
     
});
//CREATE ROUTE
router.post("/designs",   function(req, res){

    Design.create(req.body.design, function(err,newDesign){
        if (err){
            console.log(err);
            //res.render("new");
        } else {
            res.redirect("/designs");
            console.log(newDesign);
            
        }
    });
});
//SHOW ROUTE
router.get("/designs/:id", function(req, res) {
    // Design.findById(req.params.id, function(err, foundDesign){///sin comentarios
    Design.findById(req.params.id).populate("comments").exec( function(err, foundDesign){
        if(err){
            res.redirect("/designs");
        } else {
            console.log(foundDesign);
            res.render("designs/show", {design: foundDesign,currentUser: req.user});
        }
    });
});    
//EDIT ROUTE
router.get("/designs/:id/edit", function(req, res) {
    if (req.isAuthenticated()){
        Design.findById(req.params.id, function(err, foundDesign){
        if(err){
            res.redirect("/designs");
        } else {
            res.render("designs/edit", {design: foundDesign, currentUser: req.user});
        }
    });
    } else {
        res.redirect("/designs");
    }
    
});    
//UPDATE ROUTE
router.put("/designs/:id", function(req, res){

    Design.findByIdAndUpdate(req.params.id, req.body.design, function(err, updatedDesign){
        
        if (err){
            res.redirect("/designs");
        } else {
            res.redirect("/designs/" + req.params.id);
        }
    });
});
//DELETE ROUTE
router.delete("/designs/:id", function(req, res){
// res.send("delete route");  
// });
    if (req.isAuthenticated()){
    Design.findByIdAndRemove(req.params.id, function(err){
    
        if (err){
              
            res.redirect("/designs");
      
        } else {
           
            res.redirect("/designs");
        }
    });
    } else{
        res.redirect("/designs");
    }
 });    
 
 
 
 //middleware
 
 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
 }
 
 function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
 module.exports = router;