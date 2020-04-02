var urlPrefix="http://localhost:8080/adminapi";
loadPageRegion();

function loadPageRegion(){
    $.ajax({
        url:urlPrefix+"/list_pageRegion",
        method:"get",
        success:function(result){	
            if(result.code==200){
                $.each(result.data,function(i,obj){
                    $(".editable-region").regionContainerHTML(obj);//加载区域
                    $(".region-container[data-prid="+obj.prId+"]")
                        .find(".edit").attr("data-prid",obj.prId);
                });
                var str='<div class="dragging-region"><button type="button" class="btn btn-info delete_region">删除</button></div>';
                $(".region-container").prepend(str);		
                //设置区域拖拽
                sortable('.editable-region',{
                    forcePlaceholderSize: true,
                    placeholderClass: 'ph-class',
                    hoverClass: 'bg-maroon yellow'
                });
                loadDeleteRegion();
                loadRightClickMenu();
            }	
        }
    })
}

//区域拖拽完成事件
var sortstop=1;//防止重复监听
sortable('.editable-region')[0].addEventListener('sortstop', function(e) {
    sortstop++;
    if(sortstop%2==0){
        var regionList=new Array();
        $.each($(".region-container"),function(i,obj){
            var $this=$(this);
            //获取所有区域信息
            regionList.push({"prId":$this.attr("data-prid"),
                            "index":$this.index(".region-container"),
                            "state":"0"})
        })
        console.info(regionList);
        $.ajax({
            url:urlPrefix+"/update_pageRegion",
            method:"post",
            data: JSON.stringify(regionList),
            dataType:"json",  
            contentType : 'application/json;charset=utf-8',  
            success:function(result){
                if(result.code==200){
                    
                }
            }
        })
    }
})	

//日期和时间
$('.datetimepicker').datetimepicker({
    format: 'YYYY-MM-DD hh:mm',
    showClear:true,
    locale: moment.locale('zh-cn')
});

//区域预览按钮事件
var isPreview=true;
$(".preview_region").off("click").on('click',function() {
    if(isPreview){
        isPreview=false;
        $(this).text("取消预览");
        $(".dragging-region").css({"display":"none"});
        $(".region-container").css({"padding-top":"0"})
        $(".region-container").find("div").css({"border":"0"});
        $(".region-container img").css({"border":"0px solid "});
        $(".region-container .edit-label-region *")
            .css({"border":"0px solid","min-height":""});
        $(".edit").removeClass("edit-label-region");
    }else{
        isPreview=true;
        $(this).text("预览");
        $(".dragging-region").css({"display":"block"});
        $(".region-container").css({"padding-top":"20px"})
        $(".region-container>*:not(:first-child)").css({"border":"1px solid #611610"});
        $(".region-container img").css({"border":"1px solid #403336"});
        $(".region-container .edit-label-region *")
            .css({"border":"0px solid","min-height":"14px"});
        $(".edit").addClass("edit-label-region");
    }

})

//提交按钮事件
$(".submit_region").off("click").on('click',function() {
    var regionList=new Array();
    $.each($(".region-container"),function(i,obj){
        var $this=$(this);
        //获取所有区域信息
        regionList.push({"prId":$this.attr("data-prid"),
                        "index":$this.index(".region-container"),
                        "startTime":$(".start_time").val(),
                        "state":"null"})
    })
    console.info(regionList);
    if(regionList[0].startTime==""){
        if(confirm("没有选择时间是否直接发布")){
            submitRegion(regionList);
        }
    }else{
        submitRegion(regionList);
    }
})

function submitRegion(regionList){
    $.ajax({
        url:urlPrefix+"/submit_pageRegion",
        method:"post",
        data: JSON.stringify(regionList),
        dataType:"json",  
        contentType : 'application/json;charset=utf-8',  
        success:function(result){
            if(result.code==200){
                alert(result.message);
            }
        }
    })
}

