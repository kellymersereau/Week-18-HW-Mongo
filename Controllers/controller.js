// var express = require('express');
// var request = require('request');
// var cheerio = require('cheerio');
// var router = express.Router();
// var bodyParser = require('body-parser');
// var app = express();

// app.use(bodyParser.urlencoded({
// 	extended: false
// }));
// app.use(express.static('public'));


// // Require models
// var Note = require('../Models/note.js');
// var User = require('../Models/user.js');
// var Article = require('../Models/article.js');

// var db = require('../config/connection.js');

// router.get('/', function(req, res){
// 	res.render(index.html);
// });

// // // request vice
// router.get('/vice', function(req, res){
// 	request('https://news.vice.com/', function(error, response, html){
// 		var $ = cheerio.load(html);
// 		$('article').each(function(i, element){
// 			var result = {};

// 			result.source = 'Vice News';
// 			result.title = $(this).children('h2').children('a').text().trim();
// 			result.link = $(this).children('.in-the-news-share-cont').children('div').attr('data-url');
// 			result.body = $(this).children('p').text().trim();
// 			console.log('result title ', result.title);
// 			console.log('result link ', result.link);
// 			console.log('result body ', result.body);

// 			var entry = new Article(result);
// 			entry.save(function(err, doc){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					console.log(doc);
// 				}
// 			});
// 		});
// 	});
// 	res.send(index.html, res);
// });
// // vice news find articles
// router.get('/articles/vice', function(req, res){
// 	Article.find({}, function(err, doc){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			res.json(doc);
// 		}
// 	});
// });

// Huffington Post news scrape
// app.get('/huffpost', function(req, res){
// 	request('https://www.huffingtonpost.com/', function(error, response, html){
// 		var $ = cheerio.load(html);
// 		var result = {};
// 		$('article').each(function(i, element){
// 			console.log(this);

// 			result.source = "Huffington Post";
// 			result.title =
// 			result.link =
// 			result.body =

// 			console.log('RESULT TITLE ', result.title);
// 			console.log('RESULT LINK ', result.link);
// 			console.log('RESULT.BODY ', result.body);

// 			var entry = new Article(result);
// 			entry.save(function(err, doc){
// 				if(err){
// 					console.log(err);
// 				} else{
// 					console.log(doc);
// 				}
// 			});
// 		});
// 	});
// 	res.send("scrape complete!");
// });

// //NPR news scrape
// app.get('/npr', function(req, res){
// 	request('http://www.npr.org/sections/news/', function(error, response, html){
// 		var $ = cheerio.load(html);
// 		var result = {};
// 		$('article').each(function(i, element){
// 			console.log(this);

// 			result.source = 'NPR News';
// 			result.title =
// 			result.link =
// 			result.body =

// 			console.log('RESULT TITLE ', result.title);
// 			console.log('RESULT LINK ', result.link);
// 			console.log('RESULT BODY ', result.body);

// 			var entry = new Article(result);
// 			entry.save(function(err, doc){
// 				if(err){
// 					console.log(err);
// 				} else{
// 					console.log(doc);
// 				}
// 			});
// 		});
// 	});
// 	res.send('scrape complete!');
// });


// module.exports = router;