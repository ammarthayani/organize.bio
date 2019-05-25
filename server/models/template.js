const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
	name      : { type: String, required: true},
	creatorId : { type: String, required: true},
	folderId  : { type: String, required: true}
});

module.exports = mongoose.model('Template', templateSchema);
