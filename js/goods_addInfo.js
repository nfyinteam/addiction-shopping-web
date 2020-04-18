//var urlPrefix="http://localhost:8080/userapi";
var urlPrefix="http://www.88k88.cn/userapi";
//买家秀图片地址
var commentImageUrl="http://www.88k88.cn:9090/Server-files/Images/commentImges/";
//用户头像地址
var userFaceImageUrl="http://www.88k88.cn:9090/Server-files/Images/userFace/";
//表情地址
var emojiUrl="http://www.88k88.cn:9090/Server-files/Images/emoji";
var rotateVal=0;//预览图的旋转角度
var refreshTime=getNowDateFormat();//刷新页面的时间
var defaultreplySize=3;//回复评论的默认显示数量
var moreReplySize=3;//回复评论一页默认条数
var buyShowSize=2;//买家秀一页默认条数
var reportReason="";//举报界面代码
var goodId;
var goodInfo;
var skuId;
$(function () {
    init();
});
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function isGoodsWeb() {
    goodId = getUrlParam('goodId');
    if(goodId == null || goodId == ""){
        location.href = 'shop-index.html';
    }
}
function init() {
    isGoodsWeb();
    $.ajax({
        url : urlPrefix+'/goodsAllInfo/' + goodId,
        method : 'get',
        success : function (result) {
            if(result.data == null || result.code != 200){
                //location.href = 'shop-index.html';
            }           
            loadBuyShowAndComment();
            goodInfo = result.data;
            addInfo(goodInfo);
            addButton();
        }
    });
}
var skuStock = 0;
function addButton() {
    $('.goods-type-select').on('click', function () {
        $('.goods-type-selected').attr('class', 'goods-type-select');
        $(this).attr('class', 'goods-type-selected');
        var value = $(this).find("input[name='skuPrice']").val();
        var keyValue = $(this).text();
        skuId = $(this).find('input[name="skuId"]').val();
        /*$.ajax({
            url : urlPrefix+'/goodsAllInfo/' + goodId,
            method : 'get',
            success : function (result) {
                reloadSku(result.data);
                addButton();
            }
        });*/
        $('#good_price').text(value);
        skuStock = $(this).find("input[name='skuStock']").val();
        $('#sku-skuStock').text(skuStock);
        $('#skuNum').val(1);
        var skuNum = 1;
        $('#add-num').on('click', function () {
            if(skuStock > skuNum){
                skuNum++;
                $('#skuNum').val(skuNum);
            }
        });
        $('#minus-num').on('click', function () {
            if(skuNum != 1){
                skuNum--;
                $('#skuNum').val(skuNum);
            }
        });
        $('#skuNum').on('keyup', function () {
            var num = $('#skuNum').val();
            if(num > skuStock){
                $('#skuNum').val(skuStock);
            }else if(num <= 0){
                $('#skuNum').val(1);
            }
        });
        for (var i = 0; i < $('.goods-type-selected').length; i++){
            var test = $('.goods-type-selected').slice(i,i + 1).text();
            if(i == 0){
                $('.goods-selected-p').text("已选" + $('.goods-type-selected').slice(i,i + 1).parent().parent().prev().text() + ":" + test);
            }else{
                $('.goods-selected-p').append("，已选" + $('.goods-type-selected').slice(i,i + 1).parent().parent().prev().text() + ":" + test);
            }
        }
    });
    $('#buy_now').on('click', function () {
        $.ajax({
            url:urlPrefix+"/get/userInfo",
            method:"get",
            xhrFields:{
                withCredentials:true
            },
            success: function(result){
                if(result.code == 200){
                    if(result.data != null){
                        alert(result.data.userId);
                        if(skuId == null || skuId == ""){
                            alert("你还没有选择好商品");
                        }else{
                            var orderId = "";
                            window.open("buy-now.html?orderId=" + orderId);
                        }
                    }else{
                        $('#login').modal("show");
                    }
                }else{
                    alert(result.message);
                }
            }
        });
    });
}
function reloadSku(data) {
    $("#sku_relation").empty();
    $.each(data.skuMap, function (key,values) {
        var goodType = "";
        $.each(values, function(index, value){
            if(value.skuInfo.skuStock == 0){
                goodType += '<li>' +
                    '<div class="goods-num-zoo">' + value.valueName +
                    '<input type="hidden" name="skuStock" value="' + value.skuInfo.skuStock + '"/>' +
                    '<input type="hidden" name="skuPrice" value="' + value.skuInfo.skuPrice + '"/>' +
                    '<input type="hidden" name="skuId" value="' + value.skuInfo.skuId + '"/>' +
                    '</div>' +
                    '</li>';
            }else{
                goodType += '<li>' +
                    '<div class="goods-type-select">' + value.valueName +
                    '<input type="hidden" name="skuStock" value="' + value.skuInfo.skuStock + '"/>' +
                    '<input type="hidden" name="skuPrice" value="' + value.skuInfo.skuPrice + '"/>' +
                    '<input type="hidden" name="skuId" value="' + value.skuInfo.skuId + '"/>' +
                    '</div>' +
                    '</li>';
            }
        });
        $("#sku_relation").append(
            '<div class="row" style="margin-left: 0px; margin-top: 10px;">' +
            '<span class="goods-type-name">' + key + '</span>' +
            '<ul class="goods-type">' +
            goodType +
            '</ul>' +
            '</div>'
        );
        $('input[name="skuId"][value="' + skuId + '"]').parent().attr('class', 'goods-type-selected');
    });
}
function addInfo(data) {
    $('title').text(data.goodsInfo.goodsName);
    $('#good_title').text(data.goodsInfo.goodsName);
    $('.good_name').text(data.goodsInfo.goodsName);
    $('#good_price').text(data.skuRelations[0].skuInfo.skuPrice);
    $('#spu_remark').text(data.goodsInfo.spuInfo.spuRemark);
    $("#sku_relation").empty();
    $.each(data.skuMap, function (key,values) {
        var goodType = "";
        $.each(values, function(index, value){
            if(value.skuInfo.skuStock == 0){
                goodType += '<li>' +
                    '<div class="goods-num-zoo">' + value.valueName +
                    '<input type="hidden" name="skuStock" value="' + value.skuInfo.skuStock + '"/>' +
                    '<input type="hidden" name="skuPrice" value="' + value.skuInfo.skuPrice + '"/>' +
                    '<input type="hidden" name="skuId" value="' + value.skuInfo.skuId + '"/>' +
                    '</div>' +
                    '</li>';
            }else{
                goodType += '<li>' +
                    '<div class="goods-type-select">' + value.valueName +
                    '<input type="hidden" name="skuStock" value="' + value.skuInfo.skuStock + '"/>' +
                    '<input type="hidden" name="skuPrice" value="' + value.skuInfo.skuPrice + '"/>' +
                    '<input type="hidden" name="skuId" value="' + value.skuInfo.skuId + '"/>' +
                    '</div>' +
                    '</li>';
            }
        });

        $("#sku_relation").append(
            '<div class="row" style="margin-left: 0px; margin-top: 10px;">' +
            '<span class="goods-type-name">' + key + '</span>' +
            '<ul class="goods-type">' +
            goodType +
            '</ul>' +
            '</div>'
        );
    });
    $('#good-imgs').empty();
    $.each(data.goodsImgs, function (index, goodsImg) {
        if(goodsImg.imgIndex == 1){
            $("#good-img-index").empty();
            $("#good-img-index").append(
                '<a href="http://www.88k88.cn:9090/Server-files/Images/goodsImges/' + goodsImg.img.imgFile +
                '" class="fancybox-button" rel="photos-lib">' +
                '<img src="http://www.88k88.cn:9090/Server-files/Images/goodsImges/' +
                goodsImg.img.imgFile + '" class="img-responsive"' +
                'data-BigImgsrc = "http://www.88k88.cn:9090/Server-files/Images/goodsImges/' + goodsImg.img.imgFile + '">' +
                '</a>'
            );
        }else{
            $('#good-imgs').append(
                '<a href="http://www.88k88.cn:9090/Server-files/Images/goodsImges/' + goodsImg.img.imgFile +
                '" class="fancybox-button" rel="photos-lib">' +
                '<img alt="Berry Lace Dress" src="http://www.88k88.cn:9090/Server-files/Images/goodsImges/' + goodsImg.img.imgFile +
                '">' + '</a>'
            );
        }
    });
    $('#Description').empty();
    $.each(data.introduceTypes, function(i, type){
        var values = data.introduceMap[type.itName];
        var introduceType = "";
        $.each(values, function(index, value){
            if(value.img.imgId != null && value.img.imgId != ""){
                introduceType += '<img class="introduce-img" src="http://www.88k88.cn:9090/Server-files/Images/goodsImges/' + value.img.imgFile + '">'
                if(value.iRemark != null || value.iRemark != ""){
                    introduceType += '<p class="introduce-remarks-p">'+ value.iRemark + '</p>'
                }
            }else{
                if(value.iRemark != null || value.iRemark != ""){
                    introduceType += '<p class="introduce-remarks-p">'+ value.iRemark + '</p>'
                }
            }
        });
        $('#Description').append(
            '<div class="row" style="margin-left: 10px;margin-top: 20px;">'+
            '<h1 class="introduce-title">' + type.itName + '</h1>'+
            '<div class="col-md-12">'+ introduceType +
            '</div>'+
            '</div>'
        );
    });

    $('#Information').empty();
    var keyRelationInfo = "";
    $.each(data.keyRelationMap, function(key, values){
        $.each(values, function(index, value){
            keyRelationInfo += '<tr>'+ '<td class="datasheet-features-type">' + value.key.keyName + '</td>'+
                '<td>' + value.value.valueName + '</td>'+
                '</tr>';
        });
        $('#Information').append(
            '<table class="datasheet key-relation-type">'+
            '<tr>'+
            '<th colspan="2">' + key + '</th>'+
            '</tr>' +
            keyRelationInfo +
            '</table>'
        );
        keyRelationInfo = "";
    });
}