//添加新区域
$(".add_region").off("change").on('change',function() {
    var $this=$(this);
    var region_sign="",editNumber=0,index;
    if($(".add_region option:selected").val()=="data-v-1"){
        editNumber=23;//设置可编辑数
        region_sign=$(".add_region option:selected").val();//区域标识
    }else if($(".add_region option:selected").val()=="data-v-2"){
        editNumber=24;
        region_sign=$(".add_region option:selected").val();
    }else if($(".add_region option:selected").val()=="data-v-3"){
        editNumber=14;
        region_sign=$(".add_region option:selected").val();
    }else if($(".add_region option:selected").val()=="data-v-4"){
        editNumber=20;
        region_sign=$(".add_region option:selected").val();
    }else if($(".add_region option:selected").val()=="data-v-5"){
        editNumber=47;
        region_sign=$(".add_region option:selected").val();
    }else if($(".add_region option:selected").val()=="data-v-6"){
        editNumber=22;
        region_sign=$(".add_region option:selected").val();
    }else if($(".add_region option:selected").val()=="data-v-7"){
        editNumber=5;
        region_sign=$(".add_region option:selected").val();
    }else if($(".add_region option:selected").val()=="data-v-8"){
        editNumber=8;
        region_sign=$(".add_region option:selected").val();
    }
    index=($(".editable-region").children().length);//获取顺序
    if(region_sign!=""){
        $.ajax({
            url:urlPrefix+"/add_pageRegion/"+region_sign+"/"+index+"/"+editNumber,
            method:"post",
            success:function(result){
                if(result.code==200){
                    $this.val("");//清空单选值				
                    //加载区域
                    $(".editable-region").regionContainerHTML(result.data);
                    $("html").scrollTop($("html")[0].scrollHeight);//滚动条置底
                    $(".region-container[data-prid="+result.data.prId+"]")
                        .find(".edit").attr("data-prid",result.data.prId);
                    sortable('.editable-region');
                    var str='<div class="dragging-region"><button type="button" class="btn btn-info delete_region">删除</button></div>';
                    $(".region-container[data-prid="+result.data.prId+"]").prepend(str);		
                    loadDeleteRegion();
                    loadRightClickMenu();
                }
            }
        })
    }
})	

//删除区域事件
function loadDeleteRegion(){
    $(".delete_region").off("click").on("click",function(){
        var $btn=$(this);
        //删除被删除区域的class并隐藏获取编号
        var prId=$btn.parent().parent().removeClass().css({"display":"none"}).attr("data-prid");
        var regionList=new Array();
        $.each($(".region-container"),function(i,obj){
            var $this=$(this);
            if(prId!=$this.attr("data-prid")){//更新区域的index
                regionList.push({"prId":$this.attr("data-prid"),
                        "index":$this.index(".region-container"),
                        "state":"0"})
            }
        })
        regionList.push({"prId":prId,//要删除的区域
                        "index":"null",
                        "state":"null"})
        console.info(regionList);
        $.ajax({
            url:urlPrefix+"/delete_pageRegionByState",
            method:"post",
            data: JSON.stringify(regionList), 
            dataType:"json",  
            contentType :'application/json;charset=utf-8',  
            success:function(result){
                if(result.code==200){
                    $btn.parent().parent().remove();
                    sortable('.editable-region');
                }
            }
        })
    })
}

//加载所有右键
function loadRightClickMenu(){
    //轮播图
    $('.flexslider').flexslider({
        easing:"swing",
        animation: "slide", //转换方式 fade淡入淡出 slide滚动
        slideshowSpeed: 5000, //停留时间
    });
    $(".flexslider").find(".clone .img")
        .removeClass("edit edit-img-region").find("img").removeClass("edit")
    //按钮
    $('.edit-btn-region').contextMenu('btn_menu', {
        bindings:
            {
                'item_1': function(t) {
                    $("#modal_btn").modal("show");
                    $("#modal_btn  .info").val($(t).find(".edit").text());
                    $("#modal_btn  .link").val($(t).parent().attr("href"));
                    btnEditableBtnOK(t);
                }
            }
    })
    //标签
    $('.edit-label-region').contextMenu('btn_menu', {
        bindings:
            {
                'item_1': function(t) {
                    $("#modal_label .table .info_tr").remove();
                    $("#modal_label .table .link").val($(t).parent().attr("href"));
                    //根据标题数量增加input框
                    for(var i=1;i<=$(t).children().length;i++){
                        $("#modal_label .table")
                        .append ('<tr class="info_tr">' +
                                    '<td><label class="control-label">内容'+i+'</label></td>\n' +
                                    '<td><input name="info_'+i+'" type="text" class="info_'+i+' form-control" value="'+$(t).find(":eq("+(i-1)+")").html()+'"></td>' +
                                '</tr>');
                    }
                    $("#modal_label").modal("show");
                    labelEditableBtnOK(t);
                }
            }
    })
    //图片
    $('.edit-img-region').contextMenu('image_menu', {
        bindings:
            {
                'item_1': function(t) {
                    $(".modal_imgae").modal("show");
                    $(".modal_imgae .link").val($(t).attr("href"));
                    var file=$(t).find("img").attr("src");
                    $(".modal_imgae").find(".image").remove();
                    $(".modal_imgae").find(".upload-image").before(
                        '<img src="'+file+'" class="image" style="max-width: 400px;max-height: 300px;">');
                    var prId="",index="",link="";
                    $("#modal_imgae .OK").off("click").on("click",function(){
                        prId=$(t).attr("data-prId");
                        index=$(t).index(".region-container[data-prid="+prId+"] .edit");					
                        link=$(".modal_imgae .link").val();
                        updateEditRegionImage($(t),prId,index,link);
                    })	
                }
            }
    })

}

//图片上传
var imageBase64="";
$('.upload-image').localResizeIMG({
    quality: 1,
    success: function (result) {
        imageBase64=result.base64;
        $(".modal_imgae .image").attr("src",imageBase64);
    }
});

