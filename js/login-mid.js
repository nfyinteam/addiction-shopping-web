var urlPrefix2="http://www.88k88.cn/userapi";
$(function () {
    login();
});
function login() {
    $('#btn-submit-login').on('click',function () {
        $.ajax({
            url: urlPrefix2 + "/user/login",
            method: "post",
            data: $('#login-form').serialize(),
            xhrFields:{
                withCredentials:true
            },
            success: function (result) {
                if(result.code==200){
                    window.location.reload();
                }else{
                    alert(result.message);
                }
            }
        });
    });
}