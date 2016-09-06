/**
 * Created by Administrator on 2016/6/25.
 */
//exports.comments = [
//    { author : '小明', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
//    { author : '小强', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
//    { author : '小兵', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
//    { author : '拉登', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
//];
var mysql = require('mysql');

var comments = function () {
    var database = 'comment';//数据库名
    var table = 'com';//表名
    var comm = [];

    var connection = mysql.createConnection({
        "host" : "localhost",
        "user" : "root",
        "port" : 3306,
        "password" : "wuhan"
    });

    connection.connect();

    connection.query('use '+ database);
    connection.query('SELECT * from ' + table, function(err, rows, fields) {
        if (err) throw err;

        if(rows) {
            //console.log(rows);
            comm.push(rows);
            //console.log(comm);
            return rows;
        }
    });
    connection.end();
};

exports.comments = comments;
