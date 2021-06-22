
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
            table.innerHTML = "<tr><th>序号</th><th>歌曲名</th><th>歌手</th><th>添加时间</th><th>播放</th><th>编辑</th><th>删除</th></tr>";
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

                //为tr标签添加class名称
                $("tr").addClass("hover_tr");

                var del = document.createElement("td");
                del.innerHTML = "<a onclick='edit(this)' class="+ res[i]["id"] +">编辑</a>";
                del.style.cursor = "pointer";
                tr.appendChild(del);

                var edit = document.createElement("td");
                edit.innerHTML = "<a onclick='det(this)' id=" + res[i]["id"] + ">删除</a>";
                edit.style.cursor = "pointer";
                tr.appendChild(edit);
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

