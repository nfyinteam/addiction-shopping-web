var urlPrefix="http://www.88k88.cn/userapi";
var orderId = "";
$(function(){
    stepBar.init("stepBar", {
        step : 1,
        change : true,
        animation : true
    });
});
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
$(function () {
    init();
});
function init() {
    isBuyNowWeb();
    $.ajax({
        url : urlPrefix + '/get/order',
        method : 'get',
        data : 'orderId=' + orderId,
        success: function (result) {
            if(result.data == null || result.code != 200){
                //location.href = "shop-index.html"
            }
            addInfo(result.data);
        }
    });
}
function isBuyNowWeb() {
    if(getUrlParam('orderId') != null && getUrlParam('orderId') != ""){
        orderId = getUrlParam('orderId');
        if(orderId == "" || orderId == null){
            location.href = 'shop-index.html';
        }
    }
}
var orderId = "";
function addInfo(data) {
    $('#sku-info-div').empty();
    var orderId = data.orderId;
    var ouserId = data.buyUser.userId;
    checkLogin(ouserId);
    $.each(data.orderDetails, function (index, details) {
        $('#sku-info-div').append(
            '<div class="row">' +
            '<div class="col-md-2 buy-good-value">' +
            '<img class="good-img"' +
            'src="http://www.88k88.cn:9090/Server-files/Images/goodsImges/' + details.goodsFile + '">' +
            '</a>' +
            '</div>' +
            '<div class="col-md-3 buy-good-value">' +
            '<a href="shop-item.html?goodId='+ details.goodsId +'" style="color: #2a6496;">' +
            '<span>' + details.goodsName + '</span>' +
            '</a>' +
            '</div>' +
            '<div class="col-md-1 buy-good-value">' +
            '<span>' + details.skuAttribute + '</span>' +
            '</div>' +
            '<div class="col-md-1 buy-good-value">' +
            '<span>' + details.skuNum + '</span>' +
            '</div>' +
            '<div class="col-md-1 buy-good-value">' +
            '<span>￥<span>' + details.skuPrice + '</span></span>' +
            '</div>' +
            '<div class="col-md-2 buy-good-value">' +
            '<span>快递配送：运费￥0.00</span>' +
            '</div>' +
            '<div class="col-md-1 buy-good-value">' +
            '<span>￥<span>' + details.skuPrice * details.skuNum + '</span></span>' +
            '</div>' +
            '</div>'
        );
    });
    $('#sku-info-div').append(
        '<div class="row" style="border-bottom: 1px solid #e5e9ef;text-align: left;">' +
        '<div class="col-md-3">' +
        '<textarea type="text" style="width: 100%;height: 100px;resize: none;" placeholder="买家留言"></textarea>' +
        '</div>' +
        '<div class="col-md-1" style="margin-top: 6%;">' +
        '<p>' +
        '<span>0</span>/' +
        '<span>200</span>字' +
        '</p>' +
        '</div>' +
        '</div>'
    );
    showTime(data.createTime);
    $('#countMoney').text(data.buyPrice);
}
function showTime(createTime) {
    var c = new Date(createTime.replace('-', '/'));
    var result = timeCount(c);
    setInterval(time(result), 1000);
}

function timeCount(enddate) {
    var date = new Date().getTime() - enddate;
    var days    = date / 1000 / 60 / 60 / 24;
    var daysRound   = Math.floor(days);
    var hours    = date/ 1000 / 60 / 60 - (24 * daysRound);
    var hoursRound   = Math.floor(hours);
    var minutes   = date / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
    var minutesRound  = Math.floor(minutes);
    var seconds   = date/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    var secondsRound  = Math.floor(seconds);
    var time = "倒计时"+(daysRound+"天"+hoursRound +"时"+minutesRound+"分"+secondsRound+"秒");
    var bool = true;
    if(daysRound != 0){
        if(hoursRound != 0){
            if (minutesRound <= 10){
                if(minutesRound < 9){
                    bool = true;
                }else if(minutesRound == 10 && secondsRound == 0){
                    bool = true;
                }else{
                    bool = false;
                }
            }else{
                bool = false;
            }
        }else{
            bool = false;
        }
    }else{
        bool = false;
    }
    if(bool){
        var minu = 10 - minutesRound;
        if(secondsRound != 0 && minutesRound != 10){
            minu = minu - 1;
        }
        var second = 60 - secondsRound;
        time = "剩余" + minu + "分" + second + '秒';
    }else{
        time = null;
    }
    return time
}

function getTime() {
    var data = new Date();
    var year = data.getFullYear();  //获取年
    var month = data.getMonth() + 1;    //获取月
    var day = data.getDate(); //获取日
    var hours = data.getHours();
    var minutes = data.getMinutes();
    var seconds = data.getSeconds();
    time = year + "-" + month + "-" + day + "-" + " " + hours + ":" + minutes + ":" + seconds;
    return time
}

function checkLogin(ouserId) {
    var userId = $('#user-id').val();
    if(userId != ouserId){
        location.href = "login.html";
    }
}

function time(createTime) {
    if(createTime == null){

    }else{

    }
}