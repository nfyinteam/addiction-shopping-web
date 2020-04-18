var urlPrefix="http://www.88k88.cn/userapi";
//var urlPrefix="http://localhost:8080/userapi";
$(".userName").off("click").on("click",function(){
    window.open('login.html');
})

$.ajax({
    url:urlPrefix+"/get/userInfo",
    method:"get",
    xhrFields:{
        withCredentials:true
    },
    success: function(result){
        if(result.code==200){
            if(result.data != null){
                sessionStorage.setItem("userId",result.data.userId);
                sessionStorage.setItem("userName",result.data.userName);
                sessionStorage.setItem("userFace",result.data.face.faceFile);
                $(".dropdown .userName").text(result.data.userName).off("click").on("click",function(){
                    //window.open('.html');//跳转到用户中心
                });
                $('#user-id').val(result.data.userId);
            }else{
                sessionStorage.setItem("userId","null");
                if($('#is-login').val() != null){
                    if($('#is-login').val() == 1){
                        location.href="login.html";
                    }
                }
            }
        }
    }
  })

//搜索框获取焦点
$(".search-form").find("input").on("focus",function() {
    var $btn=$(".search-form").find(".input-group");
    $btn.append('<div class="search-result"><a>aj111</a></div>').slideDown();
});
//搜索框失去焦点
$(".search-form").find("input").on("blur",function() {
    var $btn=$(".search-form").find(".input-group");
    $btn.find(".search-result").fadeTo("slow", 0.01, function(){//fade
        $(this).slideUp("slow", function() {//slide up
            $(this).remove();//then remove from the DOM
        });
    });
})
