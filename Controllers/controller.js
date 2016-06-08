var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

// Require models
var Note = require('../Models/note.js');
var User = require('../Models/user.js');
var Article = require('../Models/article.js');

router.get('/', function(req, res){
	res.render('index');
});

// router.get('/all', function(req, res){
// 	db.scrapedArticle.find({}, function(err, found){
// 		if(err){
// 			console.log("error: ", err);
// 		} else{
// 			res.json(found);
// 		}
// 	});
// });

//Vice news scrape
router.get('/vice', function(req, res){
	request('https://news.vice.com/', function(error, response, html){
		var $ = cheerio.load(html);
		$('article').each(function(i, element){
			var result = {};

			result.source = 'Vice News';
			result.title = $(this).children('h2').children('a').text().trim();
			result.link = $(this).children('.in-the-news-share-cont').children('div').attr('data-url');
			result.oneLiner = $(this).children('p').text().trim();
			console.log('result title ', result.title);
			console.log('result link ', result.link);
			console.log('result body ', result.oneLiner);

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
	res.send("Scrape Complete");
});

//Huffington Post news scrape
// app.get('/huffpost', function(req, res){
// 	request('https://www.huffingtonpost.com/', function(error, response, html){
// 		var $ = cheerio.load(html);
// 		var result = [];
// 		$('article').each(function(i, element){
// 			console.log(this);
// 		})
// 	});
// });

// //NPR news scrape
// app.get('/npr', function(req, res){
// 	request('http://www.npr.org/sections/news/', function(error, response, html){
// 		var $ = cheerio.load(html);
// 		var result = [];
// 		$('article').each(function(i, element){
// 			console.log(this);
// 		})
// 	});
// });


module.exports = router;