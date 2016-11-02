/**
 * Created by 14-7447 on 2016/9/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


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


        if(this.props.allImgNum%this.props.length != 0) {
            this.state.allPages = len + 1;
        }else {
            this.state.allPages = len;
        }
        //console.log(len);
        //console.log(this.state.allPages);
        for(var i = 0  ; i < this.state.allPages ; i++) {
            if(i == 0) {
                string +=  '<li class="paging_each " data-num="' + (i+1) +  '">'+ '<a href="javascript:;">' +(i+1)+'</a>' +'</li>'
            }else {
                string +=  '<li class="paging_each" data-num="' + (i+1) +  '">'+ '<a href="javascript:;">' +(i+1)+'</a>' +'</li>'
            }


        }

        var deal = document.createElement('div');
        deal.innerHTML = string;

        var paging_container_ul =  document.getElementsByClassName('paging_container_ul')[0];
        paging_container_ul.innerHTML = '<li class="paging_left"><a href="javascript:;"><i class="arrow2"></i>上一页</a></li>'+ string + '<li class="paging_right"><a href="javascript:;">下一页<i class="arrow3"></i></a></li>';


    },
    clickFun : function () {
        var paging_each = document.getElementsByClassName('paging_each');
        var paging_left = document.getElementsByClassName('paging_left')[0];
        var paging_right = document.getElementsByClassName('paging_right')[0];

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
                this.setState({clickNumPage : parseInt(this.state.clickNumPage)-1});
                this.ajaxFun({length : this.state.length , page : this.state.clickNumPage});
            }

        }.bind(this);
        paging_right.onclick = function (e) {
            if(this.state.clickNumPage != this.state.allPages) {
                this.setState({clickNumPage : parseInt(this.state.clickNumPage) + 1});
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
                this.props.listenlookImgFun(data.imgData);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render : function () {

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


module.exports = MainPage_photo;