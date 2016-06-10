var db = require('./mongodb');
var Schema = db.mongoose.Schema;

// 定义用户表结构
var UserSchema = new Schema({
    username: String,
    password: String
});

var UserModel = db.mongoose.model('users', UserSchema);

function User(){}

User.prototype = {
	find: function(callback){
		UserModel.find({}, function(err, obj){

			callback(err, obj);
		});
	}

};

module.exports = new User();