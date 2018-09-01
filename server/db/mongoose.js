var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://cursedstudio:curs3dSTD@naboo.mongodb.umbler.com:41164/fridgio');

module.exports = {mongoose};
