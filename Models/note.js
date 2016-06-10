var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
		title: {
			type: String
		},
		body: {
			type: String
		},
		user: {
			type: Schema. Types. ObjectId,
			ref: 'User'
		}
});

var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;