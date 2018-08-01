var mongoose = require('mongoose');

var ingredientesSchema = mongoose.Schema({
	name:{
		type: String,
		required: true,
		minlength: 2,
		trim: true,
		lowercase: true,
		index:{
			unique: true,
			dropUps: true
		}
	},
	id:{
		type: Number,
		required: true,
		trim: true,
		minlength: 1
	},
	children:{
		type: {
			name: String,
			id: Number
		},
		required: true,
		minlength: 1
	}
});

module.exports = mongoose.model('Ingredientes', ingredientesSchema);