/*
    评论模块
*/

//排序类型
var commentType=1;
$(".comment-header .comment_form .radio-inline").off('click').click(function() {
    if(commentType%2==0){
        loadBuyShowAndComment();
    }
    commentType+=1;
})
//排序规则
$(".comment-header li select").off("change").on('change',function() {
    loadBuyShowAndComment()
})

//加载买家秀以及评论
function loadBuyShowAndComment(){
    $(".tab-pane .load-card").css("display","block");//显示加载面板
    $("#Comment .comment_box").empty();
    $.ajax({
        url:urlPrefix+"/get/buyShow/0/"+buyShowSize+"/"+
            defaultreplySize+"/"+goodId+"/"+refreshTime+"/"+
            $(".order_by option:selected").val()+"/"+
            $(".radio-inline input:radio:checked").val(),
        method:"get",
        xhrFields:{
            withCredentials:true
        },
        success:function(result){
            if(result.code==200){
                if(result.data.list.length>0){
                    //加载总评论数
                    $("#myTab li:eq(2) a").empty().append("累计评论（"+result.data.total+"）");
                    creatBuyShow(result.data);
                    if(result.data.total>buyShowSize){//超过默认条数才显示分页
                        var str='<div id="buyShow_page" class="normal" align="left" style="padding:10px 0px"></div>';
                        $("#Comment").append(str);
                        buyShowPage(result.data);
                    }
                }
                $(".tab-pane .load-card").css("display","none");//隐藏加载面板
            }else{

            }
        }
    })
}

