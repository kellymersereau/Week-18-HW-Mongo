var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	source: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}
});

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;