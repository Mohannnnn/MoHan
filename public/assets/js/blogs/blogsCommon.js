/**
 * Created by 14-7447 on 2016/9/12.
 */
var blogsCommon = function () {

    //格式化参数
    function formatParams(data) {
        var arr = [];

        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        //arr.push( ("v=" + Math.random() ).replace("." , "") );

        return arr.join("&");
    }

    function ajax(json){

        json = json || {};
        json.type = (json.type || "GET").toUpperCase();
        json.dataType = json.dataType || "json";
        var params = formatParams(json.data);


        //1、创建AJAX对象

        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }



        //4、接受数据

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){

                var status = xhr.status;

                if(status >= 200 && status < 300){
                    json.success(xhr.responseText);
                }else{
                    json.fail('错误代号：' + xhr.status +'   ' + '错误信息：' + xhr.statusText);
                }
            }

        }

        //2、连接服务器  3、发送请求

        if (json.type == "GET") {
            xhr.open("GET", json.url + "?" + params, true);
            xhr.send(null);
        } else if (json.type == "POST") {
            xhr.open("POST", json.url, true);

            //设置表单提交时的内容类型

            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            xhr.send(params);
        }
    }

    //获取id
    function getId () {
        var url  = window.location.search;
        var id = url.split('=')[1];

        return id;
    }

    //点赞
    function clickGood (element , likeNum) {
        element.onclick = function (e) {
            var currentTarget = e.currentTarget;
            ajax({
                type : 'get',
                dataType : 'json',
                data : {blogId : getId()},
                url : '/addBlogsLikeNum',
                success : function (data) {

                    currentTarget.style.backgroundColor = '#009047';
                    currentTarget.innerHTML = '<span>赞</span><span>' + JSON.parse(data).blogLikeNum + '</span>';
                    likeNum.innerText = '赞' + JSON.parse(data).blogLikeNum;
                },
            });

            element.onclick = null;
        };

    }

    return {
        ajax : ajax ,
        clickGood : clickGood,
        getId : getId
    }
};