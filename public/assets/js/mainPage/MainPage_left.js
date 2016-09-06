/**
 * Created by 14-7447 on 2016/9/6.
 */
/*主页的左边导航部分*/

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var MainPage_left = React.createClass({

    content : {
        intro : '主页',
        photo : '摄影',
        blog  : '博客',
        aboutMe : '关于我',
        sayMe : '留言'
    },

    getInitialState : function () {
        return {
            fontColor : '#fff',
            libackGround : 'rgb(28, 32, 34)'
        }
    },
    //在组件渲染前调用
    //componentWillMount : function () {
    //    var height = window.innerHeight;
    //    this.setState({navHeight : height});
    //},

    //在组件第一次选然后调用
    componentDidMount : function () {

    },
    //点击导航
    liclickFun : function (e) {
        //获取到终极目标
        var ul = e.currentTarget.parentNode;
        //须将类数组变为真正的数组
        var childNode = Array.prototype.slice.call(ul.childNodes,0);

        childNode.forEach(function(item,index) {

            if(item.nodeType == 1){
                item.style.backgroundColor = '#212528';
                item.firstChild.style.color = '#909293';
                item.style.background = 'url("../images/'+ item.dataset.name  +'1.svg") no-repeat 4px';
            }
        });

        e.currentTarget.firstChild.style.color = '#fff';
        e.currentTarget.style.background = 'url("../images/'+ e.currentTarget.dataset.name  +'2.svg") no-repeat 4px';
        e.currentTarget.style.backgroundColor = 'rgb(28, 32, 34)';

        var target = document.getElementById(e.currentTarget.dataset.name).offsetTop;

        $('html').animate({'scrollTop':target},800);
        $('body').animate({'scrollTop':target},800);

    },
    //联系方式鼠标移动事件
    connectionWayFun : function (e) {
        e.target.style.opacity = 1;

    },
    //鼠标移出事件
    connectionWayFunout : function (e) {
        e.target.style.opacity = 0.5;
    },
    render : function () {

        return (
            <div id="nav_tail" style={{height : (this.props.windowHeight)}}>
                <div id="nav_head">
                    <img src="../images/ben.jpg" alt="个人头像"/>
                    <div>
                        <h2>Mo Han</h2>
                        <p>Stay hungry,stay foolish</p>
                    </div>
                </div>
                <ul>
                    <li className="nav_li intro" onClick={this.liclickFun} style={{backgroundColor:this.state.libackGround}} data-name="intro"><a href="javascript:;" style={{color:this.state.fontColor}}><span>{this.content.intro}</span></a></li>
                    <li className="nav_li photo" onClick={this.liclickFun} data-name="photo"><a href="javascript:;" ><span>{this.content.photo}</span></a></li>
                    <li className="nav_li blog" onClick={this.liclickFun} data-name="blog"><a href="javascript:;" ><span>{this.content.blog}</span></a></li>
                    <li className="nav_li sayMe" onClick={this.liclickFun} data-name="sayMe"><a href="javascript:;" ><span>{this.content.sayMe}</span></a></li>

                </ul>

                <div id="connectionWay">
                    <a href="https://github.com/fututer"><img src="../images/github.svg" alt="github" onMouseOver={this.connectionWayFun} onMouseOut={this.connectionWayFunout} data-name="github"/></a>
                    <a href="#"><img src="../images/message1.svg" alt="邮箱" onMouseOver={this.connectionWayFun} onMouseOut={this.connectionWayFunout} data-name="message"/></a>
                </div>
            </div>
        )
    }
});

module.exports = MainPage_left;