var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://cursedstudio:curs3dSTD@naboo.mongodb.umbler.com:38845/foods');

module.exports = {mongoose};
