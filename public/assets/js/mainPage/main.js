/**
 * Created by 14-7447 on 2016/7/12.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('../message/commentbox');
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


/*主页的左边导航部分*/
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
            //console.log(item.nodeType);
            //console.log(item.dataset.name);

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
        //e.target.src = '../images/' + e.target.dataset.name + '2.svg';
        e.target.style.opacity = 1;

    },
    //鼠标移出事件
    connectionWayFunout : function (e) {
        //e.target.src = '../images/' + e.target.dataset.name + '1.svg';
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


/*主页的右边部分*/
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


//主页的内容的第二部分，（摄影）
    //每一个图片组件
var MainPage_photo_every = React.createClass({

    //getInitialState : function () {
    //    return {
    //        lookMorePhotoDisplay : this.props.lookMorePhotoDisplay
    //    }
    //},
    //点击图片查看函数
    lookImgFun : function (e) {

        var newState = 'block';
        //this.setState({lookMorePhotoDisplay : newState});

        var clickImg = e.currentTarget.firstChild;
        var trueImg = document.getElementById('trueImg');
        var caption = document.getElementById('caption');
        var photobackimg = document.getElementById('photobackimg');

        photobackimg.style.backgroundImage = "url('" +  clickImg.src + " ') ";
        trueImg.src = clickImg.src;
        caption.innerHTML = e.currentTarget.nextSibling.innerHTML;

        //将信息传回父组件
        this.props.listenlookImgFun(newState);
    },
    render : function () {
        var that = this;

        var every_photo = this.props.data.map(function (value) {

                return (
                    <div key={value.imgId} className="photo_container">
                        <a href="javascript:;" onClick={that.lookImgFun}><img src={"../viewimages/" + value.imgUrl}
                                                                              alt=""/></a>
                        <div className="every_photo_word">
                            <h3>{value.imgName}<span className="imgTime">{value.imgTime}</span></h3>
                            <p>{value.imgDescription}</p>
                        </div>
                    </div>
                )

        });
        return (
            <div>
                {every_photo }
            </div>

        );

    }
});
var MainPage_photo = React.createClass({

    getInitialState : function () {
        return {
            lookMorePhotoDisplay : 'none',
            data : [],
            allImgNum : 0, //总共的图片数量
            length : 6  //每页长度
        }
    },
    closeFun : function (e) {
        this.setState({lookMorePhotoDisplay : 'none'});
    },
    //监听子组件(通过回调函数传回来的参数)
    listenlookImgFun : function (newState) {
        this.setState({lookMorePhotoDisplay : newState});
    },
    listenlookPageFun : function (newState) {
        this.setState({data : newState});
    },
    //页面加载图片ajax请求
    loadImgFun : function (ajaxData) {
        $.ajax({
            type: 'get',
            url : this.props.url,
            data : ajaxData,
            dataType : 'json',
            success : function (data) {
                this.setState({data : data.imgData , allImgNum : data.allImgNum[0].num});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount : function () {
        this.loadImgFun({length : this.state.length , page :1});
    },
    render : function () {

        return(
            <section>
                <div id="photo" className="eachModule">
                    <header>
                        <h2>摄影</h2>
                    </header>
                    <p>相片永远不会说谎,因为它往往记录了我们生活中最真实那个片段...</p>
                    <div id="displayphoto">
                        <MainPage_photo_every data={this.state.data} listenlookImgFun={this.listenlookImgFun} lookMorePhotoDisplay={this.state.lookMorePhotoDisplay}/>
                    </div>

                    <MainPage_paging allImgNum={this.state.allImgNum} length={this.state.length} url={this.props.url} listenlookImgFun={this.listenlookPageFun}/>

                </div>

                <div id="lookMorePhoto" style={{height : (this.props.windowHeight),display:this.state.lookMorePhotoDisplay}}>
                    <div id="photobackimg"></div>
                    <span id="close" onClick={this.closeFun}></span>
                    <img id="trueImg" src=""/>
                    <div id="caption"></div>
                </div>
            </section>
        )
    }
});

//分页
var MainPage_paging = React.createClass({

    getInitialState : function () {
        return {
            clickNumPage: 1,
            allPage : 0 ,
            array : [],
            length : this.props.length
        }
    },

    componentDidUpdate : function () {
        this.pageFun();
        this.clickFun();
    },

    pageFun : function () {

        var string = '',
            len = parseInt(this.props.allImgNum/this.props.length);


        if(len != 0) {
            this.state.allPages = len + 1;
        }

        for(var i = 0  ; i < this.state.allPages ; i++) {
            if(i == 0) {
                string +=  '<li class="paging_each " data-num="' + (i+1) +  '">'+ '<a href="javascript:;">' +(i+1)+'</a>' +'</li>'
            }else {
                string +=  '<li class="paging_each" data-num="' + (i+1) +  '">'+ '<a href="javascript:;">' +(i+1)+'</a>' +'</li>'
            }


        }
        //console.log(Object.prototype.toString.call(string));

        var deal = document.createElement('div');
        deal.innerHTML = string;

        var paging_container_ul =  document.getElementsByClassName('paging_container_ul')[0];
        paging_container_ul.innerHTML = '<li class="paging_left"><a href="javascript:;"><i class="arrow2"></i>上一页</a></li>'+ string + '<li class="paging_right"><a href="javascript:;">下一页<i class="arrow3"></i></a></li>';


    },
    clickFun : function () {
        var paging_each = document.getElementsByClassName('paging_each');
        var paging_left = document.getElementsByClassName('paging_left')[0];
        var paging_right = document.getElementsByClassName('paging_right')[0];

        //paging_each[0].firstChild.classList.add('active');

        for(var i = 0 ; i < paging_each.length; i++) {
            paging_each[i].onclick = function (e) {
                for(var j = 0 ;j < paging_each.length ;j ++){
                    paging_each[j].firstChild.classList.remove('active');
                }
                var num = e.currentTarget.dataset.num;
                e.target.classList.add('active');

                this.setState({clickNumPage :num});

                this.ajaxFun({length : this.state.length , page : num});

            }.bind(this);
        }


        paging_left.onclick = function (e) {

            if(this.state.clickNumPage != 1) {

                this.setState({clickNumPage : this.state.clickNumPage-1});

                this.ajaxFun({length : this.state.length , page : this.state.clickNumPage});
            }

        }.bind(this);
        paging_right.onclick = function (e) {

            if(this.state.clickNumPage != this.state.allPages) {

                this.setState({clickNumPage : this.state.clickNumPage+1});

                this.ajaxFun({length : this.state.length , page : this.state.clickNumPage});
            }

        }.bind(this);

    },
    ajaxFun : function (ajaxData) {
        $.ajax({
            type: 'get',
            url : this.props.url,
            data : ajaxData,
            dataType : 'json',
            success : function (data) {
                //this.setState({data : data.imgData});
                this.props.listenlookImgFun(data.imgData);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render : function () {

        //var  pageFun = function () {
        //
        //    var allPages = 0,
        //        string = '',
        //        len = parseInt(this.props.allImgNum/this.props.length);
        //
        //    console.log(this.props.allImgNum);
        //    console.log(len);
        //    if(len != 0) {
        //        allPages = len + 1;
        //    }
        //    console.log(allPages);
        //    for(var i = 0  ; i < allPages ; i++) {
        //        string +=  '<li className="paging_each">'+(i+1)+'</li>'
        //
        //    }
        //    console.log(Object.prototype.toString.call(string));
        //
        //    var deal = document.createElement('div');
        //    deal.innerHTML = string;
        //
        //    var paging_left =  document.getElementsByClassName('paging_left')[0];
        //    console.log(paging_left);
        //    console.log( paging_left.parentNode);
        //    console.log(paging_left.nextSibling);
        //
        //    console.log(deal.childNodes);
        //    console.log(deal.childNodes.length);
        //
        //    for(var i = 0 ;i < deal.childNodes.length ; i++) {
        //
        //        console.log(deal.childNodes[i].nodeType);
        //
        //        if(deal.childNodes[i].nodeType == 1 ) {
        //            console.log(deal.childNodes[i].nodeType);
        //            paging_left.parentNode.insertBefore(deal.childNodes[i],paging_left.nextSibling);
        //        }
        //    }
        //
        //    //return deal.childNodes;
        //}.bind(this);


        return(
            <div className="paging_container">
                <ul className="paging_container_ul">
                    <li className="paging_left">上一页</li>

                    <li className="paging_right">下一页</li>
                </ul>
            </div>
        )
    }

});



//主页的内容的第三部分，（博客）


var MainPage_blogs = React.createClass({

    getInitialState : function () {
        return {

        }
    },

    render : function () {

        return(
            <section>
                <div id="blog" className="eachModule">
                    <header>
                        <h2>我的博客</h2>
                    </header>
                    <div className="blog_each">
                        <a href=""><h2>js语法总结</h2></a>
                        <span className="blog_time">2017-12-12</span>
                    </div>
                    <div className="blog_each">
                        <a href=""><h2>叙说js闭包原理</h2></a>
                        <span className="blog_time">2017-12-12</span>
                    </div>
                    <div className="blog_each">
                        <a href=""><h2>js事件机制</h2></a>
                        <span className="blog_time">2017-12-12</span>
                    </div>
                    <div className="blog_each">
                        <a href=""><h2>有关ajax</h2></a>
                        <span className="blog_time">2017-12-12</span>
                    </div>
                    <div className="blog_each">
                        <a href=""><h2>requestAnimationFrame动画</h2></a>
                        <span className="blog_time">2017-12-12</span>
                    </div>

                </div>

            </section>
        )
    }
});

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


//主页的内容的第五部分，（关于我）

var MainPage_aboutMe = React.createClass({

    getInitialState : function () {
        return {

        }
    },
    render : function () {

        return(
            <section>
                <div id="aboutMe" className="eachModule" style={{height : (this.props.windowHeight)}}>
                    <header>
                        <h2>关于我</h2>
                    </header>
                    <footer>
                        <a href="#" className="intro_button">
                            查看更多
                        </a>
                    </footer>
                </div>
            </section>
        )
    }
});


module.exports = MainPage;

/*
*  <footer>
 <a href="#" className="intro_button">
 查看更多
 </a>
 </footer>*/

/*
*      <div className="blog_each">
 <a href=""><h2>第三份</h2></a>
 <span className="blog_time">2017-12-12</span>
 </div>
 <div className="blog_each">
 <a href=""><h2>第四份</h2></a>
 <span className="blog_time">2017-12-12</span>
 </div>
 <div className="blog_each">
 <a href=""><h2>第五份</h2></a>
 <span className="blog_time">2017-12-12</span>
 </div>
 <div className="blog_each">
 <a href=""><h2>第六份</h2></a>
 <span className="blog_time">2017-12-12</span>
 </div>*/