//创建买家秀
function creatBuyShow(data){
    $.each(data.list,function(index,obj){
        if(obj.grade=="1"){//根据评论等级初始化
            var isLike=obj.isPraise=="1"?"fa-heart liked":"fa-heart-o";
            var str='<div data-id='+obj.comId+' class="reply-wrap">'+ //父级评论编号
                '                        <div class="user-face">\n' +
                '                          <a>\n' +
                '                            <img src="'+userFaceImageUrl+obj.userFace+'"/>\n' +
                '                          </a>\n' +
                '                        </div>\n' +
                '                        <div class="review-item clearfix">\n' +
                '                          <div class="user">\n' +
                '                            <a target="_blank" class="name">'+obj.userName+'</a>\n' +
                '                            <div class="rateit" data-rateit-value='+obj.comScore+' data-rateit-ispreset="true" data-rateit-readonly="true"></div>' +
                '                          </div>  \n' +
                '                          <p class="text">'+obj.content+'</p>';
            if(obj.imgInfoList.length>0){
                str+=loadBuyShowImage(obj.imgInfoList);
            }
            str+='<div class="info">\n' +
                '                            <span class="time">'+obj.time+'</span>\n' +
                '                            <span class="attribute">款式：xxxxx 尺码：xxxxx</span>\n' +
                '                            <span class="like" data-cid='+obj.comId+' data-userid="'+obj.userId+'">\n' +
                '                              <i class="fa '+isLike+'" aria-hidden="true"></i>'+
                '<span>'+obj.praiseNum+'</span>'+
                '                            </span>\n' +
                '                            <span class="reply" data-cid='+obj.comId+' data-userid="'+obj.userId+'">回复</span>\n' +
                '                            <span class="report" data-cid='+obj.comId+'>举报</span>\n' +
                '                          </div>';

            str+='<div class="reply-box" data-id='+obj.comId+'>';
            if(obj.commentList.length>0){//有回复评论才创建
                str+=creatComment(obj.commentList);//创建回评
                if(obj.commentList[0].total>defaultreplySize){//超过默认条数回评才创建更多按钮
                    str+='<div class="view-more">'+
                        '                       共<b>'+obj.commentList[0].total+'</b>条回复，<a class="btn-more" data-cid='+obj.comId+'>点击查看</a>'+
                        '                   </div>';
                }
            }
            str+='</div>';
            str+='</div></div>';
            $("#Comment .comment_box").append(str);
        }

    });
    $(".rateit").rateit();//调用星级评分插件
    emojiParse();//表情转义
    loadReviewPreviewClick();
    moreReplyCommentBtn();
    loadCommentAllBtnClick();
}

//创建买家秀图片
function loadBuyShowImage(data){
    var str='<div class="preview"><ul>';
    $.each(data,function(index,obj){
        str+='<li class="">' +
            '<img src="'+commentImageUrl+obj.imgName+'"/>' +
            '</li>';
    });
    str+='</ul></div>';
    return str;
}

//买家秀分页
function buyShowPage(pageInfo){
    total=pageInfo.total;
    $("#buyShow_page").pagination(pageInfo.total, { //第一个参数指定共多少条记录
        items_per_page:pageInfo.pageSize, // 每页显示多少条记录
        next_text:">", //下一页按钮图标
        prev_text:"<", //上一页按钮图标
        num_display_entries:5,//主体页数
        num_edge_entries: 0, //边缘页数
        callback: function(index){
            $(".tab-pane .load-card").css("display","block");//显示加载面板
            $("#Comment .comment_box *").remove();
            var pageNum = ++index;
            $.ajax({
                url:urlPrefix+"/get/buyShow/"+pageNum+"/"+buyShowSize+"/"+
                    defaultreplySize+"/"+goodId+"/"+refreshTime+"/"+
                    $(".order_by option:selected").val()+"/"+
                    $(".radio-inline input:radio:checked").val(),
                method:"get",
                xhrFields:{
                    withCredentials:true
                },
                success:function(result){
                    if(result.code==200){
                        if(result.data.list.length>0){
                            creatBuyShow(result.data);
                        }
                        $(".tab-pane .load-card").css("display","none");//隐藏加载面板
                    }else{

                    }
                }
            })
        }
    });
}

