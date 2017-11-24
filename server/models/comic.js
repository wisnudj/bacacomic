const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const comicSchema = new Schema({
	author : String,
	title : String,
	chapter : String,
	images : Array,
	createdDate  : {
		type : Date,
		default : Date.now()
	}
})

const comicModel = mongoose.model('comic', comicSchema);

module.exports = comicModel