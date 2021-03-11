var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Landing page rendering
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
	res.render("register");
});

// registering new user
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Handmade Market " + user.username + "!");
			res.redirect("/products");
		});
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", {successRedirect: "/products", failureRedirect: "/login"}), function(req, res){
	
});

// logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You signed out successfully!");
	res.redirect("/products");
});

module.exports = router;