var express = require('express');
//var routes = require('./routes');
var comment = require('./routes/comment');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(express.bodyParser());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
//if ('development' == app.get('env')) {
//	app.use(express.errorHandler());
//}




/*首页加载时候的留言列表请求*/
app.get('/comments', urlencodedParser,comment.list);


/*首页用户留言时候发送的post请求*/
app.post('/comments', urlencodedParser,comment.add);

/*我的网页的请求地址*/
app.post('/loginCheck', urlencodedParser , comment.loginCheck);

/*首页加载图片请求*/
app.get('/loadMoreImg', urlencodedParser , comment.loadMoreImg);

/*请求图片总数*/
app.get('/loadAllImgNum' , urlencodedParser , comment.loadAllImgNum);

/*请求博客地址*/
app.get('/loadAllBlogs' , urlencodedParser , comment.loadAllBlogs);

/*请求某一具体博客的访问量，数字，赞数*/
app.get('/loadBlogsDetail' , urlencodedParser , comment.loadBlogsDetail);

/*点赞之后的+1操作*/
app.get('/addBlogsLikeNum' , urlencodedParser , comment.addBlogsLikeNum);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});