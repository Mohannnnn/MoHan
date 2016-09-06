/**
 * Created by 14-7447 on 2016/7/10.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Tabulous = require('../common/tabulous');

//首页
var HeadPage = React.createClass({

    getInitialState   : function () {
        return {
            
        }
    },
    componentDidMount : function () {
        //Tabulous;
        $('#tabs').tabulous({
            effect: 'scale'
        });

        $('#tabs2').tabulous({
            effect: 'slideLeft'
        });

        $('#tabs3').tabulous({
            effect: 'scaleUp'
        });

        $('#tabs4').tabulous({
            effect: 'flip'
        });
    },
    render : function() {
        return (
            <div>
                <div id="header">

                    <h1>Hi ! <span> MoHan </span></h1>
                    <h2>致那些年一起陪伴de我们</h2>

                    <ul id="mainbuttons">
                        <span className="clear"></span>
                    </ul>
                </div>

                <h3 className="demo" id="demo">导航</h3>

                <p className="demointro">大家好，我是MoHan</p>

                <h3 className="demo2">鸡汤</h3>

                <div id="tabs">
                    <ul>
                        <li><a href="#tabs-1" title="">今天</a></li>
                        <li><a href="#tabs-2" title="">明天</a></li>
                        <li><a href="#tabs-3" title="">后天</a></li>
                    </ul>

                    <div id="tabs_container">

                        <div id="tabs-1">
                            <p>牵挂是一杯清茶，飘荡着淡雅的清香，却苦的有味，苦的醇厚，别有一番韵味。牵挂是纯洁，纯真，没有绚丽。牵挂是彼此爱慕的情结，美丽而神秘，让你游动，让你兴奋。</p>
                        </div>

                        <div id="tabs-2">
                            <p>别怕，也别怂，感情就是这样，没有失去你不会成熟，生活也是这样，没有遇到点险恶，你不会长大。你想要的，老天不一定会给你，你只有努力去争取， 别辜负爱你的人，别辜负你自己。</p>

                        </div>

                        <div id="tabs-3">
                            <p>一份耕耘，一份收获，一份努力，一份成果。你只看到别人辉煌，却看不到辉煌背后掩盖的坚持。你只看到别人风光，却看不到风光背后掩盖的努力。当你享受的时候，别人在奔跑。当你抱怨的时候，别人在醒悟。当你纠结的时候，别人在调整。当你脆弱的时候，别人却把泪咽到肚子里。</p>
                        </div>

                    </div>

                </div>
            </div>
        )
    }

});

module.exports = HeadPage;