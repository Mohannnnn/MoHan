/**
 * Created by 14-7447 on 2016/7/12.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var MainPage_left = require('./MainPage_left');
var MainPage_right = require('./MainPage_right');

var $ = require('jquery');

//主页
var MainPage = React.createClass({
    getInitialState : function() {
        return {
            windowHeight : 0
        }
    },
    //在组件渲染前调用
    componentWillMount : function () {
        var height = window.innerHeight;
        this.setState({windowHeight : height});
    },

    moveFun : function (elem,target,direction) {
        var timer = null;

        if(direction.indexOf('left') != -1){
            clearInterval(elem.timer);
            var speed = 0;
            elem.timer = setInterval(function(){
                speed = (target - elem.offsetLeft)/8;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                //是否到达到目标点
                if(elem.offsetLeft == target){
                    clearInterval(elem.timer);
                }else{
                    elem.style.left = elem.offsetLeft + speed + "px";
                }
            },30)
        } else {
            clearInterval(elem.timer);
            var speed = 0;
            elem.timer = setInterval(function(){
                speed = (target - elem.offsetTop)/8;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                //是否到达到目标点
                if(elem.offsetTop == target){
                    clearInterval(elem.timer);
                }else{
                    elem.style.left = elem.offsetTop + speed + "px";
                }
            },30)
        }

    },
    render : function () {

        return (
            <div>
                <MainPage_left windowHeight={this.state.windowHeight}/>
                <MainPage_right windowHeight={this.state.windowHeight} moveFun={this.moveFun}/>
            </div>
        )
    }
});


////主页的内容的第五部分，（关于我）
//
//var MainPage_aboutMe = React.createClass({
//
//    getInitialState : function () {
//        return {
//
//        }
//    },
//    render : function () {
//
//        return(
//            <section>
//                <div id="aboutMe" className="eachModule" style={{height : (this.props.windowHeight)}}>
//                    <header>
//                        <h2>关于我</h2>
//                    </header>
//                    <footer>
//                        <a href="#" className="intro_button">
//                            查看更多
//                        </a>
//                    </footer>
//                </div>
//            </section>
//        )
//    }
//});



module.exports = MainPage;
