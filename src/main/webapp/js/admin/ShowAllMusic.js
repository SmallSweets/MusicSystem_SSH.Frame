var list = ["id","name","singer","time","url"];

//显示所有音乐信息
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
                        td.style.cursor = "pointer";
                        continue;
                    }
                    td.innerText = data[i][list[x]];
                }

                //为tr标签添加class名称
                $("tr").addClass("hover_tr");

                var edit = document.createElement("td");
                edit.innerHTML = "<a onclick='edit(this)' class="+ data[i]["id"] +">编辑</a>";
                edit.style.cursor = "pointer";
                tr.appendChild(edit);

                var del = document.createElement("td");
                del.innerHTML = "<a onclick='det(this)' id=" + data[i]["id"] + ">删除</a>";
                del.style.cursor = "pointer";
                tr.appendChild(del);

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
        $(this).children().eq(-3).children(".playBtn").show();
    }).mouseleave(function (){
        $(this).css("background-color","#ffffff");
        //隐藏按钮
        $(this).children().eq(-3).children(".playBtn").hide();
        //显示按钮
        $(this).children().eq(-3).children("#show").show();
    });
}

// 删除按钮事件
function det(obj){
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
                var span = document.createElement("span");
                if (i == 0){
                    span.innerText = "序号：";
                    input.readOnly = "readonly";
                    input.name = "music.id";
                }else if(i == 1){
                    span.innerText = "歌曲名：";
                    input.name = "music.name";
                }else if(i == 2){
                    span.innerText = "歌手：";
                    input.name = "music.singer";
                }else if (i == 3){
                    span.innerText = "添加时间：";
                    input.name = "music.time";
                }else {
                    span.innerText = "播放地址：";
                    input.name = "music.url";
                }
                form.append(span);
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
            submit.type = "submit";
            submit.onclick = updateInfo;
            reset.type = "reset";
            form.append(submit);
            form.append(reset);
            form.append(cancel);
        }
    })
}

//更新音乐信息
function updateInfo() {
    $.ajax({
        url:"EditMusicInfo",
        async:true,
        type:"GET",
        data:$('#changeEdit').serialize(),
        success:function (){
            alert("更新成功");
        },
        error:function (){
            alert("更新失败");
        }
    });
}