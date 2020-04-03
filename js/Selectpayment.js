$(function(){
    $("#zfb").on('click',function(){
        $('#wx').prop('checked', false); // Unchecks it
        add("www.hao123.com")

    })
    $("#wx").on('click',function(){
        $('#zfb').prop('checked', false); // Unchecks it
        add("www.baidu.com")
    })
    function add(url){
        $("#code").html(function(){
            $("#code").css("visibility","visible");
            $("#inputUrl").val(url)
            var urlTxt = $("#inputUrl").val();
            if (urlTxt.indexOf("http://") < 0) {
                 urlTxt = 'http://' + urlTxt;
            }
            outputQRCod(urlTxt, 200, 200);
        })
        
        
    }
})

$(function () {
    //没有中文就可以这么简单
    $('#code').qrcode("http://dnt.dkill.net");
});

//中文字符处理
function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

//生成二维码
function outputQRCod(txt, width, height) {
    //先清空
    $("#code").empty();
    //中文格式转换
    var str = toUtf8(txt);
    //生成二维码
    $("#code").qrcode({
        render: "table",
        width: width,
        height: height,
        text: str
    })
}
