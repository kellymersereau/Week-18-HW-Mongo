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
app.use(express.static(process.cwd() + '/Public'));


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

//assigning controllers
var app_controllers = require('./Controllers/controller.js');


app.use('/', app_controllers);



app.listen(3000, function(){
	console.log('App running on port 3000');
});