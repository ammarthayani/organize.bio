const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
	name      : String,
	createdBy : { type: 'String', required: 'true' }
});

module.exports = mongoose.model('Folder', folderSchema);
