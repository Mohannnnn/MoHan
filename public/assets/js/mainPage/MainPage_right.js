/**
 * Created by 14-7447 on 2016/9/6.
 */

//主页的右边部分
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var MainPage_intro = require('./MainPage_intro');
var MainPage_photo = require('./MainPage_photo');
var MainPage_blogs = require('./MainPage_blogs');
var MainPage_sayMe = require('./MainPage_sayMe');

var MainPage_right = React.createClass({

    getInitialState : function () {
        return {
            menuBtnDisplay : 1
        }
    },
    componentDidMount : function () {
        var ele1 = document.getElementById('nav_tail');

        if(ele1.offsetLeft < 0) {
            this.setState({menuBtnDisplay : 0 });
            console.log(this.state.menuBtnDisplay);
        }
    },
    clickMenuBtnFun : function (e) {

        var ele1 = document.getElementById('nav_tail');
        var ele2 = document.getElementById('MainPage_right');

        var target1 = ele1.offsetWidth;

        if (this.state.menuBtnDisplay != 0) {
            console.log(1);
            ele2.style.width = '100%';
            this.props.moveFun(ele1 , -target1 , 'left');

            this.setState({menuBtnDisplay : 0});
        }else {
            console.log(2);
            ele2.style.width = '76%';
            this.props.moveFun(ele1 , 0 , 'left');

            this.setState({menuBtnDisplay : 1});
        }



    },
    render : function() {

        return (
            <div id="MainPage_right">
                <div id="menu_btn" onClick={this.clickMenuBtnFun}></div>
                <MainPage_intro windowHeight={this.props.windowHeight}/>
                <MainPage_photo windowHeight={this.props.windowHeight} url="/loadMoreImg"/>
                <MainPage_blogs windowHeight={this.props.windowHeight}/>
                <MainPage_sayMe windowHeight={this.props.windowHeight}/>
            </div>
        )
    }
});

module.exports = MainPage_right;