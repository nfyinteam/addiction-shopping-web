
var urlPrefix="http:///www.88k88.cn/userapi";
//买家秀图片地址
var commentImageUrl="http://www.88k88.cn:9090/Server-files/Images/commentImges/";
//用户头像地址
var userFaceImageUrl="http://www.88k88.cn:9090/Server-files/Images/userFace/";
//表情地址
var emojiUrl="http://www.88k88.cn:9090/Server-files/Images/emoji";
//消息图片地址
var messageImageUrl="http://www.88k88.cn:9090/Server-files/Images/messageImgs/";
//商品图片地址
var goodsImageUrl="http://www.88k88.cn:9090/Server-files/Images/goodsImges/";

var userId=sessionStorage.getItem("userId");
var userName=sessionStorage.getItem("userName");

var userFace=sessionStorage.getItem("userFace");
var Isremind="";//判断聊天消息是否提醒

loadNotView(getUrlParam());
init();

//监听url改变事件
$(window).bind('hashchange', function() {
    init();
});

function init(){
    //清空内容框
    $(".router-view[data-v-3] div").remove();
    //显示加载面板
    $(".card[data-v-loading]").css({"display":"block"});
    //为内容添加滚动条样式
    $(".space-right-bottom[data-v-3]").attr("class","space-right-bottom scroll_wrap")
        .children().attr("class","scroll_cont");
    var param=getUrlParam();
    if(param=="reply" ||param=="love"||param=="system"){
        loadNotice(param);
        messageBarClick($('.item[data-type='+param+']'));//改变指定的菜单栏值
    }else if(param=="whisper"){
        loadNewsListItem(param);
        messageBarClick($('.item[data-type='+param+']'));//改变指定的菜单栏值
        //聊天窗口不需要页面滚动条样式
        $(".space-right-bottom").removeClass("scroll_wrap")
            .children().removeClass("scroll_cont");
    }else if(param=="config"){
        messageSetting();
    }else{
        loadNotice("reply");
        messageBarClick($('.item:eq(0)'));
    }
}

//截取url获取请求消息类型
function getUrlParam(){
    var perimeters = window.location.href;
    param = decodeURI(perimeters.substr(1).split('#')[1]);
    return param;
}

//显示未读消息数量
function loadNotView(param){
    $.ajax({
        url :  urlPrefix+"/newMessageNum",
        method : 'get',
        xhrFields:{withCredentials:true},
        async:false,
        success : function (result) {
            if(result.code == 200 && result.data.length>0){
                //显示不同类型消息未读数量
                $.each(result.data,function(index,obj){                       
                    console.info(eval(obj))
                    if(obj.type=="0"){
                        $(".item[data-type='reply'] .notify-number")
                            .html(obj.notView).css({"display":"block"});
                    }else if(obj.type=="1"){
                        $(".item[data-type='love'] .notify-number")
                        .html(obj.notView).css({"display":"block"});
                    }else if(obj.type=="2"){
                        $(".item[data-type='system'] .notify-number")
                            .html(obj.notView).css({"display":"block"});
                    }else{
                        if(obj.newMessageNum>0){
                            $(".item[data-type='whisper'] .notify-number")
                            .html(obj.newMessageNum).css({"display":"block"});
                        }
                        //判断用户是否设置不显示
                        if(obj.userSetUpList.length>0){
                            $.each(obj.userSetUpList,function(i,o){
                                o.typeId=="3"?Isremind="not-remind":"";//记录聊天为不提醒
                                $(".item:eq("+o.typeId+") .notify-number").css({"display":"none"});
                            })
                        }
                    }
                });
                $(".item[data-type='"+param+"'] .notify-number").text("").css({"display":"none"});
            }
        }
    });
}

//加载通知
function loadNotice(param){
    $.ajax({
        url :  urlPrefix+"/get/notice/"+param,
        method : 'get',
        xhrFields:{withCredentials:true},
        success : function (result) {
            if(result.data!=null && result.code == 200){
                if(result.data[0].type=="0"){
                    replyMessage(result.data);
                }else if(result.data[0].type=="1"){
                    loveMessage(result.data);
                }else if(result.data[0].type=="2"){
                    systemMessage(result.data);
                }
            }
            $(".card[data-v-loading]").css({"display":"none"});//隐藏加载面板
        }
    });
}

//加载客服列表
function loadNewsListItem(){
    myMessage();//加载主体界面
    $(".card[data-v-loading]").css({"display":"none"});//隐藏加载面板
    $.ajax({
        url :  urlPrefix+"/get/newsList/userId",
        method : 'get',
        xhrFields:{withCredentials:true},
        success : function (result) {  
            openSocket("false");  
            if(result.data!=null && result.code == 200){
                $(".whisper .placeholder").before(createDialog("NULL","NULL","0")) 
                    .prev().find("textarea").css({"display":"none"});
                loadNewsItem($(".dialog:eq(0)"),"");
                callCustomerService();
                $.each(result.data,function(i,obj){
                    $(".list_item_cont .list-loading").before(createListItem(obj));
                    $(".whisper .placeholder").before(createDialog(obj.orderId,obj.customerServiceId));
                })
                $(".list-item:eq(0)").addClass("active");//选中第一个
                $(".dialog:eq(0)").css({"display": "flex"});//显示一个窗口
                $(".list-loading").css({"display": "none"});
                loadMoreNewsBtn();
                loadMyMessageBtnClick();
                loadImageAanEmojiBtn($(".dialog:eq(0)"));
                updateNewsState($(".list-item:eq(0)"),"NULL","NULL")
            }else{
                $(".list-load-error").css({"display": "block"});
            }
        }
    })
}

