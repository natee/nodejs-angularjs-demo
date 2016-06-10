var db = require('./mongodb');
var Schema = db.mongoose.Schema;

var choiceSchema = new Schema({
	text: String
});

var ListSchema = new Schema({
	pubTime: Date,
	text: String,
	userName: String,
	userId: Schema.Types.ObjectId
});

var ListModel = db.mongoose.model('lists', ListSchema);

function List(){}

List.prototype = {

	getAllList: function(data, callback){

		var reqParam = {};
		
		ListModel.find(reqParam, function(err, obj){
			callback(err, obj);
		});
	},

	addItem: function(data, callback){
		var item = new ListModel({
			pubTime: data.pubTime,
			text: data.text,
			userId: data.userId,
			userName: data.userName
		});
		item.save(function(err, obj){
			callback(err, obj);
		});
	}
};

module.exports = new List();
