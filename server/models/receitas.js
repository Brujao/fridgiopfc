var mongoose = require('mongoose');

var receitaSchema = mongoose.Schema({
    titulo: {
  		type: String,
  		required: true,
  		minlength: 1,
  		trim: true
  	},
    foto: {
      type: String,
      minlength: 1,
      trim: true
    },
    ingredientes: {
      type: [String],
      required: true,
      minlength: 1
    },
    modoPreparo: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    tempoPreparo: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    porcoes: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    status:{
      type:Number,
      required: true,
      minlength: 1,
      maxlength: 1,
      trim: true
    },
    autor:{
      type: String,
      required: true,
      minlength: 1,
      trim:true
    },
    favoritos:{
      type:[String],
      required: true,
      minlength: 1,
      trim: true
    }
});

module.exports = mongoose.model('Receita', receitaSchema);