//加载订单详情
function loadOrderGoodsInfo(orderId){
    $(".space-right-top .item").css({"display": "none"});
    if(orderId=="NULL"||orderId==null){
        $(".space-right-top .top").removeClass("list").addClass("title").find(".router-link-active").text("我的消息")
        $(".card.whisper").css({"height": "calc(100vh - 116px)"});
        return ;
    }//显示加载
    $(".space-right-top .top").removeClass("list").addClass("title");
    $(".space-right-top .loading").css({"display": "block"});
    $.ajax({
        url :  urlPrefix+"/get/order",
        method : 'get',
        data:"orderId="+orderId,
        xhrFields:{withCredentials:true},
        success : function (result) {
            if(result.code == 200){//隐藏加载
                $(".space-right-top .top").removeClass("title").addClass("list");
                $(".space-right-top .loading").css({"display": "none"});
                $(".item[data-orderid="+orderId+"]").remove();
                $.each(result.data.orderDetails,function(i,obj){
                    console.info(obj);
                    $(".space-right-top .list").append(createGoodsInfo(obj));
                });
            }
        }
    });
}

//创建商品的信息
function createGoodsInfo(data){
    var str=
    '    <a data-orderid='+data.orderId+' href="'+urlPrefix+'/addiction-shopping-web/shop-item.html?goodId='+data.goodsId+'" class="item" target="_blank">\n' +
    '        <img class="goods_Image" src="'+goodsImageUrl+data.goodsFile+'">\n' +
    '        <div class="info">\n' +
    '            <p class="name">'+data.goodsName+'</p>\n' +
    '            <p class="sku">'+data.skuAttribute+'</p>\n' +
    '        </div>\n' +
    '        <div class="amount">\n' +
    '            <p class="price"><span>￥'+data.skuPrice+'</span></p>\n' +
    '            <p class="num">x'+data.skuNum+'</p>\n' +
    '        </div>\n' +
    '    </a>';
    return str;
}

//查询窗口的条数记录
function loadNewsItem($this,urlParam){    
    $.ajax({
        url :  urlPrefix+"/get/whisper/"+urlParam+"/"+$this.find(".msg-item.ok").length+"/2",
        method : 'get',
        xhrFields:{withCredentials:true},
        success : function (result) {  
            if(result.data!=null && result.code == 200){
                loadMessageListConent($this,result.data);
                $this.find(".message-list-content")
                    .scrollTop($this.find(".message-list-content")[0].scrollHeight); 
            }
        }
    });
}

//呼叫客服按钮事件
function callCustomerService(){
    $(".mask .call").off("click").on("click",function(){
        var $this=$(this);
        openSocket("true");
        $this.parent().remove();
    });
}

//加载更多消息按钮事件
function loadMoreNewsBtn(){
    $(".msg-more .load-more a").off("click").on("click",function(){
        var $this=$(this);
        $this.parent().css({"display":"none"});//隐藏自己显示加载
        $this.parent().next().css({"display":"block"});
        //获取当前已加载的消息数
        var pageStart=$this.parent().parent().next().next().find(".msg-item.ok").length;
        $.ajax({
            url :  urlPrefix+"/get/whisper"+$this.attr("data-param")+"/"+pageStart+"/2",
            method : 'get',
            xhrFields:{withCredentials:true},
            success : function (result) {
                $this.parent().next().css({"display":"none"});//隐藏加载
                if(result.code == 200){
                    if(result.data!=null){
                        $this.parent().prev().css({"display":"block"})//没有更多提示
                        $.each(result.data,function(i,obj){
                            $this.parent().parent().next().next()
                                .prepend(createNews(obj));
                            $this.parent().parent().next().find(".time").text(obj.time);    
                            if(obj.imgName!=null&&obj.imgName!="NULL"){
                                imageAdaptation(null,obj.imgName);
                            }                                  
                            if(result.data[0].total=="0"){
                                $this.remove();
                            }else{
                                $this.parent().prev().css({"display":"none"})//隐藏没有更多提示
                                $this.parent().css({"display":"block"});//显示更多
                            }
                        });
                    }
                }else{//错误提示
                    $this.remove();
                    $this.parent().next().next().css({"display":"block"});//显示错误
                }
            }
        });
    }) 
}

//回复消息
function replyMessage(data){
    var str='<div class="reply">';
    $.each(data,function(i,obj){
        str+=                '<div data-v-7 class="card reply-card">\n' +
'                                        <div data-reply class="reply-item" data-cid="'+obj.comId+'">\n' +
'                                            <div data-reply class="basic-list-item">\n' +
'                                                <a class="left-box" href="#" target="_blank" data-userid='+obj.author+'>\n' +
'                                                    <img class="avatar" src="'+userFaceImageUrl+obj.comment.userFace+'"/>\n' +
'                                                </a>\n' +
'                                                <div class="center-box">\n' +
'                                                    <div class="line-1">\n' +
'                                                        <span class="name-field">\n' +
'                                                            <a href="#" target="_blank">'+obj.comment.userName+'</a>\n' +
'                                                        </span>\n' +
'                                                        <span class="desc-field">\n' +
'                                                            '+obj.title+'\n' +
'                                                        </span>\n' +
'                                                    </div>\n' +
'                                                    <div class="line-2">\n' +
'                                                        <div class="real-reply">\n' +
'                                                            <div class="content-list">\n';                                                               
                                            if(obj.comment.grade=="3"){
                                                str+='  <span class="text">回复</span>\n'+
                                                        '  <a class="at" href="#" target="_blank">@'+userName+'</a>';
                                            }                           
                                                str+='  <span class="text">'+obj.content+'</span>\n' +
'                                                            </div>\n' +
'                                                            <div class="orginal-reply">'+userName+' : '+obj.comment.content+'</div>' +
'                                                        </div>\n' +
'                                                    </div>\n' +
'                                                    <div class="line-3">\n' +
'                                                        <span class="time-filed">\n' +
'                                                            <span class="time time-span">'+obj.time+'</span>\n' +
'                                                        </span>\n' +
'                                                        <div class="action-field">\n' +
'                                                            <span class="action-button">\n' +
'                                                                <i class="fa fa-comment-o" aria-hidden="true"></i>回复\n' +
'                                                            </span>\n' +
'                                                            <span class="action-button">\n' +
'                                                                <i class="fa fa-trash-o" aria-hidden="true"></i>删除\n' +
'                                                            </span>\n' +
'                                                        </div>\n' +
'                                                    </div>\n' +
'                                                </div>\n' +
'                                                <div class="right-box" data-parentCid='+obj.parentCid+'>\n' +
'                                                    <div class="text-box">'+obj.parentContent+'</div>\n' +
'                                                </div>\n' +
'                                            </div>\n' +
'                                        </div>\n' +
'                                    </div>';
    })
    $(".router-view[data-v-3] div").remove();
    $(".router-view[data-v-3]").append(str+'</div>');
    loadReplyBtn();
    loadDeleteBtn();
}

