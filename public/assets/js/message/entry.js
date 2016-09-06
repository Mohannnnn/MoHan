/**
 * Created by Administrator on 2016/6/26.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('./commentbox');

ReactDOM.render(
    <CommentBox url="/comments" pollInterval={2000} />,
    document.getElementById('commentbox')
);