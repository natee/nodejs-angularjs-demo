var List = require('../models/List.js');

// API:发表文字
exports.publish = function(req, res){

	List.addItem(req.body, function(err, data){
		if(data){
			res.json({
				status: 0,
				result: data
			});
		}else{
			res.json({status: 1});
		}
	});
};

exports.getAllList = function(req, res){
	List.getAllList(req.body, function(err, data){
		if(data){
			res.json({
				status: 0,
				result: data
			});
		}else{
			res.json({status: 1});
		}
	});
};