//点赞消息
function loveMessage(data) {
    $(".router-view[data-v-3] div").remove();
    var str='<div class="love">';
    $.each(data,function(i,obj){
        str+='                <div data-v-7 class="card love-card">\n' +
'                                        <div data-love class="love-item">\n' +
'                                            <div data-love class="basic-list-item">\n' +
'                                                <div class="left-box" >\n' +
'                                                    <img class="avatar" src="'+userFaceImageUrl+obj.comment.userFace+'"/>\n' +
'                                                </div>\n' +
'                                                <div class="center-box">\n' +
'                                                    <div class="line-1">\n' +
'                                                        <span class="name-field">\n' +
'                                                            <a>'+obj.comment.userName+'</a>\n' +
'                                                        </span>\n' +
'                                                        <span class="desc-field">\n' +
'                                                            '+obj.title+'\n' +
'                                                        </span>\n' +
'                                                    </div>\n' +
'                                                    <div class="line-3">\n' +
'                                                        <span class="time-filed">\n' +
'                                                            <span class="time time-span">'+obj.time+'</span>\n' +
'                                                        </span>\n' +
'                                                    </div>\n' +
'                                                </div>\n' +
'                                                <div class="right-box">\n' +
'                                                    <div class="text-box">'+obj.currentContent+'</div>\n' +
'                                                </div>\n' +
'                                            </div>\n' +
'                                        </div>\n' +
'                                    </div>';
    });
    $(".router-view[data-v-3]").append(str+'</div>');
}

//系统消息
function systemMessage(data){
    var str='<div class="system">';
    $.each(data,function(i,obj){
        str+='      <div data-v-3 data-v-7 class="card system-item">\n' +
'                                    <div class="top">\n' +
'                                        <span class="title">'+obj.title+'</span>\n' +
'                                        <span class="time">'+obj.time+'</span>\n' +
'                                    </div>\n' +
'                                    <div class="bottom">\n' +
'                                        <span class="text">'+obj.content+'</span>\n' +
'                                    </div>\n' +
'                                </div>'+
                    '</div>';
    });
    $(".router-view[data-v-3] div").remove();
    $(".router-view[data-v-3]").append(str);      
}

//我的消息界面主体
function myMessage(){
    var str='<div data-v-5 class="card whisper">\n' +
            '    <div class="list">\n' +
            '        <div class="list-title">近期消息</div>\n' +
            '        <div data-v-5 class="list-content list_item_cont">\n'+
            '            <a class="list-item" data-orderid="NULL">\n' +
            '                <div class="avatar" style="background-image: url(assets/corporate/img/tx015.png);"></div>\n' +
            '                <div class="name-box">\n' +
            '                    <div class="name">默认客服</div>\n' +
            '                    <div class="last-word"></div>\n' +
            '                </div>\n' +
            '                <div class="close">\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </div>\n' +
            '                <div class="notify-number">0</div>'+
            '            </a>\n'+
            '           <div class="list-loading">\n' +
            '                <div class="lds-spinner">\n' +
            '                    <i class="loading fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="list-load-error">\n' +
            '                加载失败,<span class="retry">点击重试</span>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>'+
            '    <div class="placeholder">'+
                    '<img class="placeholder-img" src="img/no_message.png">'+
                    '<div class="tip">没有新的未读消息呢</div>'+
                '</div>'+
            '</div>';
    $(".router-view[data-v-3]").append(str);
}

//创建会话列表
function createListItem(data){
    var style=data.notView>0?"block":"none";//判断未读消息的数量
    data.lastContent=data.lastContent==null?"&nbsp":data.lastContent;
    var str='            <a class="list-item" data-orderid='+data.orderId+' data-receive='+data.customerServiceId+'>\n' +
            '                <div class="avatar" style="background-image: url('+userFaceImageUrl+data.face.faceFile+');"></div>\n' +
            '                <div class="name-box">\n' +
            '                    <div class="name">'+data.userName+'</div>\n' +
            '                    <div class="last-word">'+data.lastContent+'</div>\n' +
            '                </div>\n' +
            '                <div class="close">\n' +
            '                    <i class="fa fa-times" aria-hidden="true"></i>\n' +
            '                </div>\n' +
            '                <div class="notify-number '+Isremind+'" style="display:'+style+'">'+data.notView+'</div>'+
            '            </a>\n';
    return str;
}

