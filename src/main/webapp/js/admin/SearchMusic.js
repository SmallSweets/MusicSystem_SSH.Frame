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
                        td.innerHTML = "<a href=" + res[i][list[x]] + ">▶</a>";
                        continue;
                    }
                    td.innerText = res[i][list[x]];
                }

                var del = document.createElement("td");
                del.innerHTML = "<a onclick='del(this)' id=" + res[i]["id"] + ">删除</a>";
                tr.appendChild(del);

                var edit = document.createElement("td");
                edit.innerHTML = "<a href='MusicEidt.html'>编辑</a>";
                tr.appendChild(edit);
            }
        },
        error:function (){
            alert("搜索失败");
        }
    });
}