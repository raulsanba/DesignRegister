var express = require("express");
var expressSanitizer = require("express-sanitizer");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var flash = require("express-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Design = require("./models/design");
var User = require("./models/user");
var seedDB = require("./seed");


/////////////////////////////////////////////////
var commentRoutes = require("./routes/comments");
var designRoutes = require("./routes/designs");
var indexRoutes = require("./routes/index");




//APP CONFIG
var url = process.env.DATABASEURL || "mongodb://localhost/designregister_app";


mongoose.connect(url, {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());

////SEED DATABASE
// seedDB();
//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "pagina secreta",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//esto pasa user a todos los archivos
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // res.locals.message = req.flash("error");
    next();
});

app.use(commentRoutes);
app.use(designRoutes);
app.use(indexRoutes);
//SERVER CONEXION
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVIDOR OK") ;
});
