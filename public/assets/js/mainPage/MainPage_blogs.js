/**
 * Created by 14-7447 on 2016/9/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

//主页的内容的第三部分，（博客）

//遍历输出每个博客
var MainPage_blogs_every = React.createClass({

    render : function () {

        var every_blog = this.props.blogMessage.map(function (value) {

            return (
                <div className="blog_each" key={value.blogId}>
                    <a href={value.blogUrl + "?blogId=" + value.blogId}><h2>{value.blogName}</h2></a>
                    <span className="blog_time">{value.blogCreateTime}</span>
                </div>
            )

        });
        return (
            <div>
                {every_blog }
            </div>

        );

    }
});

//总的博客
var MainPage_blogs = React.createClass({

    getInitialState : function () {
        return {
            count: 5,
            url: '/loadAllBlogs',
            blogMessage: [],
            allBlogsCount : 0
        }
    },
    //监听子组件(通过回调函数传回来的参数)
    listenlookPageFun : function (newState) {
        this.setState({blogMessage : newState});
    },
    componentDidMount : function () {
        $.ajax({
            type: 'get',
            url : this.state.url,
            data : {count:this.state.count , page:1},
            dataType : 'json',
            success : function (data) {
                this.setState({blogMessage:data.blogsData, allBlogsCount : data.allBlogNum});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.state.url, status, err.toString());
            }.bind(this)
        });
    },

    render : function () {

        return(
            <section>
                <div id="blog" className="eachModule">
                    <header>
                        <h2>我的博客</h2>
                    </header>
                    <div>
                        <MainPage_blogs_every blogMessage={this.state.blogMessage} />
                    </div>
                </div>

            </section>
        )
    }
});

//<MainPage_blogs_paging allBlogsCount={this.state.allBlogsCount} listenlookPageFun={this.listenlookPageFun}/>
//博客分页
var MainPage_blogs_paging = React.createClass({

    getInitialState : function () {
        return {
            thisPageNum : 1,
            count: 5,
            url: '/loadAllBlogs',
            allPageCount : 0
        }
    },

    componentDidUpdate : function () {
        this.clickPageFun();
    },

    ajaxFun : function (ajaxData) {
        $.ajax({
            type: 'get',
            url : this.state.url,
            data : ajaxData,
            dataType : 'json',
            success : function (data) {
                this.props.listenlookPageFun(data.blogsData);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    clickPageFun : function () {
        var page_left = document.querySelectorAll('.paging_left')[1];
        var page_right = document.querySelectorAll('.paging_right')[1];

        var len = parseInt(this.props.allBlogsCount[0].num/this.state.count);

        if(len != 0) {
            this.state.allPageCount = len + 1;
        }

        page_left.onclick = function (e) {

          if(this.state.thisPageNum > 1) {
              this.setState({thisPageNum : this.state.thisPageNum-1});
              console.log(this.state.thisPageNum);
              this.ajaxFun({count:this.state.count , page:this.state.thisPageNum});
          }
        }.bind(this);

        page_right.onclick = function (e) {

            if(this.state.thisPageNum < this.state.allPageCount) {
                this.setState({thisPageNum : this.state.thisPageNum+1});
                console.log(this.state.thisPageNum);
                this.ajaxFun({count:this.state.count , page:this.state.thisPageNum});
            }
        }.bind(this);
    },


    render : function () {

        return(
            <div className="paging_container">
                <ul className="paging_container_ul">
                    <li className="paging_left" onClick={this.clickPageFun}><a href="javascript:;"><i className="arrow2"></i>上一页</a></li>
                    <li className="paging_right" onClick={this.clickPageFun}><a href="javascript:;">下一页<i className="arrow3"></i></a></li>
                </ul>
            </div>
        )
    }

});


module.exports = MainPage_blogs;