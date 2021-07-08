function find(){
    var list = ["id","name","singer","time","url"];
    var info = document.getElementById("inputFra").value;
    $.ajax({
        url:"SearchMusic",
        type:"GET",
        dataType:"json",
        async:true,
        data:{"info":info},
        success:function (res){
            var table = document.getElementById("box");
            table.innerHTML = "<tr><th>序号</th><th>歌曲名</th><th>歌手</th><th>添加时间</th><th>播放地址</th></tr>";
            for (var i = 0;i < res.length;i++){
                var tr = document.createElement("tr");
                table.appendChild(tr);
                for (var x = 0;x < list.length;x++){
                    var td = document.createElement("td");
                    tr.appendChild(td);
                    if (list[x] === "url"){
                        td.innerHTML = "<span class='playBtn' style='display: none'>▶</span><audio src=" + res[i][list[x]] + "></audio>";
                        td.style.cursor = "pointer";
                        continue;
                    }
                    td.innerText = res[i][list[x]];
                }
                $("tr").addClass("hover_tr");
            }

            //因为标签加载需要时间，所以这里等待标签加载完再添加事件
            setTimeout("tr_hover()",500);
            //添加 音乐点击播放事件
            setTimeout("music_play()",1000);

        },
        error:function (){
            alert("搜索失败");
        }
    });
}

// 设置鼠标滑过音乐列表时，改变音乐列表的背景
function tr_hover(){
    $(".hover_tr").mouseenter(function () {
        $(this).css("background-color","#add8e650");
    }).mouseleave(function (){
        $(this).css("background-color","#ffffff");
    });
}