//创建会话窗口
function createDialog(orderId,receive,type,time){
    var param=orderId=="NULL"?"":"/orderId/"+orderId;
    var str='<div class="dialog" data-orderid='+orderId+' data-receive='+receive+'>\n' +
        '        <div class="title">\n' +
        '            <span>默认客服</span>\n' +
        '            <div class="action-menu">\n' +
        '                <div class="menu-list" style="display: none;">\n' +
        '                    <a class="">投诉客服</a>\n' +
        '                </div>\n' +
        '                <a class="icon-more"><i class="fa fa-angle-down" aria-hidden="true"></i></a>\n' +
        '            </div>\n' +
        '        </div>\n' +
                '<div class="message-list">\n' +
                '        <div class="message-list-content message_cont" >'+
                            '<div class="msg-more">\n' +
            '                    <div class="no-more">没有更多消息了~</div>'+
            '                    <div class="load-more" style="display:none">'+
                                    '<a href="javascript:void(0)" data-param="'+param+'">点击加载更多</a>'+
                                '</div>'+
                                '<div class="loading">'+
                                    '<i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>'+
                                '</div>'+ 
                                '<div class="error">'+
                                    '消息加载失败,'+'<a class="retry" href="#">点击重新加载</a>'+
                                '</div>'+
            '                </div>\n' +
            '                <div class="msg-time">\n' +
            '                    <span class="time"></span>\n' +
            '                </div>'+
            '                <div></div>'+
                    '    </div>\n' +
                '     </div>\n'+
        '        <div class="new-message-tip" style="display: none;">\n' +
        '            <span class="text">您有0条新消息</span>\n' +
        '        </div>\n' +
        '        <div class="send-box">\n' +
        '            <div class="input-box">\n';
        if(type=="0"){
            str+='<div class="mask"><button class="call">召唤客服</button></div>';
        }
    str+='               <textarea class="textarea" placeholder="回复一下吧~" maxlength="100" autofocus="autofocus" escape="true"></textarea>\n' +
        '                <div class="indicator">\n' +
        '                    <span>0</span>/<span>100</span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="right top" id="btnParse">\n' +
        '                <button class="send-btn" data-orderid='+orderId+'>发送</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n';
    return str;
}

//消息设置
function messageSetting() {
    $.ajax({
        url :  urlPrefix+"/get/userSetUp",
        method : 'get',
        xhrFields:{withCredentials:true},
        success : function (result) {
            if(result.code == 200){
                var str=
'                                <div class="config">\n' +
'                                    <div class="config-item">\n' +
'                                        <div class="text">\n' +
'                                            <span>回复我的消息提醒</span>\n' +
'                                            <span class="tip">（关闭后，回复将不再进行提醒）</span>\n' +
'                                        </div>\n' +
'                                        <div class="radio-list">\n' +
'                                            <label class="type-selector radio-selector">\n' +
'                                                <div class="radio radio-info radio-inline openBtn">\n' +
'                                                    <input name="status[1]" data-type="0" class="radio open" id="index_3" type="radio" checked>\n' +
'                                                    <label for="index_3">开启</label>\n' +
'                                                </div>\n' +
'                                            </label>\n' +
'                                            <label class="type-selector radio-selector">\n' +
'                                                <div class="radio radio-info radio-inline closeBtn">\n' +
'                                                    <input name="status[1]" data-type="0" class="radio close" id="index_4" type="radio" >\n' +
'                                                    <label for="index_4">关闭</label>\n' +
'                                                </div>\n' +
'                                            </label>\n' +
'                                        </div>\n' +
'                                    </div>\n' +
'                                    <div class="config-item">\n' +
'                                        <div class="text">\n' +
'                                            <span>收到的赞消息提醒</span>\n' +
'                                            <span class="tip"></span>\n' +
'                                        </div>\n' +
'                                        <div class="radio-list">\n' +
'                                            <label class="type-selector radio-selector">\n' +
'                                                <div class="radio radio-info radio-inline openBtn">\n' +
'                                                    <input name="status[2]" data-type="1" class="radio open" id="index_5" type="radio" checked>\n' +
'                                                    <label for="index_5">开启</label>\n' +
'                                                </div>\n' +
'                                            </label>\n' +
'                                            <label class="type-selector radio-selector">\n' +
'                                                <div class="radio radio-info radio-inline closeBtn">\n' +
'                                                    <input name="status[2]" data-type="1" class="radio close" id="index_6" type="radio" >\n' +
'                                                    <label for="index_6">关闭</label>\n' +
'                                                </div>\n' +
'                                            </label>\n' +
'                                        </div>\n' +
'                                    </div> \n' +
'                                    <div class="config-item">\n' +
'                                        <div class="text">\n' +
'                                            <span>系统消息提醒</span>\n' +
'                                            <span class="tip"></span>\n' +
'                                        </div>\n' +
'                                        <div class="radio-list">\n' +
'                                            <label class="type-selector radio-selector">\n' +
'                                                <div class="radio radio-info radio-inline openBtn">\n' +
'                                                    <input name="status[3]" data-type="2" class="radio open" id="index_7" type="radio" checked>\n' +
'                                                    <label for="index_7">开启</label>\n' +
'                                                </div>\n' +
'                                            </label>\n' +
'                                            <label class="type-selector radio-selector">\n' +
'                                                <div class="radio radio-info radio-inline closeBtn">\n' +
'                                                    <input name="status[3]" data-type="2" class="radio close" id="index_8" type="radio" >\n' +
'                                                    <label for="index_8">关闭</label>\n' +
'                                                </div>\n' +
'                                            </label>\n' +
'                                        </div>\n' +
'                                    </div> \n' +
'                                </div>'+
                        '<div class="config">\n' +
'                                    <div class="config-item">\n' +
'                                        <div class="text">\n' +
'                                            <span>消息提醒</span>\n' +
'                                            <span class="tip">（关闭后，消息将不再进行提醒）</span>\n' +
'                                        </div>\n' +
'                                        <div class="radio-list">\n' +
'                                            <label class="type-selector radio-selector">\n' +
'                                                <div class="radio radio-info radio-inline openBtn">\n' +
'                                                    <input name="status[0]" data-type="4" class="radio" id="index_1" type="radio" checked>\n' +
'                                                    <label for="index_1">开启</label>\n' +
'                                                </div>\n' +
'                                            </label>\n' +
'                                            <label class="type-selector radio-selector">\n' +
'                                                <div class="radio radio-info radio-inline closeBtn">\n' +
'                                                    <input name="status[0]" data-type="4" class="radio close" id="index_2" type="radio" >\n' +
'                                                    <label for="index_2">关闭</label>\n' +
'                                                </div>\n' +
'                                            </label>\n' +
'                                        </div>\n' +
'                                    </div>\n' +
'                                </div>\n';
                $(".card[data-v-loading]").css({"display":"none"});
                $(".router-view[data-v-3]").append(str);
                $.each(result.data,function(i,obj){
                    $(".radio.close[data-type="+obj.typeId+"]").attr("checked","checked");
                });
                loadConfigBtn();
            }
        }
    });
}

