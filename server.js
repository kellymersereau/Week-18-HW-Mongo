var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(process.cwd() + '/public'));

// Database configuration - MongoDB
mongoose.connect('mongodb://localhost/articles_db');
var db = mongoose.connection;

db.on('error', function(err){
	console.log('Mongoose Error: ', err);
});
db.once('open', function(){
	console.log('Mongoose connection successful.');
});


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

//assigning controllers

// var article_controllers = require('./controllers/article_controller.js');

// app.use('/', article_controllers);

app.get('/', function(req, res){
	res.render('index');
});

app.get('/all', function(req, res){
	db.scrapedArticle.find({}, function(err, found){
		if(err){
			console.log("error: ", err);
		} else{
			res.json(found);
		}
	});
});

app.get('/scrape', function(req, res){
	request('https://news.vice.com/', function(error, response, html){
		var $ = cheerio.load(html);
		var result = [];
		$('article').each(function(i, element){
			var title = $(this).children('h2').text();
		})
	})
})


app.listen(3000, function(){
	console.log('App running on port 3000');
});