/**
 * Created by 14-7447 on 2016/9/12.
 */


;(function blogs() {

    var wordNum = document.querySelector('.wordNum'),
        readNum = document.querySelector('.readNum'),
        likeNum = document.querySelector('.likeNum'),
        likeBtn = document.querySelector('.like'),
        likeBtnSpan = likeBtn.querySelectorAll('span')[1];

    blogsCommon().ajax({
        type : 'get',
        dataType : 'json',
        data : {blogId : blogsCommon().getId()},
        url : '/loadBlogsDetail',
        success : function (data) {
            var data = JSON.parse(data);

            wordNum.innerText = '字数' + data.blogWordNum;
            readNum.innerText = '阅读量' + data.blogReadNum;
            likeNum.innerText = '赞' + data.blogLikeNum;
            likeBtnSpan.innerText = data.blogLikeNum;
        },
        fail : function (err) {
            console.log(err);
        }

    })

    blogsCommon().clickGood(likeBtn,likeNum);
})()
