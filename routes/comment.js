/**
 * Created by Administrator on 2016/6/25.
 */
var comments = require('../model/comments').comments;
var mysql = require('mysql');

//登陆post请求
exports.loginCheck = function (req , res ) {
    var database = 'comment';//数据库名
    var table = 'login';//表名

    var connection = mysql.createConnection({
        "host" : "localhost",
        "user" : "root",
        "port" : 3306,
        "password" : "wuhan"
    });

    connection.connect();


    var username = req.body.username;
    var psw = req.body.psw;

    connection.query('use '+ database);
    var sql = 'SELECT username,psw from ' + table + ' where username="'+ username +'" and psw="' + psw + '"';

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;

        //console.log(rows);
        //console.log(req.body);
        //console.log(Object.prototype.toString.call(rows));

        if(rows[0]) {
            res.json('yes');
        } else {
            res.json('no');
        }

    });

};

//首页加载图片get请求
exports.loadMoreImg = function (req , res) {
    var database = 'comment';//数据库名
    var table = 'displayimg';//表名

    var connection = mysql.createConnection({
        "host" : "localhost",
        "user" : "root",
        "port" : 3306,
        "password" : "wuhan"
    });
    connection.connect();

    //select * from content order by id desc limit 0, 10

    connection.query('use '+ database);
    //console.log(req.query);

    var length = req.query.length;
    var page = (req.query.page-1)*length;

    var allImgNum = 0 ;

    connection.query('SELECT count(imgId) num from ' + table , function(err, rows, fields) {
        if (err) throw err;

        if(rows) {
            allImgNum = rows;
        }
    });

    connection.query('SELECT * from ' + table + ' ORDER BY imgId DESC  limit '+ page + ',' + length, function(err, rows, fields) {
        if (err) throw err;

        if(rows) {
            var sendData = {
                imgData : rows,
                allImgNum : allImgNum
            }
            res.json(sendData);
        }
    });


};

//请求图片总数的get请求
exports.loadAllImgNum = function (req , res) {
    var database = 'comment';//数据库名
    var table = 'displayimg';//表名

    var connection = mysql.createConnection({
        "host" : "localhost",
        "user" : "root",
        "port" : 3306,
        "password" : "wuhan"
    });
    connection.connect();

    connection.query('use '+ database);

    connection.query('SELECT count(imgId) from ' + table , function(err, rows, fields) {
        if (err) throw err;

        if(rows) {
            res.json(rows);
        }
    });
};

//加载留言的get请求
exports.list = function(req, res){
    //console.log(comments);
    //res.json(comments);

    var database = 'comment';//数据库名
    var table = 'com';//表名

    var connection = mysql.createConnection({
        "host" : "localhost",
        "user" : "root",
        "port" : 3306,
        "password" : "wuhan"
    });

    connection.connect();

    connection.query('use '+ database);
    connection.query('SELECT * from ' + table + ' ORDER BY time DESC', function(err, rows, fields) {
        if (err) throw err;

        if(rows) {
            res.json(rows);
        }
    });

};


//用户发表留言的post请求
exports.add = function(req, res){

    //if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text')) {
    //    res.statusCode = 400;
    //    return res.send('Error 400: Post syntax incorrect.');
    //}

    //var newComment = {
    //    author : req.body.author,
    //    text : req.body.text
    //};

    //comments.push(newComment);

    //res.json(true);

    //插入到数据库
    var database = 'comment';//数据库名
    var table = 'com';//表名

    var connection = mysql.createConnection({
        "host" : "localhost",
        "user" : "root",
        "port" : 3306,
        "password" : "wuhan"
    });

    connection.connect();

    connection.query('use '+ database);
    var sql = "INSERT INTO " +table+" SET author=?,text=?,time=?,imgName=?",
        values = [ req.body.author, req.body.text ,req.body.time,req.body.imgName];
    connection.query(sql,values, function(err, rows, fields) {
        if(err) {
            console.log("插入记录出错: " + err.message);
            return;
        }
        if(rows) {
            res.json('true');
        }
    });
};


//博客加载的get请求
exports.loadAllBlogs = function (req , res) {
    var database = 'comment';//数据库名
    var table = 'blogs';//表名

    var connection = mysql.createConnection({
        "host" : "localhost",
        "user" : "root",
        "port" : 3306,
        "password" : "wuhan"
    });

    connection.connect();

    connection.query('use '+ database);

    var count = req.query.count;
    var page = (req.query.page-1)*count;

    var allBlogNum = 0 ;

    connection.query('SELECT count(blogId) num from ' + table , function(err, rows, fields) {
        if (err) throw err;

        if(rows) {
            allBlogNum = rows;
        }
    });

    connection.query('SELECT * from ' + table + ' ORDER BY blogId DESC  limit '+ page + ',' + count, function(err, rows, fields) {
        if(err) {
            console.log( err.message);
            return;
        }
        if(rows) {
            var sendData = {
                blogsData : rows,
                allBlogNum : allBlogNum
            }
            res.json(sendData);
        }
    });
};







/*-----------------------------------------------------*/


exports.get = function(req, res){
    if(comments.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No comment found');
    }
    var q = comments[req.params.id];
    res.json(q);
};


exports.delete = function(req, res){
    if(comments.length <= req.params.id) {
        res.statusCode = 404;
        return res.send('Error 404: No comment found');
    }

    comments.splice(req.params.id, 1);
    res.json(true);
};


exports.update = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    for(var i=0;i<comments.length;i++){
        if(comments[i].author==req.body.author){
            comments[i] = req.body;
            res.send({status:"success", message:"update comment success"});
            console.log(comments);
        }
    }

};