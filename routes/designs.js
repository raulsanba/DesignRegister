var express = require("express");
var router = express.Router();
var Design = require(".././models/design");
var User = require(".././models/user");
var multer = require('multer');


///UPLOAD IMAGES ROUTES////////
router.get("/uploads", function(req, res){
    res.render("uploads", {design: req.body});
});

router.post("/uploads", function(req, res){
    req.flash("image", "File uploaded");
    res.redirect("/designs");
});
///////////////////////////////

//INDEX ROUTES
router.get("/designs", function(req, res){
    var noMatch = null;
        
        if(req.query.region || req.query.sharepointid || req.query.designid || req.query.so || req.query.type || req.query.headtype || req.query.apwidth || req.query.apheight || req.query.systemtype || req.query.reject || req.query.convinheight || req.query.convoutheight || req.query.convlength || req.query.handing || req.query.belttype || req.query.moagent || req.query.enduser || req.query.product || req.query.packaging || req.query.notes  || req.query.engineer) {
        const regex = new RegExp(escapeRegex(req.query.region), 'gi');
        const regex2 = new RegExp(escapeRegex(req.query.sharepointid), 'gi');
        const regex3 = new RegExp(escapeRegex(req.query.designid), 'gi');
        const regex4 = new RegExp(escapeRegex(req.query.so), 'gi');
        const regex5 = new RegExp(escapeRegex(req.query.type), 'gi');
        const regex6 = new RegExp(escapeRegex(req.query.headtype), 'gi');
        const regex7 = new RegExp(escapeRegex(req.query.apwidth), 'gi');
        const regex8 = new RegExp(escapeRegex(req.query.apheight), 'gi');
        const regex9 = new RegExp(escapeRegex(req.query.systemtype), 'gi');
        const regex10 = new RegExp(escapeRegex(req.query.reject), 'gi');
        const regex11 = new RegExp(escapeRegex(req.query.convinheight), 'gi');
        const regex12 = new RegExp(escapeRegex(req.query.convoutheight), 'gi');
        const regex13 = new RegExp(escapeRegex(req.query.convlength), 'gi');
        const regex14 = new RegExp(escapeRegex(req.query.handing), 'gi');
        const regex15 = new RegExp(escapeRegex(req.query.belttype), 'gi');
        const regex16 = new RegExp(escapeRegex(req.query.moagent), 'gi');
        const regex17 = new RegExp(escapeRegex(req.query.enduser), 'gi');
        const regex18 = new RegExp(escapeRegex(req.query.product), 'gi');
        const regex19 = new RegExp(escapeRegex(req.query.packaging), 'gi');
        const regex20 = new RegExp(escapeRegex(req.query.notes), 'gi');
        // const regex21 = new RegExp(escapeRegex(req.query.date), 'gi');
        const regex22 = new RegExp(escapeRegex(req.query.engineer), 'gi');
    
        Design.find({$and:[{"region": regex }, {"sharepointid": regex2 }, {"designid": regex3 }, {"so": regex4 }, {"type": regex5 }, {"headtype": regex6 }, {"apwidth": regex7 }, {"apheight": regex8 }, {"systemtype": regex9 }, {"reject": regex10 }, {"convinheight": regex11 }, {"convoutheight": regex12 }, {"convlength": regex13 }, {"handing": regex14 }, {"belttype": regex15 }, {"moagent": regex16 }, {"enduser": regex17 }, {"product": regex18 }, {"packaging": regex19 }, {"notes": regex20 }, {"engineer": regex22 }]} , function(err, founddesigns){   
        if(err){
               console.log(err);
           } else {
              if(founddesigns.length < 1) {
                  noMatch = "There were no results found, please try again...";
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
router.post("/designs", function(req, res){

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