var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var request = require('request');
var cheerio = require('cheerio');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('Public'));


// Require models
var Note = require('./Models/note.js');
var User = require('./Models/user.js');
var Article = require('./Models/article.js');

var db = require('./Config/connection.js');

app.get('/', function(req, res){
	res.send(index.html);
});

// // request vice
app.get('/vice', function(req, res){
	request('https://news.vice.com/', function(error, response, html){
		var $ = cheerio.load(html);
		$('article').each(function(i, element){
			var result = {};

			result.source = 'Vice News';
			result.title = $(this).children('h2').children('a').text().trim();
			result.link = $(this).children('.in-the-news-share-cont').children('div').attr('data-url');
			result.body = $(this).children('p').text().trim();
			console.log('result title ', result.title);
			console.log('result link ', result.link);
			console.log('result body ', result.body);

			var entry = new Article(result);
			entry.save(function(err, doc){
				if(err){
					console.log(err);
				} else {
					console.log(doc);
				}
			});
		});
	});
	res.send('<a href="/" class="btn thin black lighten-1">View articles </a>');
});
// vice news find articles
app.get('/articles', function(req, res){
	Article.find({}, function(err, doc){
		if(err){
			console.log(err);
		} else{
			res.json(doc);
		}
	});
});

app.get('/articles/:id', function(req, res){
	Article.findOne({'_id': req.params.id})
	.populate('note')
	.exec(function(err, doc){
		if (err){
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

app.post('/articles/:id', function(req, res){
	var newNote = new Note(req.body);

	newNote.save(function(err, doc){
		if(err){
			console.log(err);
		} else {
			Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
			.exec(function(err, doc){
				if (err){
					console.log(err);
				} else {
					res.send(doc);
				}
			});

		}
	});
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('App running on port ' + port);
});