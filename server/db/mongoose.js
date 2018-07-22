var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://cursedstudio:curs3dSTD@naboo.mongodb.umbler.com:40496/foods');

module.exports = {mongoose};
