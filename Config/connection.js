var mongoose = require('mongoose');

// Database configuration - MongoDB
mongoose.connect('mongodb://localhost/newsnotes_db');
var db = mongoose.connection;

db.on('error', function(err){
	console.log('Mongoose Error: ', err);
});
db.once('open', function(){
	console.log('Mongoose connection successful.');
});

module.exports = connection;