//创建回复评论
function creatComment(data){
    var str="";
    $.each(data,function(i,obj){
        var content=obj.content;
        if(obj.grade=="3"){//被回复的回评才需加@名字
            content=obj.byUserName!=null?"回复@"+obj.byUserName+"："+obj.content:obj.content;
        }
        var isLike=obj.isPraise=="1"?"fa-heart liked":"fa-heart-o";//判断该用户是否点赞
        str+='<div class="reply-item" data-cid='+obj.comId+'>'+ //回复评论编号
            '                              <a class="reply-face">\n' +
            '                                <img src="'+userFaceImageUrl+obj.userFace+'"/>\n' +
            '                              </a>\n' +
            '                              <div class="reply-con">\n' +
            '                                <div class="user">\n' +
            '                                  <a target="_blank" class="name">'+obj.userName+'</a>\n' +
            '                                  <span class="text-con">'+content+'</span>\n' +
            '                                </div>\n' +
            '                              </div>\n' +
            '                              <div class="info">\n' +
            '                                <span class="time">'+obj.time+'</span>'+
                                            '<span class="like" data-cid='+obj.comId+' data-userid="'+obj.userId+'">'+
                                                '<i class="fa '+isLike+'" aria-hidden="true"></i>'+
                                            '<span>'+obj.praiseNum+'</span>'+
                                            '</span>';
        if(obj.theUser!="1"){
            str+=           '<span class="reply" data-cid='+obj.comId+' data-userid="'+obj.userId+'">回复</span>' +
                '<span class="report" data-cid='+obj.comId+'>举报</span>';
        }else{
            str+=' <span class="delete" data-cid='+obj.comId+'>删除</span>';
        }
        str+='</div>\n' +
            '                           </div>';
    });
    return str;
}

//更多回评按钮点击事件
function moreReplyCommentBtn(){
    $(".view-more .btn-more").off("click").on("click",function(){
        var $this=$(this);
        $.ajax({
            url:urlPrefix+"/get/comment/0/"+moreReplySize+"/"+
                $this.attr("data-cid")+"/"+refreshTime+"/1",
            method:"get",
            xhrFields:{
                withCredentials:true
            },
            success:function(result){
                if(result.code==200){
                    //删除现有回评
                    $this.parent().parent().children().not(":eq(-1)").remove();
                    var str=creatComment(result.data.list);
                    if(result.data.total>moreReplySize){
                        str+='<div class="comment_page reduced" align="left" style="padding:10px 0px"></div>'
                    }
                    $this.parent().parent().append(str);
                    replyCommentPage($this.parent().parent(),result.data);
                    $this.parent().remove();
                    emojiParse();//表情转义
                    loadCommentAllBtnClick();
                }else{

                }
            }
        })
    })
}

//回复评论的分页（回评大框,分页数据）
function replyCommentPage($this,pageInfo){
    total=pageInfo.total;
    $this.find(".comment_page").pagination(pageInfo.total, { //第一个参数指定共多少条记录
        items_per_page:pageInfo.pageSize, // 每页显示多少条记录
        next_text:"下一页", //下一页按钮图标
        prev_text:"上一页", //上一页按钮图标
        num_display_entries:5,//主体页数
        num_edge_entries: 0, //边缘页数
        callback: function(index){
            var pageNum = ++index;
            $.ajax({
                url:urlPrefix+"/get/comment/"+pageNum+"/"+moreReplySize+"/"+
                    $this.attr("data-id")+"/"+refreshTime+"/1",
                method:"get",
                xhrFields:{
                    withCredentials:true
                },
                success:function(result){
                    if(result.code==200){
                        $this.children().not(":eq(-1)").remove();
                        $this.prepend(creatComment(result.data.list));
                        emojiParse();//表情转义
                        loadCommentAllBtnClick();
                    }
                }
            })
        }
    });
}

//缩略图按钮点击事件
function loadReviewPreviewClick(){
    //缩略图按钮点击事件
    $(".review-item .preview").find("li").on("click",function(){
        rotateVal=0;//清空旋转角度
        var displayTime=200;//显示隐藏的过渡时间
        var $btn=$(this);
        var $img=$btn.find("img");//获取点击的缩略图
        if($btn.parent().find(".active").length<=0){//二次点击同一行缩略图则不隐藏
            $(".viewer-stage").hide(displayTime);
        }
        if($btn.attr("class")==""){//判断是否点击同一个缩略图
            $(".review-item .preview").find("li").attr("class","");//取消所有缩略图框
            $btn.attr("class","active");//缩略图框变色
            //第一次点击此评论的缩略图则创建预览框
            if($btn.parent().next().length<=0){
                var str='<div class="viewer-stage" >\n' +
                    '                              <div class="toolbar">\n' +
                    '                                <a class="retract"><i class="fa fa-chevron-circle-up" aria-hidden="true"></i>收起</a>\n' +
                    '                                <a class="fancybox-button" href=""><i class="fa fa-arrows-alt" aria-hidden="true"></i>原图</a>\n' +
                    '                                <a class="left-turn">向左转</a>\n' +
                    '                                <a class="right-turn">向右转</a>\n' +
                    '                              </div>\n' +
                    '                              <div class="img-box">\n' +
                    '                                <div class="image-wrapper">\n' +
                    '                                  <img src=""/>';
                str+='<a class="prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>';
                str+='<a class="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></div></div></div>';
                $btn.parent().parent().append(str);
                //收起预览框按钮点击事件
                $(".viewer-stage .retract").off("click").on("click",function(){
                    displayPreviewBox(displayTime);
                });
                leftAndRightRotationBtn();//左右旋转按钮事件
                //上下页按钮显示隐藏
                displaySwitchBtn($btn.prev().length,$btn.next().length,
                    $btn.parent().next().children(".img-box").find(".prev"),
                    $btn.parent().next().children(".img-box").find(".next"));
                //调用预览框上下页按钮
                loadPreviewSwitchBtn();
                //显示预览框并在回调方法启用图片自适应处理
                $btn.parent().parent().find(".viewer-stage").show(displayTime,function(){
                    imageAdaptation($btn.parent().parent().find(".viewer-stage"),$img,0);
                });
            }else{
                //显示预览框并在回调方法启用图片自适应处理
                $btn.parent().parent().find(".viewer-stage").show(displayTime,function(){
                    imageAdaptation($btn.parent().parent().find(".viewer-stage"),$img,0);
                });
                //上下页按钮显示隐藏
                displaySwitchBtn($btn.prev().length,$btn.next().length,
                    $btn.parent().next().children(".img-box").find(".prev"),
                    $btn.parent().next().children(".img-box").find(".next"));
            }
            //给原图按钮更新图片
            $btn.parent().parent().find(".viewer-stage .toolbar .fancybox-button")
                .attr("href",$img.attr("src"));
        }else{
            //取消所有缩略图框并隐藏预览框
            displayPreviewBox(displayTime);
        }
    });
}

