    var sdEditorEmoj = {
        emojiconfig: {
            qq: {
                name: "QQ表情",
                path: "emoji/",
                imgName: ["1.gif", "2.gif", ],
                alias: ["微笑", "伤心", ],
                title: ["[Smile]", "[Grimace]", ],
            },
        },
        emojiRealTimeData: [/*{imgUrl: "",title: "",alias: "",num:"",},*/],
        Init: function (options,element,elid) {
            var isShowImg = true,
                faceDivBox = $('.emotion-box'),
                faceDiv = $('.emotion-box .faceDiv'),
                div = $('#content'),
                isAnimate = false;
            var emojiContainer = faceDiv.find('.emoji-box'),
                emojiconfig = options;
            var div = document.getElementById('content');
        
            if ($(".faceDiv span").length == 0) {
                var num = 0;
                var imgName = '';
                for (var emojilist in emojiconfig) {  //添加emoji标签
                    var maxNum = Object.keys(emojiconfig[emojilist].alias).length - 1;
                    num++;
                    var emclassf = 'em' + num + '-';
                    emojiContainer.append('<section class="for-' + emojilist + '"></section>');
                    faceDiv.find('.emoji-tab').append('<a href="javascript:void(0);" data-target="for-' + emojilist + '">' + emojiconfig[emojilist].name + '</a>');
                    for (var i = 0; i <= maxNum; i++) {
                        imgName = emojiconfig[emojilist].imgName[i];
                        imgName = imgName.substring(0, imgName.length - 4);
                        emclass = emclassf + imgName;
                        if (emojiContainer.find('.for-' + emojilist) !== undefined) {
                            var c = '<a unselectable="on" href="javascript:void(0);" class="embox"><span data-src="'
                                + emojiconfig[emojilist].path + emojiconfig[emojilist].imgName[i] + '" class="em ' + emclass + '" data-alias="'
                                + (emojiconfig[emojilist].alias[i] == undefined ? '' : emojiconfig[emojilist].alias[i]) + '" title="'
                                + (emojiconfig[emojilist].title[i] == undefined ? (emojiconfig[emojilist].empty) : emojiconfig[emojilist].title[i]) + '">' + emojiconfig[emojilist].alias[i] + '</span></a>';
                            emojiContainer.find('.for-' + emojilist).append(c);
                        }
                    }
                }          
            }

            $(".contentBox,.faceDiv").click(function () {
                return false;
            });
        },
        bindClickImg: function (obj) {
            var faceDiv = $('.faceDiv'), div = $('#content');
            //初始化emoji标签选项
            faceDiv.find('.emoji-box section').css("display", "none");
            faceDiv.find('.emoji-tab a').eq(0).addClass("active");
            faceDiv.find('.emoji-box img,.emoji-box .embox').on('click', function () { //选择图片 点击表情
                
                insertText(obj,$(this).find("span").attr("data-alias"));
            });
            faceDiv.find('.emoji-tab a').on('click', function () { //切换表情标签
                div.focus();
                $(this).parent().parent().prev().find('section').hide();
                faceDiv.find('.emoji-box .' + $(this).attr('data-target')).show();
                faceDiv.find('.emoji-tab a').removeClass('active');
                this.className += ' active';
                $(this).parent().parent().parent();
                var faceDivHeight = faceDiv.height(),
                    nowSectionClass = "." + $(this).attr('data-target'),
                    nowSection = $(nowSectionClass),
                    contentHeight = nowSection.height();  //outerHeight()
                if (faceDivHeight < contentHeight) {
                    faceDiv.addClass('isScrolly');
                } else {
                    faceDiv.removeClass('isScrolly');
                }
                return false;
            });
            function insertText(opation,val) {
                //alert(opation.obj.attr("placeholder"));
                var obj = opation.obj;
                var str = val;
                if(opation.type == "input"){
                    if (document.selection) {
                        obj.focus();
                        var sel = document.selection.createRange();
                        sel.text = str;
                    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                        var startPos = obj.selectionStart;
                        var endPos = obj.selectionEnd;
                        var tmpStr = obj.val();
                        obj.val(tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length));
                    } else {
                        obj.insertContent(str) ;
                    }
                    obj.parent().next().find(".send-btn").addClass("active");
                    obj.next().find("span:eq(0)").text(obj.val().length);
                }
            }
        },
        setEmoji: function (obj) {
            
            sdEditorEmoj.bindClickImg(obj);
        },
    };
//在textarea光标追加内容
(function($)  
{  
 $.fn.extend(  
 {  
     insertContent : function(myValue, t)   
     {  
         var $t = $(this)[0];  
         if (document.selection) { // ie  
             this.focus();  
             var sel = document.selection.createRange();  
             sel.text = myValue;  
             this.focus();  
             sel.moveStart('character', -l);  
             var wee = sel.text.length;  
             if (arguments.length == 2) {  
                 var l = $t.value.length;  
                 sel.moveEnd("character", wee + t);  
                 t <= 0 ? sel.moveStart("character", wee - 2 * t  
                         - myValue.length) : sel.moveStart(  
                         "character", wee - t - myValue.length);  
                 sel.select();  
             }  
         } else if ($t.selectionStart  
                 || $t.selectionStart == '0') {  
             var startPos = $t.selectionStart;  
             var endPos = $t.selectionEnd;  
             var scrollTop = $t.scrollTop;  
             $t.value = $t.value.substring(0, startPos)  
                     + myValue  
                     + $t.value.substring(endPos,  
                             $t.value.length);  
             this.focus();  
             $t.selectionStart = startPos + myValue.length;  
             $t.selectionEnd = startPos + myValue.length;  
             $t.scrollTop = scrollTop;  
             if (arguments.length == 2) {  
                 $t.setSelectionRange(startPos - t,  
                         $t.selectionEnd + t);  
                 this.focus();  
             }  
         } else {  
             this.value += myValue;  
             this.focus();  
         }  
     }  
 })  
})(jQuery);  
