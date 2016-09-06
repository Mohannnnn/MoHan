/**
 * Created by 14-7447 on 2016/6/30.
 */

var React = require('react');
var ReactDOM = require('react-dom');

//登陆----login
var LoginTitle = React.createClass({

    //初始化state
    getInitialState : function () {
        return {
            pValue : ''
        }
    },
    //焦点
    focusHandle : function (e) {
        this.setState({pValue : ''});
    },
    //iframe判断表单登陆是否成功
    iframeLoad : function (){
        var ifr = window.frames['target'].document.body;//获取到body的DOM树，根据iframe的name值来判断
        var data = ifr.textContent;

        if(data.indexOf('no') != -1){
            this.setState({pValue : '用户名或密码不对'});
        }else{
            window.location.href = 'headPage.html';
        }
    },
    render : function (){
        var style_h1 = {
            fontSize: 30,
            fontWeight: 700,
            textShadow: '0 1px 4px rgba(0,0,0,0.2)',
            textAlign:'center',
            color:'#fff',
            marginTop:120
        };
        var p ={
            fontSize: 19,
            textAlign:'center',
            color:'#fff',
        };
        return (
            <div>
                <h1 style={style_h1}>Login</h1>
                <p style={p}>{this.state.pValue}</p>

                <form action="/loginCheck" method="post" target="target">
                    <input type="text" name="username" className="username" placeholder="Username" onFocus={this.focusHandle}/>
                    <input type="password" name="psw" className="password" placeholder="Password" onFocus={this.focusHandle}/>

                    <button type="submit">Sign me in</button>
                </form>

                <iframe name="target" onLoad={this.iframeLoad} style={{display:'none'}}></iframe>
            </div>

        );

    }
})

module.exports = LoginTitle;