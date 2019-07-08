const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
	name       : { type: String, required: true },
	type       : {
		type: String,
		enum: [
			'text',
			'graph'
		],
		required: true
	},
	questionId : { type: String, required: true },
	formId     : { type: String, required: true }
});

module.exports = mongoose.model('Answer', answerSchema);