//标签确认事件
function labelEditableBtnOK(btn){
    $("#modal_label .OK").off("click").on("click",function(){
        var infoList=new Array();//保存临时编辑
        var $btn=$(btn);
        var prid=$btn.attr("data-prid");
        var $modal=$("#modal_label");
        infoList.push({"prId":prid,
                    "index":$btn.index(".region-container[data-prid="+prid+"] .edit"),
                    "info":$modal.find(".color").val(),"state":"0"});
        $btn.attr("class",$btn.attr("data-class")+" "+$modal.find(".color").val());
        infoList.push({"prId":prid,
                        "index":$btn.parent().index(".region-container[data-prid="+prid+"] .edit"),
                        "info":$modal.find(".link").val(),"state":"0"});
        $btn.parent().attr("href",$modal.find(".link").val());
        for(var i=0;i<$btn.children().length;i++){
            var info=$modal.find(".info_"+(i+1)).val();
            infoList.push({"prId":prid,
                        "index":$btn.find(":eq("+i+")")
                            .index(".region-container[data-prid="+prid+"] .edit"),
                        "info":info,"state":"0"});
            $btn.find(":eq("+i+")").text(info);
        }
        updateEditRegionInfo(infoList);
        $("#modal_label").modal("hide");
        $(".modal_label_from")[0].reset();	
    });
}

//按钮确认事件
function btnEditableBtnOK(btn){
    $("#modal_btn .OK").off("click").on("click",function(){
        var infoList=new Array();//保存临时编辑
        var $btn=$(btn);
        var prid=$btn.attr("data-prid");
        var $modal=$("#modal_btn");
        infoList.push({"prId":prid,
                    "index":$btn.parent().index(".region-container[data-prid="+prid+"] .edit"),
                    "info":$modal.find(".link").val(),"state":"0"});
        $btn.parent().attr("href",$modal.find(".link").val());
        var info=$modal.find(".info").val();
        infoList.push({"prId":prid,
                    "index":$btn.find(".edit").index(".region-container[data-prid="+prid+"] .edit"),
                    "info":info,"state":"0"});
        $btn.find(".edit").text(info);
        infoList.push({"prId":prid,
                    "index":$btn.parent().parent().index(".region-container[data-prid="+prid+"] .edit"),
                    "info":$modal.find(".position").val(),"state":"0"});
        $btn.parent().parent().attr("class",$btn.parent().parent()
            .attr("data-class")+" "+$modal.find(".position").val());
        infoList.push({"prId":prid,
                    "index":$btn.index(".region-container[data-prid="+prid+"] .edit"),
                    "info":$modal.find(".background").val(),"state":"0"});
        $btn.attr("class",$btn.attr("data-class")+" "+$modal.find(".background").val());
        updateEditRegionInfo(infoList);
        $("#modal_btn").modal("hide");
        $(".modal_btn_from")[0].reset();
    });
}

//修改区域内容
function updateEditRegionInfo(infoList){
    console.info(infoList);
    $.ajax({
        url:urlPrefix+"/update_editInfo",
        method:"post",
        data: JSON.stringify(infoList),//将对象序列化成JSON字符串  
        dataType:"json",  
        contentType : 'application/json;charset=utf-8', //设置请求头信息  
        success:function(result){	
            $("#modal_imgae").modal("hide");
        }
    })
}

//修改区域图片
function updateEditRegionImage($img,prId,index,link){
    if(imageBase64!=""){//判断是否上传了图片
        var file=dataBase64toFile(imageBase64,index);
        var data=new FormData();
        data.append("prId",prId);
        data.append("index",index);
        data.append("link",link);
        data.append("state","0");
        data.append("file",file);
        $.ajax({
            url:urlPrefix+"/update_editImage",
            method:"post",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success:function(result){
                $img.attr("href",link);
                if($img.find("img").length>0){
                    $img.find("img").attr("src",imageBase64).css({"border":"0"});	
                }
                $("#modal_imgae").modal("hide");
            }
        })
    }else{
        $img.attr("href",link);
        var infoList=new Array();//保存临时编辑
        infoList.push({"prId":prId,
                    "index":index,"info":link,"state":"0"});
        updateEditRegionInfo(infoList);
    }
}

//选择上传图片按钮触发input
$(".modal_imgae_from .upload").off("click").on("click",function(){
    $(".modal_imgae_from input").click();
})

//表单序列化成json
$.fn.serializeJson=function(){
    var serializeObj={};
    var array=this.serializeArray();
    var str=this.serialize();
    $(array).each(function(){
      if(serializeObj[this.name]){
        if($.isArray(serializeObj[this.name])){
          serializeObj[this.name].push(this.value);
        }else{
          serializeObj[this.name]=[serializeObj[this.name],this.value];
        }
      }else{
        serializeObj[this.name]=this.value;
      }
    });
    return serializeObj;
  };

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