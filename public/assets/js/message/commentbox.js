/**
 * Created by Administrator on 2016/6/26.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');
var $ = require('jquery');

var Comment = React.createClass({

    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },

    getInitialState : function () {
        return {
            imgName : '../../images/'+this.props.imgName
        }
    },
    render: function() {
        return (
            <div className="comment">
                <div className="comment_img">
                    <img src = {this.state.imgName} alt=""/>
                </div>

                <div className="comment_content">
                    <div  className="commentAuthor">
                        <span><a href="javascript:;">{this.props.author}</a>：</span>
                        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
                    </div>
                    <div className="comment_time">{this.props.time}</div>
                </div>
            </div>
        );
    }
});
var CommentList = React.createClass({

    componentDidMount : function () {
        if(this.props.data.length > 6) {

        }

    },
    render: function() {
        //console.log(this.props.data);会执行两次？
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment key={comment.time} author={comment.author} time={comment.time} imgName={comment.imgName}>
                    {comment.text}
                 </Comment>
            );
        });

        return (
            <div className="commentList">
                <h3><span>大家在说</span></h3>
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        if(this.refs.author.value == '' || this.refs.text.value == ''){
            alert('请输入完整内容');
        }else {
            var author = this.refs.author.value.trim();
            var text = this.refs.text.value.trim();
            var date = new Date().toLocaleString();

            if (!text || !author) {
                return;
            }
            this.props.onCommentSubmit({author: author, text: text , time : date , imgName : this.state.imgName});
            this.refs.author.value = '';
            this.refs.text.value = '';
            return;
        }

    },
    getInitialState : function () {
      return {
          number : 140,
          imgName : '1.jpg'
      }
    },
    textareaNumberFun : function (e) {
        var number = 140 - this.refs.text.value.length;
        this.setState({number : number});

        if(e.keyCode == 13) {
            document.getElementById('sendBtn').click();
        }
    },
    checkimgFun : function (e) {
        var allImg = e.target.parentNode.getElementsByTagName('img'),
            i = 0;
        for(i;i<allImg.length;i++){
            allImg[i].style.opacity = 0.5;
        }
        e.target.style.opacity = 1;
        this.setState({imgName : e.target.alt});
    },
    render: function() {
        return (
           <div id="comments_left">
               <h2>来，说说你的看法</h2>

               <form className="commentForm"  onSubmit={this.handleSubmit}>
                   <div>
                       <input type="text" placeholder="你的名字" ref="author" className="sayMe_author"/>
                       <img src="../../images/1.jpg" style={{opacity: 1}} onClick={this.checkimgFun}  alt="1.jpg"/>
                       <img src="../../images/headBack.jpg" onClick={this.checkimgFun}  alt="headBack.jpg"/>
                       <img src="../../images/loginBack.jpg" onClick={this.checkimgFun}  alt="loginBack.jpg"/>
                       <img src="../../images/loginBack1.jpg" onClick={this.checkimgFun}  alt="loginBack1.jpg"/>
                   </div>
                   <div>
                       <textarea type="textarea" placeholder="说些什么..." ref="text" className="sayMe_text" onKeyUp={this.textareaNumberFun}></textarea>
                   </div>

                   <div id="countNum">
                       <p>
                           <span >还能输入</span>
                           <strong>{this.state.number}</strong>
                           <span>个字</span>
                           <input id="sendBtn" type="submit" value="发表" title="快捷键 Enter"/>
                       </p>
                   </div>
               </form>

           </div>

        );
    }
});

var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
            type:'get',
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        // TODO: submit to the server and refresh the list
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function() {
        return (
            <div className="commentBox">
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
                <CommentList data={this.state.data} />
            </div>
        );
    }
});

module.exports = CommentBox;