var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://cursedstudio:curs3dSTD@tatooine.mongodb.umbler.com:49236/fridgio');

module.exports = {mongoose};