//消息设置按钮事件
var  radioBtnNum=1;//只触发一次
function loadConfigBtn(){
    //开启消息提醒
    $(".radio-inline.openBtn").off("click").on("click",function(){
        radioBtnNum+=1;
        if(radioBtnNum%2==0){
            var $this=$(this);
            $.ajax({
                url :  urlPrefix+"/delete/userSetUp",
                method : 'post',
                data: "type="+$this.find(".radio").attr("data-type"),
                xhrFields:{withCredentials:true},
                success : function (result) {
                    if(result.code == 200){
                        
                    }
                }
            });
        }
    });
    //关闭消息提醒
    $(".radio-inline.closeBtn").off("click").on("click",function(){
        radioBtnNum+=1;
        if(radioBtnNum%2==0){
            var $this=$(this);
            $.ajax({
                url :  urlPrefix+"/post/userSetUp",
                method : 'post',
                data: "type="+$this.find(".radio").attr("data-type"),
                xhrFields:{withCredentials:true},
                success : function (result) {
                    if(result.code == 200){
                        
                    }
                }
            });
        }
    });
}

//消息栏点击事件
function messageBarClick($btn){
    //删除点击的消息数量
    $btn.find(".notify-number").css({"display":"none"}).text("");
    $(".space-right-top .item").css({"display":"none"})
    $(".item[data-v-2]").css({"color":""});
    $btn.css({"color":"#2faee3"});
    $(".space-right-top[data-v-3] .top").addClass("title");
    $(".space-right-top[data-v-3]").find(".router-link-active")
        .text($btn.find("a").text()).attr("href",$btn.find("a").attr("href"));
}     

//回复按钮事件
function loadReplyBtn(){
    //回复按钮点击事件
    $(".action-field").find("span:eq(0)").off("click").on("click",function(){
        var $this=$(this);  
        //获取当前评论框元素
        var $replyItem=$this.parent().parent().parent().parent().parent(); 
        if($this.hasClass("active")){//已点击回复隐藏评论框
            $this.css({"color":"inherit"});
            $this.removeClass("active");
            $replyItem.find(".reply-box[data-v-9]").css({"display":"none"});
        }else{//没有点击则显示
            $this.css({"color":"#2faee3"}).find("i").css({"color":"#999"});
            $this.addClass("active");
            //显示回复框并设置焦点
            $replyItem.find(".reply-box[data-v-9]").css({"display":"flex"})
                .find("textarea").focus();
        }
        if($replyItem.find(".reply-box[data-v-9]").length<=0){//一条评论一个回复框
            var str='<div data-v-9 class="reply-box">\n' +
'                            <div class="left-box">\n' +
'                              <img class="my-avatar" src="assets/corporate/img/tx004.png"/>\n' +
'                            </div>\n' +
'                            <div class="center-box">\n' +
'                              <textarea class="reply-textarea" placeholder="文明用语" ></textarea>\n' +
                        '</div>'+
                        '<div class="right-box">'+
                            '<button type="submit" class="send-button">发表</br>评论</button>\n' +
'                            </div>\n' +
'                          </div>';
            $replyItem.append(str);
            //设置回复框焦点
            $replyItem.find(".reply-box[data-v-9]").find("textarea").focus();
            sendCommentBtn();
        }
    })
}

//加载回复评论发送按钮点击事件
function sendCommentBtn(){
    $(".reply-box[data-v-9] .send-button").off("click").on("click",function(){
        var $this=$(this);
        var replyCon=$this.parent().prev().find("textarea").val();
        replyCon=replyCon.trim().replace(/\n/g,"<br/>")
        var commentData={"goodsId":"NULL",
                "parentId":$this.parent().parent().prev().
                    find(".right-box").attr("data-parentCid"),
                "bycId":$this.parent().parent().parent().attr("data-cid"),
                "content":replyCon,
                "receiveUserId":$this.parent().parent().prev()
                    .find(".left-box").attr("data-userid")};
        console.log(commentData);
        $.ajax({
            url:urlPrefix+"/post/comment",
            method:"post",
            data:commentData,
            xhrFields:{
                withCredentials:true
            },
            success:function(result){
                if(result.code==200){
                    $this.parent().prev().find("textarea").val("");
                    alert(result.message);
                }else{
                    alert(result.message)
                }
            }
        })
        $this.parent().parent().css({"display":"none"});
    })
}   

