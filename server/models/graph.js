const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const graphSchema = new Schema({
	title : { type: String, required: true },
	type  : {
		type     : String,
		enum     : [
			'line',
			'bar',
			'multi-line',
			'stacked-bar',
			'brush-zoom',
			'pie',
			'donut'
		],
		required : true
	},
	data  : { type: Array, required: true }
});

module.exports = mongoose.model('Graph', graphSchema);
