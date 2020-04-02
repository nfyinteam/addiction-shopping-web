var skuId = new Array();
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
        url : 'http://www.88k88.cn/userapi/skuAllInfos',
        method : 'get',
        data : {'skuId' : skuId},
        dataType: "json",
        traditional: true,
        success: function (result) {
            if(result.data == null || result.code != 200){
                location.href = "shop-index.html"
            }
            addInfo(result.data);
        }
    });
}
function isBuyNowWeb() {
    if(getUrlParam('skuId') != null && getUrlParam('skuId') != ""){
        skuId = getUrlParam('skuId').split(",");
        if(skuId[0] == "" || skuId[0] == null){
            location.href = 'shop-index.html';
        }
    }
}
function addInfo(data) {
    $('#sku-info-div').empty();
    var countMoney = 0;
    $.each(data, function (index, skuInfo) {
        var relation = "";
        $.each(skuInfo.skuRelations, function (index2, skuRelation) {
            if(index2 == 0){
                relation = skuRelation.key.keyName + ":" + skuRelation.value.valueName;
            }else{
                relation += "," + skuRelation.key.keyName + ":" + skuRelation.value.valueName;
            }
        })
        $('#sku-info-div').append(
            '<div class="row">' +
            '<div class="col-md-2 buy-good-value">' +
            '<img class="good-img"' +
            'src="http://www.88k88.cn:9090/Server-files/Images/goodsImges/' + skuInfo.imgsInfo.imgFile + '">' +
            '</a>' +
            '</div>' +
            '<div class="col-md-3 buy-good-value">' +
            '<a href="#" style="color: #2a6496;">' +
            '<span>' + skuInfo.skuInfo.good.goodsName + '</span>' +
            '</a>' +
            '</div>' +
            '<div class="col-md-2 buy-good-value">' +
            '<span>' + relation + '</span>' +
            '</div>' +
            '<div class="col-md-1 buy-good-value">' +
            '<span>无</span>' +
            '</div>' +
            '<div class="col-md-1 buy-good-value">' +
            '<span>￥<span>0</span></span>' +
            '</div>' +
            '<div class="col-md-1 buy-good-value">' +
            '<span>默认</span>' +
            '</div>' +
            '<div class="col-md-1 buy-good-value">' +
            '<span>￥<span>' + skuInfo.skuInfo.skuPrice + '</span></span>' +
            '</div>' +
            '</div>' +
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
        countMoney += skuInfo.skuInfo.skuPrice;
    });
    $('#countMoney').text(countMoney);
}