//一条评论的所有按钮事件
function loadCommentAllBtnClick(){
    //喜欢按钮点击事件
    $(".reply-wrap .like").off("click").on("click",function(){
        $this=$(this);
        $.ajax({
            url:urlPrefix+"/post/praise",
            method:"post",
            data:"commentId="+$this.attr("data-cid")+"&goodsId="+goodId+
                "&receiveUserId="+$this.attr("data-userid"),
            xhrFields:{
                withCredentials:true
            },
            success:function(result){
                if(result.code==200){
                    if(!$this.find("i").hasClass("liked")){//判断是点或取消
                        $this.find("span").text(parseInt($this.text())+1);
                        $this.find("i").attr("class","fa fa-heart liked");
                    }else{
                        $this.find("span").text(parseInt($this.text())-1);
                        $this.find("i").attr("class","fa fa-heart-o");
                    }
                }
            }
        })
    })
    //回复按钮点击事件
    $(".review-item .reply").off("click").on("click",function(){
        var $clickBtn=$(this);
        //父级评论编号
        var parentCid=$clickBtn.parent().parent().parent().attr("data-id");
        //被回复者名称
        var byReplyName=$clickBtn.parent().prev().find(".name").text();
        byReplyName=byReplyName==""?"文明用语":"回复 @"+byReplyName;
        if(parentCid!=""&&parentCid!=null){//没有父级评论编号则无法创建
            //同一个评论下的回复则重复创建回复框
            if($('.reply-wrap[data-id='+parentCid+'] .comment-send').length<=0){
                $(".reply-wrap .comment-send").remove();
                var str='<div class="comment-send">\n' +
                    '                            <div class="user-face">\n' +
                    '                              <img src="assets/corporate/img/tx004.png"/>\n' +
                    '                            </div>\n' +
                    '                            <div class="textarea-container">\n' +
                    '                              <textarea class="ipt-txt textarea" cols="80" name="msg" rows="5" placeholder="'+byReplyName+'" ></textarea>\n' +
                    '                              <button type="submit" data-parentCid='+parentCid+' class="comment-submit">发表评论</button>\n' +
                    '                            </div>\n' +
                    '<div class="comment-emoji">'+
                    '<i class="fa fa-smile-o" aria-hidden="true"></i>'+
                    '<span>表情</span>'+
                    '</div>'
                '                          </div>';
                //添加至该父级评论底部
                $(".reply-wrap[data-id='"+parentCid+"'] .review-item").append(str);
                $(".comment-send textarea").focus();//设置焦点
                loadEmoji();
                loadCommentSubmitBtn($clickBtn,$clickBtn.parent().prev().find(".name").text());
            }else{
                //更新被回复者名称
                $('.reply-wrap[data-id='+parentCid+'] .comment-send')
                    .find("textarea").attr("placeholder",byReplyName).focus();
            }
        }
    });
    //举报按钮点击事件
    $(".reply-wrap .report").off("click").on("click",function(){
        //获取举报的评论编号
        var commentId=$(this).attr("data-cid");
        $(".comment-report-mask").remove();
        //初始化举报界面
        if(reportReason==""){
            $.ajax({
                url:urlPrefix+"/get/reportReason",
                method:"get",
                async:false,
                success:function(result){
                    if(result.code==200){
                        reportReason='<div class="comment-report-mask">\n' +
                            '  <div class="comment-report-frame">\n' +
                            '    <div class="title">\n' +
                            '      请选择举报理由\n' +
                            '      <i class="fa fa-times btn-close" aria-hidden="true"></i>\n' +
                            '    </div>\n' +
                            '    <div class="con">\n' +
                            '      <div class="reason-box">\n' +
                            '        <dl class="clearfix">\n';
                        $.each(result.data,function(index,obj){
                            reportReason+= '   <dd>\n' +
                                '            <label class="type-selector radio-selector">\n' +
                                '              <div class="radio radio-info radio-inline">\n' +
                                '                  <input name="report_reason" class="radio" id="report_index_'+index+'" type="radio" value='+obj.reaInfo+'>\n' +
                                '                  <label for="report_index_'+index+'">'+obj.reaInfo+'</label>\n' +
                                '              </div>\n' +
                                '            </label>\n' +
                                '          </dd>\n';
                        })
                        reportReason+=    '</dl>\n' +
                            '      </div>\n' +
                            '      <div class="other">\n' +
                            '        <div class="btn-other">\n' +
                            '          <label class="type-selector radio-selector">\n' +
                            '            <div class="radio radio-info radio-inline">\n' +
                            '                <input name="report_reason" class="radio" id="other" type="radio" >\n' +
                            '                <label for="other">其他</label>\n' +
                            '            </div>\n' +
                            '          </label>\n' +
                            '        </div>\n' +
                            '        <div class="ta">\n' +
                            '          <textarea placeholder="自定义理由" ></textarea>\n' +
                            '        </div>\n' +
                            '      </div>\n' +
                            '      <div class="btn-con">\n' +
                            '        <a class="btn-cancel">取消</a>\n' +
                            '        <a class="btn-submit">确定</a>\n' +
                            '      </div>\n' +
                            '    </div>\n' +
                            '  </div>\n' +
                            '</div>';
                    }
                }
            })
        }
        $("body").append(reportReason);
        loadReportFrameBtn(commentId);
    });
    //删除按钮点击事件
    $(".reply-wrap .delete").off("click").on("click",function(e){
        var $this=$(this);
        var commentId=$this.attr("data-cid");
        $(".confirm_del_comment").remove();
        var deleteReason='<div class="confirm_del_comment">\n' +
            '      <div class="bg">\n' +
            '        <div class="content">\n' +
            '          <div class="mini">\n' +
            '            <div class="msg-text">\n' +
            '              <p>删除评论后将不可恢复</p>\n' +
            '              <p>是否继续？</p>\n' +
            '            </div>\n' +
            '            <div class="btnbox">\n' +
            '              <a class="ok">确定</a>\n' +
            '              <a class="cancel">取消</a>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '    </div>';
        $("body").append(deleteReason);
        //改变弹框位置
        $(".confirm_del_comment").css({"left":(e.pageX-$(".confirm_del_comment").width()/2)-20,
            "top":e.pageY-$(".confirm_del_comment").height()-$this.height()+15});
        //确定删除按钮点击事件
        $(".confirm_del_comment .ok").off("click").on("click",function(e){
            var $btn_ok=$(this);
            $.ajax({
                url:urlPrefix+"/delete/comment",
                method:"post",
                data:"comId="+commentId,
                xhrFields:{
                    withCredentials:true
                },
                success:function(result){
                    if(result.code==200){
                        $btn_ok.parent().parent().parent().parent().parent().remove();
                        $this.parent().parent().remove();
                    }
                }
            })
        })
        //取消删除按钮点击事件
        $(".confirm_del_comment .cancel").off("click").on("click",function(e){
            $(this).parent().parent().parent().parent().parent().remove();
        })
    })
}

