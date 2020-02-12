$(function (){
    //获取DOM元素
    var $message = $('.nav-middle>.info'),
        $btnSend = $('.send'),
        $infoText = $('.infoText'),
        $infoTime = $('.infoTime'),
        $like = $('.like'),
        $dislike = $('.dislike'),
        $messageLists = $('.messageLists'),
        likes = 0,
        dislikes = 0;
    //监听内容是否为空
    $message.on('propertychange input',function (){
        $text = $(this).val();
        // console.log($(this).val().length);
        // 有内容则让按钮可点
        if($(this).val().length > 0){
            $btnSend.prop('disabled',false);
            // console.log($btnSend.prop('disabled'))
        }else{
            // 无内容则让按钮不可点
            $btnSend.prop('disabled',true)
            // console.log($btnSend.prop('disabled'))
        }
    })
    //动态创建微博信息条目
    function createDom(text,time){
        var $weibo = $('<div class="weibo">\
                <p class="infoText">' + text + '</p>\
                <p class="infoOption">\
                    <span class="infoTime">' + time+ '</span>\
                    <span>\
                        <a href="javascrip:;" class="like">0</a>\
                        <a href="javascrip:;" class="dislike">0</a>\
                        <a href="javascrip:;" class="del">删除</a>\
                    </span>\
                </p>\
            </div>')
        return $weibo;
    }
    // 点击发布按钮将创建的微博插入到页面中去
    $btnSend.click(function (){
         //获取动态发布内容的时间信息存到数组里
         //2018-04-12 21:30
        var date = new Date();
        var year = date.getFullYear() + '-',
            month = date.getMonth() + 1 + '-',
            day = date.getDate(),
            hour = date.getHours() + ':',
            minute = date.getMinutes() + ':',
            second = date.getSeconds();
        if(parseInt(month) < 10){
            month =  '0' + month;
        }
        if(second < 10){
            second = '0' + second;
        }
        if(parseInt(minute) < 10){
            minute = '0' + minute;
        }
        var arr = [year,month,day,' ',hour,minute,second];
        var time = arr.join('');
        var res = createDom($text,time);
        $messageLists.prepend(res);
    })

    $('body').on('click','.like',function (){
        likes ++;
        $(this).html(likes);
    })

    $('body').on('click','.dislike',function (){
        dislikes ++;
        $(this).html(dislikes);
    })
    $('body').on('click','.del',function (){
        console.log($(this).parents('.weibo'))
        $(this).parents('.weibo').remove('.weibo')
    })
})