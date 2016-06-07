var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res){
	res.render('index');
});

router.get('/all', function(req, res){
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
			console.log(this);
		})
	})
})


module.exports = router;