//删除评论按钮事件
function loadDeleteBtn($btn){
    $(".action-field").find("span:eq(1)").off("click").on("click",function(){
        $this=$(this);
        $(".confirm-popup").remove();
        var str='<div data-v-0 class="confirm-popup">\n' +
'                                    <div class="popup-panel">\n' +
'                                        <div class="title-ctnr">\n' +
'                                            <h2>删除</h2>\n' +
'                                        </div>\n' +
'                                        <div class="popup-content-ctnr">\n' +
'                                            <div class="content">\n' +
'                                                <div class="text">删除该条评论后将无法恢复，是否继续？</div>\n' +
'                                            </div>\n' +
'                                            <div class="popup-btn-ctnr">\n' +
'                                                <button class="button-primary">\n' +
'                                                    <span class="text">确定</span>\n' +
'                                                </button>\n' +
'                                                <button class="button-close">\n' +
'                                                    <span class="text">取消</span>\n' +
'                                                </button>\n' +
'                                            </div>\n' +
'                                        </div>\n' +
'                                        <div class="close-btn">\n' +
'                                            <i class="fa fa-times" aria-hidden="true"></i> \n' +
'                                        </div>\n' +
'                                    </div>\n' +
'                                </div>';
        $("body").append(str);
        $(".confirm-popup .button-primary").off("click").on("click",function(){
            
        });
        $(".confirm-popup .button-close").off("click").on("click",function(){
            $(".confirm-popup").remove();
        });
        $(".confirm-popup .close-btn").off("click").on("click",function(){
            $(".confirm-popup").remove();
        });
    });
}

//我的消息界面所有按钮事件
function loadMyMessageBtnClick(){
    //会话点击事件
    $(".whisper[data-v-5] .list-item").off("click").on("click",function(){
        var $this=$(this);
        if($this.hasClass("active")){
            return;
        }
        //获取点击会话下标
        var index=$(".list-content[data-v-5] .list-item").index(this);
        //改变点击的会话框样式
        $(".whisper[data-v-5] .list-item").removeClass("active");
        var $goods=$(".space-right-top .item[data-orderid="+$this.attr("data-orderid")+"]");
        $(".space-right-top[data-v-3] .top").removeClass("title").addClass("list").find(".router-link-active").empty();
        $(".card.whisper").css({"height": "calc(100vh - 135px)"});
        if($goods.length==0){
            loadOrderGoodsInfo($this.attr("data-orderid"));
        }else{
            $(".space-right-top .item").css({"display":"none"});
            $goods.css({"display":"inline-block"});
        }
        //修改此窗口的所有消息已读
        updateNewsState($this,$this.attr("data-receive"),$this.attr("data-orderid"));
        $this.addClass("active");
        //隐藏所有聊天窗口
        $(".whisper[data-v-5] .dialog").css({"display":"none"});
        //根据下标显示点击的会话聊天窗口
        $(".whisper[data-v-5] .dialog:eq("+index+")").css({"display":"flex"});
        var param=$this.attr("data-orderid")=="NULL"?"":"/orderId/"+$this.attr("data-orderid");
        if($(".dialog:eq("+index+") .msg-item.ok").length==0){
            loadNewsItem($(".dialog:eq("+index+")"),param);
        }
        loadImageAanEmojiBtn($(".dialog:eq("+index+")"));                
    });
    //聊天窗口的更多按钮点击事件
    $(".whisper[data-v-5] .action-menu").off("click").on("click",function(){
        var $this=$(this);
        $this.find(".menu-list").toggle(250);
    })
    //聊天输入框监听事件
    $(".whisper[data-v-5] textarea").bind("input propertychange",function(){
        var $this=$(this);
        if($this.val().trim()!=""){//有内容则计算字数并改变发送按钮样式
            $this.parent().next().find(".send-btn").addClass("active");
            $this.next().find("span:eq(0)").text($this.val().length);
        }else{
            $this.parent().next().find(".send-btn").removeClass("active"); 
            $this.next().find("span:eq(0)").text(0);
        }
    });
    //聊天输入框回车事件
    $(".whisper[data-v-5] textarea").keydown(function(e){
        var $this=$(this);
        if(e.keyCode == 13 && e.shiftKey){//回车+shift键才触发
        }else if(e.keyCode == 13){
            e.preventDefault();//避免回车键换行
            sendMessage($this.parent().next().find(".send-btn"));
        }
    });
    //聊天发送按钮点击事件
    $(".whisper[data-v-5] .send-btn").off("click").on("click",function(){
        sendMessage($(this));
    });
}

//遍历消息条目
function loadMessageListConent($this,data){
    $this.find(".no-more").css({"display":"block"})
    $.each(data,function(i,obj){
        $this.find(".no-more").css({"display":"none"})
        $this.find(".message-list-content").children().eq(2).prepend(createNews(obj));
        if(obj.imgName!=null&&obj.imgName!="NULL"){//处理聊天图片
            imageAdaptation($this.find(".message-list-content"),obj.imgName);
        }
        $this.find(".time").text(obj.time);
        if(data[0].total=="0"){//显示没有更多
            $this.find(".no-more").css({"display":"block"})
            $this.find(".load-more").remove();
        }else{
            $this.find(".load-more").css({"display":"block"});//显示更多
        }
    });
    $this.find(".loading").css({"display":"none"});//隐藏加载
    //让滚动条到最底部
    $this.find(".message-list-content")
        .scrollTop($this.find(".message-list-content")[0].scrollHeight); 
}