//重载表情配置
function loadEmoji(){
    $(".emoji_container").remove();
    if($(".emoji_container").length<=0){
        $(".comment-send .textarea").emoji({
            button: ".comment-emoji",
            animation: 'slide',
            showTab: true,
            position:"bottomRight",
            icons: [{
                name: "emoji",
                path: emojiUrl+"/1/bqfh",
                maxNum: 50,
                file: ".png",
                placeholder: "{{alias}}",
                alias: {
                    1: "hehe",
                    2: "haha",
                    3: "tushe",
                    4: "a",
                    5: "ku",
                    6: "lu",
                    7: "kaixin",
                    8: "han",
                    9: "lei",
                    10: "heixian",
                    11: "bishi",
                    12: "bugaoxing",
                    13: "zhenbang",
                    14: "qian",
                    15: "yiwen",
                    16: "yinxian",
                    17: "tu",
                    18: "yi",
                    19: "weiqu",
                    20: "huaxin",
                    21: "hu",
                    22: "xiaonian",
                    23: "neng",
                    24: "taikaixin",
                    25: "huaji",
                    26: "mianqiang",
                    27: "kuanghan",
                    28: "guai",
                    29: "shuijiao",
                    30: "jinku",
                    31: "shengqi",
                    32: "jinya",
                    33: "pen",
                    34: "aixin",
                    35: "xinsui",
                    36: "meigui",
                    37: "liwu",
                    38: "caihong",
                    39: "xxyl",
                    40: "taiyang",
                    41: "qianbi",
                    42: "dnegpao",
                    43: "chabei",
                    44: "dangao",
                    45: "yinyue",
                    46: "haha2",
                    47: "shenli",
                    48: "damuzhi",
                    49: "ruo",
                    50: "OK"
                },
                title: {
                    1: "呵呵",
                    2: "哈哈",
                    3: "吐舌",
                    4: "啊",
                    5: "酷",
                    6: "怒",
                    7: "开心",
                    8: "汗",
                    9: "泪",
                    10: "黑线",
                    11: "鄙视",
                    12: "不高兴",
                    13: "真棒",
                    14: "钱",
                    15: "疑问",
                    16: "阴脸",
                    17: "吐",
                    18: "咦",
                    19: "委屈",
                    20: "花心",
                    21: "呼~",
                    22: "笑脸",
                    23: "冷",
                    24: "太开心",
                    25: "滑稽",
                    26: "勉强",
                    27: "狂汗",
                    28: "乖",
                    29: "睡觉",
                    30: "惊哭",
                    31: "生气",
                    32: "惊讶",
                    33: "喷",
                    34: "爱心",
                    35: "心碎",
                    36: "玫瑰",
                    37: "礼物",
                    38: "彩虹",
                    39: "星星月亮",
                    40: "太阳",
                    41: "钱币",
                    42: "灯泡",
                    43: "茶杯",
                    44: "蛋糕",
                    45: "音乐",
                    46: "haha",
                    47: "胜利",
                    48: "大拇指",
                    49: "弱",
                    50: "OK"
                }
            },{
                name: "经典表情",
                path: emojiUrl+"/qq/",
                maxNum: 50,
                file: ".gif",
                placeholder: "#qq_{alias}#"
            }]
        });
    }
    $(".comment-send .comment-emoji").off("click").on("click",function(e){
        $(".emoji_container").css("top",e.pageY+22);
    })
}

