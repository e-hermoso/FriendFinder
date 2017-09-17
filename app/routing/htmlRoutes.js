// this is the htmlRoutes.js file
var path = require('path');

// Routes
// ===========================================================

module.exports = function(app){
	app.get("/", function(req, res) {

	    res.sendFile(path.join(__dirname, '../public/home.html'));

	});

	app.get("/survey", function(req, res) {
	  res.sendFile(path.join(__dirname, '../public/survey.html'));
	});

	app.get('*',function (req, res) {
	 res.redirect(path.join(__dirname, '../public/home.html'));
	});
};