//加载表情和图片按钮的配置
function loadImageAanEmojiBtn($this){
    $(".dialog .operation").remove();
    if($(".dialog .operation").length<=0){
        $this.children(".send-box").prepend('<div class="top operation">\n' +
                            '                <div class="space-margin">\n' +
                            '                    <div class="image-upload-btn">\n' +
                            '                        <i class="fa fa-picture-o" aria-hidden="true"></i>\n' +
                            '                    </div>\n' +
                            '                    <input class="image-upload" type="file" style="display: none;">'+
                            '                </div>\n' +
                            '                <div class="space-margin">\n' +
                            '                    <button class="emotion-btn">\n' +
                            '                        <i class="fa fa-smile-o" aria-hidden="true"></i>\n' +
                            '                    </button>\n' +
                            '                </div>\n' +
                            '            </div>\n'); 
        //表情按钮
        $(".whisper[data-v-5] .emotion-btn").off("click").on('click', function (e) {
            $(".emoji_container").css("left",e.pageX).css("top",e.pageY-325);
        });
        //选择上传图片按钮触发input
        $(".whisper[data-v-5] .image-upload-btn").off("click").on("click",function(){
            $(this).next().click();
        })
        //重载表情配置
        $(".emoji_container").remove();
        if($(".emoji_container").length<=0){
            $this.find(".textarea").emoji({
                button: ".emotion-btn",
                animation: 'fade',
                showTab: true,
                position:"topRight",
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
                    maxNum: 91,
                    file: ".gif",
                    placeholder: "#qq_{alias}#"
                }]
            });
        }
        loadUploadImageBtn($(".image-upload-btn"));
    }
}

//发送一条聊天消息要处理的事务
function sendMessage($this){
    var cont=$this.parent().prev().find("textarea").val().trim();//获取聊天框内容
    if(cont!=""&&cont!=null){//有内容才可发送
        var newsData=new FormData();
        newsData.append("orderId",$this.attr("data-orderid"));
        newsData.append("content",cont);
        newsData.append("receiveUserId",$this.parent().parent().parent().attr("data-receive"));
        $.ajax({
            url : urlPrefix+"/post/whisper",
            method : 'post',
            xhrFields:{withCredentials:true},
            data:newsData,
            cache: false,
            processData: false,
            contentType: false,
            success : function (result) {
                console.info("发送消息"+result.data.content+"/"+result.data.authorId+"/"+result.data.orderId);
                var $dialog= $this.parent().parent().prev().prev().find(".message-list-content");
                if(result.data!=null && result.code == 200){
                    //添加一条聊天消息
                    $dialog.children().eq(2).append(createNews(result.data))
                    $dialog.scrollTop($dialog[0].scrollHeight);
                    var index=$(".whisper .dialog").index($this.parent().parent().prev().prev().parent());
                    $(".list-item:eq("+index+") .last-word").text(result.data.content);
                    emojiParse();//表情转码
                }else{
                    $dialog.children().eq(2).append(createMessageTip(result.message));
                    $dialog.scrollTop($dialog[0].scrollHeight);
                }
                //清空输入框并获取焦点
                $this.parent().prev().find("textarea").val("").focus();
                //字数清0并改变发送按钮样式
                $this.removeClass("active"); 
                $this.parent().prev().find(".indicator span:eq(0)").text(0);
            }
        });
    }
}

//处理聊天的图片大小
function imageAdaptation($this,imgName){
    //在内存中生成一张图片获取size，赋值给真正的预览框
    $("<img/>").attr("src",messageImageUrl+imgName).load(function() {
        var FitWidth=380;//最大宽度
        var FitHeight=250;//最大高度
        imgWidth=this.width;
        imgHeight=this.height;
        if(imgWidth>FitWidth){//宽度是否超出
            imgHeight=(imgHeight*FitWidth)/imgWidth;//计算比例
            imgWidth=FitWidth;
        }
        if(imgHeight>FitHeight){//高度是否超出
            imgWidth=(imgWidth*FitHeight)/imgHeight;
            imgHeight=FitHeight;
        }
        $(".message-content[data-imgName='"+imgName+"'] .image")
            .attr("src",messageImageUrl+imgName)
            .css({"height":imgHeight,"width":imgWidth});
        if($this!=null){
            $this.scrollTop($this[0].scrollHeight);
        }
    })
}

//创建一条消息HTML
function createNews(obj){
    var str="";
        var itemClass=obj.authorId==userId?"is-me":"not-me";
        var messageClass=obj.imgName=="NULL"||obj.imgName==null?"":"img-padding";
        var faceFile=obj.authorId==userId?userFaceImageUrl+userFace:
            $(".list-item[data-orderid="+obj.orderId+"][data-receive="+obj.authorId+"] .avatar")
                .css("background-image").replace('url("','').replace('")','');
        str='<div class="msg-item ok '+itemClass+'" data-newsId="'+obj.newsId+'">\n' +
'                    <a target="_blank" class="avatar" style="background-image: url('+faceFile+');"></a>'+
'                    <div class="message '+messageClass+'">\n';
        if(obj.imgName=="NULL"){
            str+='   <div class="message-content '+itemClass+' not-img">'
                        +obj.content.replace(/\n/g,"<br/>")+
                    '</div>';
        }else{
            str+='  <div class="message-content '+itemClass+' " data-imgName='+obj.imgName+'>'+
                        '<img class="image" src='+messageImageUrl+obj.imgName+'/>'+
                    '</div>';
        }           
        str+='   </div>\n' +
            '</div>';
    return str;
}