//举报页面的按钮事件
function loadReportFrameBtn(commentId){
    //选中其他理由则显示文本框
    $(".comment-report-mask input").off("click").on("click",function(){
        var $input=$(this);
        if($input.attr("id")=="other"){
            $(".comment-report-mask .ta").css({"display":"block"});
        }else{
            $(".comment-report-mask .ta").css({"display":"none"});
        }
    });
    //举报界面关闭按钮事件
    $(".comment-report-mask .btn-close").off("click").on("click",function(){
        $(".comment-report-mask").remove();
    });
    //举报界面取消按钮点击事件
    $(".comment-report-mask .btn-cancel").off("click").on("click",function(){
        $(".comment-report-mask").remove();
    });
    //举报界面提交按钮事件
    $(".comment-report-mask .btn-submit").off("click").on("click",function(){
        var $this=$(this);
        var reason;
        //判断是选择默认理由或者自定义
        if(typeof($this.parent().prev().prev().find("input:radio:checked").val()) != "undefined"){
            reason=$this.parent().prev().prev().find("input:radio:checked").val();
        }else{
            reason=$this.parent().prev().find("textarea").val();
        }
        if(reason!=""&& reason!=null){
            $.ajax({
                url:urlPrefix+"/post/report",
                method:"post",
                data:"commentId="+commentId+"&reason="+reason,
                xhrFields:{
                    withCredentials:true
                },
                success:function(result){
                    if(result.code==200){
                        $(".comment-report-mask").remove();
                    }
                }
            })
        }else{
            alert("请选择理由");
        }
    });
}

//发表评论按钮点击事件
function loadCommentSubmitBtn($rplyBtn,byReplyName){
    byReplyName=byReplyName==""?"":"回复 @"+byReplyName;
    //获取评论级别
    $(".comment-send .comment-submit").off("click").on("click",function(){
        var $btn=$(this);
        //将评论内容去除空格并添加换行
        var replyCon=$btn.prev().val().trim().replace(/\n/g,"<br/>");
        var time=getNowDateFormat();
        var str='<div class="reply-item" data-cid="2003">'+ //回复评论编号
            '                              <a class="reply-face">'+
            '                                <img src="assets/corporate/img/tx004.png"/>\n' +
            '                              </a>\n' +
            '                              <div class="reply-con">\n' +
            '                                <div class="user">\n' +
            '                                  <a target="_blank" class="name">'+$(".dropdown .userName").text()+'</a>\n' +
            '                                  <span class="text-con">'+byReplyName+"："+replyCon+'</span>\n' +
            '                                </div>\n' +
            '                              </div>\n' +
            '                              <div class="info">\n' +
            '                                <span class="time">'+time+'</span>\n' +
            '                              </div>\n' +
            '                          </div>';
            var commentData={"goodsId":goodId,
                            "parentId":$btn.attr("data-parentCid"),
                            "bycId":$rplyBtn.attr("data-cid"),
                            "content":replyCon,"time":time,
                            "receiveUserId":$rplyBtn.attr("data-userid")};
        $.ajax({
            url:urlPrefix+"/post/comment",
            method:"post",
            data:commentData,
            xhrFields:{
                withCredentials:true
            },
            success:function(result){
                if(result.code==200){
                    $(".reply-box[data-id="+$btn.attr("data-parentCid")+"]").prepend(str);
                    emojiParse();
                    $(".reply-wrap .comment-send").remove();//删除发表评论框
                }else{
                    alert(result.message);
                }
            }
        })
    });
}

//隐藏图片预览框
function displayPreviewBox(displayTime){
    $(".review-item .preview").find("li").attr("class","");
    $(".viewer-stage").hide(displayTime);
};

//左右旋转按钮事件
function leftAndRightRotationBtn(){
    //向左旋转按钮点击事件
    $(".viewer-stage .left-turn").rotate({
        bind: {
            click: function(){
                var $this=$(this);
                rotateVal -=90;
                //调用预览框图片处理
                imageAdaptation($this.parent().parent()
                    ,$this.parent().next().find(".image-wrapper img"),rotateVal);
            }
        }
    });
    //向右旋转按钮点击事件
    $(".viewer-stage .right-turn").rotate({
        bind:{
            click: function(){
                var $this=$(this);
                rotateVal+=90;
                //调用预览框图片处理
                imageAdaptation($this.parent().parent()
                    ,$this.parent().next().find(".image-wrapper img"),rotateVal);
            }
        }
    });
}

//预览框图片的自适应(预览框，图片)
function imageAdaptation($previewBox,$img,rotateAngle){
    //在内存中生成一张图片获取size，赋值给真正的预览框
    $("<img/>").attr("src",$img.attr("src")).load(function() {
        var FitWidth=400;//最大宽度
        var FitHeight=400;//最大高度
        var imgWidth=this.width;
        var imgHeight=this.height;
        if(imgWidth>FitWidth){//宽度是否超出
            imgHeight=(imgHeight*FitWidth)/imgWidth;//计算比例
            imgWidth=FitWidth;
        }
        if(imgHeight>FitHeight){//高度是否超出
            imgWidth=(imgWidth*FitHeight)/imgHeight;
            imgHeight=FitHeight;
        }
        if((rotateAngle/90)%2!=0){//旋转角度
            $previewBox.css({"width":imgHeight});//预览框设定宽
            $previewBox.find(".image-wrapper").css({"height":imgWidth});//图片框设定高
        }else{
            $previewBox.css({"width":imgWidth});
            $previewBox.find(".image-wrapper").css({"height":imgHeight});
        }
        if(rotateAngle==0){//切换图片才新建img
            $previewBox.find(".image-wrapper img").remove();
            $previewBox.find(".image-wrapper").prepend("<img/>")
            $previewBox.find(".image-wrapper img")//更新图片和大小
                .attr("src",$img.attr("src"))
                .css({"width":imgWidth,"height":imgHeight});
        }else{//旋转只更新预览框高宽
            $previewBox.find(".image-wrapper img")
                .css({"display":"none"})
                .rotate({
                    animateTo:rotateAngle,//旋转角度
                    duration:150,//时间
                    callback: function(){//旋转完的回调
                        $previewBox.find(".image-wrapper img")//旋转完后更新大小并显示
                            .css({"width":imgWidth,"height":imgHeight,"display":"block"})
                    }
                });
        }
    });
}

