var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://cursedstudio:curs3dSTD@naboo.mongodb.umbler.com:42115/fridgio');

module.exports = {mongoose};
