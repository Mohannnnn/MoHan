/**
 * Created by 14-7447 on 2016/9/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var CommentBox = require('../message/commentbox');

//主页的内容的第四部分，（留言）

var MainPage_sayMe = React.createClass({

    getInitialState : function () {
        return {

        }
    },

    render : function () {

        return(
            <section>
                <div id="sayMe" className="eachModule">
                    <header>
                        <h2>留言</h2>
                    </header>

                    <CommentBox url="/comments" pollInterval={2000}/>

                    <div style={{clear: "both"}}></div>
                </div>
            </section>
        )
    }
});

module.exports = MainPage_sayMe;