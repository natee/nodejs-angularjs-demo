
// 获取用户表
var User = require('../models/User.js');

// API:登陆处理
exports.doLogin = function(req, res){

	/*
	 * ERROR CODE
	 * 1：用户不存在
	 * 2：密码错误
	 */

	User.findBySno(req.body, function(error, user) {
		if(user){ // 找到用户
			// 验证密码是否正确
			if(user.password == req.body.password){
				res.json({
					status: 0,
					result: user
				});
			}else{
				// 密码错误
				res.json({status: 2});
			}

		}else{
			// 用户不存在
			res.json({status: 1});
		}
	});

};

