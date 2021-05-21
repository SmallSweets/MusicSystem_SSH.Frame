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
                var tr = document.createElement("tr");
                tr.addClass("hover_tr");
                box.appendChild(tr);
                for (var x=0;x < list.length;x++){
                    var td = document.createElement("td");
                    tr.appendChild(td);
                    if (list[x] === "url"){
                        td.innerHTML = "<a href=" + data[i][list[x]] + ">▶</a>";
                        continue;
                    }
                    td.innerText = data[i][list[x]];
                }

                var del = document.createElement("td");
                del.innerHTML = "<a onclick='del(this)' id=" + data[i]["id"] + ">删除</a>";
                tr.appendChild(del);

                var edit = document.createElement("td");
                edit.innerHTML = "<a href='MusicEidt.html'>编辑</a>";
                tr.appendChild(edit);
            }
        },
        error:function(){
            alert("请求失败");
        }
    });
}

function del(obj){
    var id = obj.id;
    $.ajax({
        url:"DeleteMusic",    //请求的url地址
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        type:"GET",   //请求方式
        data:{'id':id},
        success:function(data){
            alert("删除成功");
            location.reload();
        },
        error:function(){
            alert("请求失败");
        }
    });
}