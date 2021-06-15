var list = ["id","name","singer","time","url"];


function ShowAllMusic(){
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

                var del = document.createElement("td");
                del.innerHTML = "<a onclick='del(this)' id=" + data[i]["id"] + ">删除</a>";
                tr.appendChild(del);

                var edit = document.createElement("td");
                edit.innerHTML = "<a onclick='edit(this)' class="+ data[i]["id"] +">编辑</a>";
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
        success:function(){
            alert("删除成功");
            location.reload();
        },
        error:function(){
            alert("请求失败");
        }
    });
}

// 点击 "编辑" 执行的事件
function edit(obj){
    var id = obj.getAttribute("class");
    $.ajax({
        url:"SearchMusic",
        async:true,
        type:"GET",
        dataType: "json",
        data:{'info':id},
        success:function (data){
            var form = $("#changeEdit");
            var div = $("#editInfo");
            // 提交 重置 取消 按钮
            var submit = document.createElement("button");
            var reset = document.createElement("button");
            var cancel = document.createElement("button");
            div.css("display","block");
            for (var i=0;i < list.length;i++){
                var input = document.createElement("input");
                var label = document.createElement("label");
                form.append(label);
                if (i == 0){
                    label.innerText = "序号：";
                }else if(i == 1){
                    label.innerText = "歌曲名：";
                }else if(i == 2){
                    label.innerText = "歌手：";
                }else if (i == 3){
                    label.innerText = "添加事件：";
                }else {
                    label.innerText = "播放地址：";
                }
                input.value = data[0][list[i]];
                form.append(input);
                form.append(document.createElement("br"));
            }
            submit.innerText = "更新";
            reset.innerText = "重置";
            cancel.innerText = "取消";
            cancel.className = "cancel";
            // 点击取消按钮 设置div不可见
            cancel.click(function (){div.css("display","none")});
            reset.type = "reset";
            form.append(submit);
            form.append(reset);
            form.append(cancel);
        }
    })
    alert(id);
}