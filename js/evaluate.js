var picArr = new Array();//保存图片文件
//上传图片按钮
$('.uploader-holder .upload-img-box .file-input').localResizeIMG({
  quality: 0.9, // 压缩参数 1 不压缩 越小清晰度越低
  success: function (result) {
    if(picArr.length<5){//小于5张
      var str ='<li class="upload-img-box">'+
                '<div class="picli">'+
                  '<img src='+result.base64+'> '+
                '</div>'+
                '<div class="st-success"></div>'+
                '<div class="tm-review-iconfont">'+
                  '<i class="fa fa-times" aria-hidden="true"></i>'+
                '</div>'+
                //'<input type="file" class="img" name="file" value="'+result.base64+'"/>'+
              '</li>';
      $('.uploader-holder .upload-queue').append(str);
      //将转换好的file存储起来
      picArr[picArr.length] =dataURLtoFile(result.base64,picArr.length);
      //更新图片数
      $(".uploader-holder .up-tips span:eq(0)").text($(".upload-queue li").length);
      //删除按钮点击事件
      $(".upload-img-box .tm-review-iconfont").off("click").on("click",function(){
        var $this=$(this);
        picArr.splice($this.parent().index(),1);//移除对应图片文件
        $this.parent().remove();
        $(".uploader-holder .up-tips span:eq(0)").text($(".upload-queue li").length);
      });
    }
  }
});

//将base64转为file文件
function dataURLtoFile(dataurl, filename) {
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

loadSubmitEvaluateBtn();
//提交评价按钮
function loadSubmitEvaluateBtn(){
  $("#submit_evaluate").off("click").one("click",function(){
    var uploadForm=new FormData($(".upload-form")[0]);//
    for(var i=0;i<picArr.length;i++){
      uploadForm.append("imageFile",picArr[i]);
    }
    uploadForm.append("orderId","");//订单编号
    uploadForm.append("comScore",$(".upload-form .rateit-range").attr("aria-valuenow"));
    $.ajax({
      url:urlPrefix+"/add_buyShow",
      method:"post",
      data:uploadForm,
      cache: false,
      processData: false,
      contentType: false,
      success:function(result){
        if(result.code==200){
          picArr=new Array();//清空之前的数据
          $("#evaluate_modal").modal("hide");
        }
      }
    })
  })
}

//评价输入框监听事件
$(".text-input-box textarea").bind("input propertychange",function(){
    var $this=$(this);
    if($this.val().trim()!=""){//有内容则计算字数并改变发送按钮样式
        $this.next().find("span:eq(0)").text($this.val().length);
    }else{
        $this.next().find("span:eq(0)").text(0);
    }
});