//表情格式转码
function emojiParse(){
    $(".message").removeData("plugin_emojiParse");
    $(".message").emojiParse({
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
            path: emojiUrl+"/qq/",
            file: ".gif",
            placeholder: "#qq_{alias}#"
        }]
    });
}

//socket配置
var socket;
function openSocket(service) {
    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else{
        //实现化WebSocket对象 建立连接
        var socketUrl=urlPrefix+"/websocket/service="+service;
        socketUrl=socketUrl.replace("https","ws").replace("http","ws");
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function() {
            console.log("websocket已打开");
        };
        //收到消息事件
        socket.onmessage = function(msg) {
            var data= eval("(" + msg.data + ")");
            console.info("接收消息"+data.content+"/"+data.authorId+"/"+data.orderId);
            if(data.newsType=="1"){
                var $listItem=$(".list-item[data-orderid="+data.orderId+"]");
                if(Isremind){
                    $listItem.find(".notify-number").addClass("not-remind");
                }
                $listItem.find(".notify-number").text(parseInt($listItem.find(".notify-number").text())+1)
                    .css({"display":"block"});
                $listItem.find(".last-word").text(data.content);
                if($listItem.hasClass("active")){
                    updateNewsState($listItem,data.authorId,data.orderId);
                }
            }
            receiveMessage(data);
            emojiParse();
        };
        //关闭事件
        socket.onclose = function() {
            //$(".dialog .message-list-content").children().eq(2).append(createMessageTip("服务器连接中断了"));
            console.log("websocket已关闭");
        };
        //发生了错误事件
        socket.onerror = function() {
            //$(".dialog .message-list-content").children().eq(2).append(createMessageTip("连接出错了"));
            console.log("websocket发生了错误");
        }
    }
}

function updateNewsState($listItem,authorId,orderId){
    $listItem.find(".notify-number").text("0").css({"display":"none"});
    $.ajax({
        url :  urlPrefix+"/patch/news/newsId",
        method : 'post',
        xhrFields:{withCredentials:true},
        data:{"authorId":authorId,"orderId":orderId},
        success : function (result) {
            if(result.code == 200){
                
            }
        }
    });
}

//接收socket消息判断类型
function receiveMessage(data){
    str="";
    if(data.newsType=="1"){//添加一条聊天消息
        str=createNews(data);
    }else if(data.newsType=="0"){//连接超时的提示消息
        str=createMessageTip(data.content);
        //清除发送图片按钮事件
        // $(".dialog[data-receive="+data.authorId+"][data-orderid="+data.orderId+"] ").children().eq(3)
        //     .children().children().eq(0).children().eq(0).unbind();
        // //清除发送消息按钮事件
        // $(".dialog[data-receive="+data.authorId+"][data-orderid="+data.orderId+"] ").children().eq(3)
        //     .children().eq(2).children().unbind();
    }else if(data.newsType=="2"){//消息发送失败
        $(".msg-item[data-newsId="+data.newsId+"]").removeClass("ok").
            find(".message-content").css({"background":"#e44f40"});
    }else if(data.newsType=="3"){//第一次连接
        str=createMessageTip(data.content);    
        if(data.authorId!="null"){
            $(".dialog .mask").remove();
            $(".input-box textarea").css({"display":"block"});
            loadImageAanEmojiBtn($(".whisper[data-v-5] .dialog:eq(0)"));
            $(".dialog:eq(0) .msg-time").text(getNowDateFormat());
            $(".list-item:eq(0)").attr("data-receive",data.authorId);
            $(".dialog:eq(0)").attr("data-receive",data.authorId);
        }    
    }
    var $dialog=$(".dialog[data-receive="+data.authorId+"][data-orderid="+data.orderId+"] .message-list-content");
    $dialog.children().eq(2).append(str);
    if(data.imgName!=null&&data.imgName!="NULL"&&data.imgName!=""){
        setTimeout(function(){imageAdaptation(null,data.imgName)},3000)
    }
    if(data.newsType=="3"||data.newsType=="0"){
        $dialog.scrollTop($dialog[0].scrollHeight); 
    }    
}

//创建服务器反馈的socket提示消息
function createMessageTip(content){
    str='<div class="msg-tip">' +
        '   <span class="tip">'+content+'</span>' +
        '</div>';
    return str;
}

//发送聊天图片的回调处理
function loadUploadImageBtn($this){
    $('.image-upload').localResizeIMG({
        quality: 0.8,
        success: function (result) {
            imageBase64=result.base64;
            var file=dataBase64toFile(imageBase64,1);
            var newsData=new FormData();
            newsData.append("imageFile",file);
            newsData.append("content","NULL");
            newsData.append("orderId",
                $this.parent().parent().parent().parent().attr("data-orderid"));
            newsData.append("receiveUserId",
                $this.parent().parent().parent().parent().attr("data-receive"));
            $.ajax({
                url :  urlPrefix+"/post/whisper/image",
                method : 'post',
                xhrFields:{withCredentials:true},
                data:newsData,
                cache: false,
                processData: false,
                contentType: false,
                success : function (result) {
                    if(result.data!=null && result.code == 200){
                        var $dialog=$(".dialog[data-receive="+result.data.receiveUserId+"][data-orderid="+result.data.orderId+"] .message-list-content");
                        $dialog.children().eq(2).append(createNews(result.data));
                        imageAdaptation($dialog,result.data.imgName);//处理图片
                    }else{
                        alert(result.message);
                    }
                }
            });
        }
    });
}

//将base64转为file文件
function dataBase64toFile(dataurl, filename) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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