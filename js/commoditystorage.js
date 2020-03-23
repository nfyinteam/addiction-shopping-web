//菜单形式
    $('.menus1 li').each(function(){
        var flag = 0;
        var i = 0;
        $('.menus1 li').mouseover(function(){
            var index = $(this).index();
            $('.menus1 .bg').css('left',(index-1)*150+'px');
            $('.menus1 li').css('color','#000');
            $(this).css('color','#fff');
            $('.menus1 li').click(function(){
                $('.menus1 .bg').css('left',(index-1)*150+'px');
                flag = (index-1)*150;
                i=$(this).index()-1;
                $(this).css('color','#fff');
            })
            $('.menus1 li').mouseout(function(){
                $('.menus1 .bg').css('left',flag+'px');
                $('.menus1 li').css('color','#000');
                $('.menus1 li').eq(i).css('color','#fff');
            });
        });
    })


