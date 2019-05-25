const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
	name       : { type: String, required: true },
    questionId : { type: String, required: true },
    formId : { type: String, required: true },
});

module.exports = mongoose.model('Answer', answerSchema)