var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studio');

exports.mongoose = mongoose;