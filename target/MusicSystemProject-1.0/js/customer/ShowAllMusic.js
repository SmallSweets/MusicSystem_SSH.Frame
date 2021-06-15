// 动态生成并加载数据和标签到页面
function ShowAllMusic(){
    var list = ["id","name","singer","time","url"];
    $.ajax({
        url:"ShowAllMusic",    //请求的url地址
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        type:"GET",   //请求方式
        //接收到的是一个json数组
        success:function(data){
            for (var i=0;i < data.length;i++){
                var box = document.getElementById("box");
                //创建tr标签
                var tr = document.createElement("tr");
                //将tr标签添加到table标签中
                box.appendChild(tr);
                for (var x=0;x < list.length;x++){
                    //创建td标签
                    var td = document.createElement("td");
                    //将td标签添加到tr标签中
                    tr.appendChild(td);
                    //在td标签中写入内容
                    if (list[x] === "url"){
                        td.innerHTML = "<span class='playBtn' style='display: none'>▶</span><audio src=" + data[i][list[x]] + "></audio>";
                        continue;
                    }
                    td.innerText = data[i][list[x]];
                }
                //为tr标签添加class名称
                $("tr").addClass("hover_tr");
            }
        },
        error:function(){
            alert("请求失败");
        }
    });
}


// 设置鼠标滑过音乐列表时，改变音乐列表的背景
function tr_hover(){
    $(".hover_tr").mouseenter(function () {
        $(this).css("background-color","#add8e650");
        //滑过br标签时显示播放按钮
        $(this).children().eq(-1).children(".playBtn").show();
    }).mouseleave(function (){
        $(this).css("background-color","#ffffff");
        //隐藏按钮
        $(this).children().eq(-1).children(".playBtn").hide();
        //显示按钮
        $(this).children().eq(-1).children("#show").show();
    });
}

// 为点击按钮绑定事件
function music_play(){
    // 获取所有audios
    var audios = $("audio");

    // 暂停函数
    function pauseAll() {
        var self = this;
        [].forEach.call(audios, function (i) {
            // 将audios中其他的audio全部暂停
            i !== self && i.pause();
        })
    }

    // 给play事件绑定暂停函数
    [].forEach.call(audios, function (i) {
        i.addEventListener("play", pauseAll.bind(i));
    })

    $(".playBtn").on("click",function() {
        //$(this).next()获取到的是jQuery对象，play()和pause()是dom对象方法，所以要先将jQuery对象转换为dom对象
        var audio = $(this).next()[0];
        if (audio.paused){
            audio.play();
            $(this).text("⏸");
            $(this).show();
            $(this).attr("id","show");
            var playBtn = $(".playBtn");
            //为除当前标签以外的标签添加事件
            //为除当前标签以外的类名为playBtn的标签绑定事件
            playBtn.not($(this)).text("▶");
            playBtn.not($(this)).hide();
            playBtn.not($(this)).removeAttr("id");
        }else {
            audio.pause();
            $(this).text("▶");
            $(this).hide();
            //移除属性，query对象方法
            $(this).removeAttr("id");
        }
    })
}