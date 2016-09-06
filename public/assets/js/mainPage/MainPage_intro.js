/**
 * Created by 14-7447 on 2016/9/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

//主页的内容的第一部分（个人介绍）
var MainPage_intro = React.createClass({

    getInitialState : function () {
        return {

        }
    },

    render : function () {

        return(
            <section>
                <div id="intro" className="eachModule" style={{height : (this.props.windowHeight)*0.8}}>
                    <header>
                        <h1></h1>
                        <h2>I'm <strong>wuhan</strong></h2>

                        <p>再坚持一会，下一秒绝对会有让你意想不到的收获
                            <br/>
                            <span className="author">——I say</span>
                        </p>
                    </header>
                </div>

            </section>
        )
    }
});

module.exports = MainPage_intro;