const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
	name      : { type: String, required: true, unique: true },
	templateId : { type: String, required: true, unique: true }         
});

module.exports = mongoose.model('Form', formSchema);
