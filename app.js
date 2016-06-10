
var express = require('express');
var routes = require('./routes');
var apiUser = require('./api/user');
var apiList = require('./api/list');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
// var SessionStore = require("session-mongoose")(express)

app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Handle Errors gracefully
app.use(function(err, req, res, next) {
	if(!err) return next();
	console.log(err.stack);
	res.json({error: true});
});

// 主页面
app.get('/', routes.index);

// API路由
app.post('/api/user/login', apiUser.doLogin);
app.post('/api/list/pub', apiList.publish);
app.post('/api/list/all', apiList.getAllList);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
