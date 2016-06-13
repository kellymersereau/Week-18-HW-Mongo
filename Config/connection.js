var http = require('http');
var mongoose = require('mongoose');

var uristring =
	process.env.MONGOLAB_URI ||
	process.env.MONGOLAB_SILVER_URI ||
	'mongodb://localhost/newsnotes_db';

var theport = process.env.PORT || 3000;

// Database configuration - MongoDB
mongoose.connect(uristring, function(err, res){
	if(err){
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else{
		console.log ('Succeeded connected to: ' + uristring);
	}
});

var db = mongoose.connection;

module.exports = db;

