var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
	username:{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		lowercase: true,
		index:{
			unique: true,
			dropUps: true
		}
	},
	email:{
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	senha:{
		type: String,
		required: true,
		minlength: 1
	},
	status:{
		type:Number,
		required: true,
		minlength: 1,
		maxlength: 1,
		trim: true
	}
});

module.exports = mongoose.model('Usuario', usuarioSchema);
