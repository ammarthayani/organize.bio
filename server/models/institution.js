const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const institutionSchema = new Schema({
	name : String
});

module.exports = mongoose.model('Institution', institutionSchema);