//预览框上下页按钮事件
function loadPreviewSwitchBtn(){
    //上一页
    $(".image-wrapper").find(".prev").off("click").on("click",function(){
        rotateVal=0;//清空旋转角度
        var $this=$(this);
        //获取当前被点击的缩略图
        var $item=$this.parent().parent().parent().prev().children(".active");
        if($item.prev().length>0){//判断是否第一张
            var $img=$item.prev().find("img");//获取图片
            //给前一个缩略图加框
            $item.attr("class","").prev().attr("class","active");
            //更新原图按钮图片
            $this.parent().parent().prev().find(".fancybox-button").attr("href",$img.attr("src"));
            //预览框图片自适应处理
            imageAdaptation($this.parent().parent().parent(),$img,0);
        }
        //获取更新后的缩略图框
        var $newItem=$this.parent().parent().parent().prev().children(".active");
        displaySwitchBtn($newItem.prev().length,$newItem.next().length,$this,$this.next());
    });
    //下一页
    $(".image-wrapper").find(".next").off("click").on("click",function(){
        rotateVal=0;//清空旋转角度
        var $this=$(this);
        var $item=$this.parent().parent().parent().prev().children(".active");
        if($item.next().length>0){
            var $img=$item.next().find("img");
            $item.attr("class","").next().attr("class","active");
            $this.parent().parent().prev().find(".fancybox-button").attr("href",$img.attr("src"));
            imageAdaptation($this.parent().parent().parent(),$img,0);
        }
        var $newItem=$this.parent().parent().parent().prev().children(".active");
        displaySwitchBtn($newItem.prev().length,$newItem.next().length,$this.prev(),$this);
    });
}

//上下页按钮鼠标滑入滑出事件
function displaySwitchBtn(prevLength,nextLength,$prevBtn,$nextBtn){
    $prevBtn.attr("class","prev display");//隐藏上一页按钮
    $nextBtn.attr("class","next display");//隐藏下一页按钮
    if(prevLength>0){//判断是否第一张图片
        $prevBtn.attr("class","prev");
        $prevBtn.off("mouseenter").mouseenter(function(){//鼠标滑入
            $(this).find("i").fadeIn();
        });
        $prevBtn.off("mouseleave").mouseleave(function(){//滑出
            $(this).find("i").fadeOut();
        });
    }
    if(nextLength>0){//判断是否最后一张图片
        $nextBtn.attr("class","next");
        $nextBtn.off("mouseenter").mouseenter(function(){
            $(this).find("i").fadeIn();
        });
        $nextBtn.off("mouseleave").mouseleave(function(){
            $(this).find("i").fadeOut();
        });
    }
}

//表情格式转码
function emojiParse(){
    $(".reply-con .text-con").removeData("plugin_emojiParse");
    $(".reply-con .text-con").emojiParse({
        icons: [{
            path: emojiUrl+"/1/bqfh",
            file: ".png",
            placeholder: "{{alias}}",
            alias: {
                1: "hehe",
                2: "haha",
                3: "tushe",
                4: "a",
                5: "ku",
                6: "lu",
                7: "kaixin",
                8: "han",
                9: "lei",
                10: "heixian",
                11: "bishi",
                12: "bugaoxing",
                13: "zhenbang",
                14: "qian",
                15: "yiwen",
                16: "yinxian",
                17: "tu",
                18: "yi",
                19: "weiqu",
                20: "huaxin",
                21: "hu",
                22: "xiaonian",
                23: "neng",
                24: "taikaixin",
                25: "huaji",
                26: "mianqiang",
                27: "kuanghan",
                28: "guai",
                29: "shuijiao",
                30: "jinku",
                31: "shengqi",
                32: "jinya",
                33: "pen",
                34: "aixin",
                35: "xinsui",
                36: "meigui",
                37: "liwu",
                38: "caihong",
                39: "xxyl",
                40: "taiyang",
                41: "qianbi",
                42: "dnegpao",
                43: "chabei",
                44: "dangao",
                45: "yinyue",
                46: "haha2",
                47: "shenli",
                48: "damuzhi",
                49: "ruo",
                50: "OK"
            }
        },{
            path: "emoji/qq/",
            file: ".gif",
            placeholder: "#qq_{alias}#"
        }]
    });
}

//获取当前时间
function getNowDateFormat(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = filterNum(nowDate.getMonth()+1);
    var day = filterNum(nowDate.getDate());
    var hours = filterNum(nowDate.getHours());
    var min = filterNum(nowDate.getMinutes());
    var seconds = filterNum(nowDate.getSeconds());
    return year+"-"+month+"-"+day+" "+hours+":"+min+":"+seconds;
}
//小于10的数字加多一个0
function filterNum(num){
    if(num < 10){
        return "0"+num;
    }else{
        return num;
    }
}