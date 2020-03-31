var goodId;
var goodInfo;
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
        url : 'http://www.88k88.cn/userapi/goodsAllInfo/' + goodId,
        method : 'get',
        success : function (result) {
            if(result.data.goodsInfo == null){
                location.href = 'shop-index.html';
            }
            goodInfo = result.data;
            addInfo(goodInfo);
            addButton();
        }
    });
}
function addButton() {
    $('.goods-type-select').on('click', function () {
        $('.goods-type-selected').attr('class', 'goods-type-select');
        $(this).attr('class', 'goods-type-selected');
        var value = $(this).find("input[name='skuPrice']").val();
        var keyValue = $(this).text();
        $('#good_price').text(value);
        $('#sku-skuStock').text($(this).find("input[name='skuStock']").val());
        for (var i = 0; i < $('.goods-type-selected').length; i++){
            var test = $('.goods-type-selected').slice(i,i + 1).text();
            if(i == 0){
                $('.goods-selected-p').text("已选" + $('.goods-type-selected').slice(i,i + 1).parent().parent().prev().text() + ":" + test);
            }else{
                $('.goods-selected-p').append("，已选" + $('.goods-type-selected').slice(i,i + 1).parent().parent().prev().text() + ":" + test);
            }
        }
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
                    '</div>' +
                    '</li>';
            }else{
                goodType += '<li>' +
                    '<div class="goods-type-select">' + value.valueName +
                    '<input type="hidden" name="skuStock" value="' + value.skuInfo.skuStock + '"/>' +
                    '<input type="hidden" name="skuPrice" value="' + value.skuInfo.skuPrice + '"/>' +
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
                '<img src="http://www.88k88.cn:9090/Server-files/Images/goodsImges/' +
                goodsImg.img.imgFile + '" class="img-responsive"' +
                'data-BigImgsrc = "http://www.88k88.cn:9090/Server-files/Images/goodsImges/' + goodsImg.img.imgFile + '">'
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
}