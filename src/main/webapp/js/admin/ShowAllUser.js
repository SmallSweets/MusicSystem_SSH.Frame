var list = ["id","name","password","sex","age","address","phone","vip"]

function Show(){
    $.ajax({
        url:"AllUser",
        async:true,
        type:"GET",
        dataType:"json",
        success:function (rep){
            for (var i = 0;i < rep.length;i++){
                var table = document.getElementById("box");
                var tr = document.createElement("tr");
                table.appendChild(tr);
                for (var x = 0;x < list.length;x++){
                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerText = rep[i][list[x]];
                }

                var edit = document.createElement("td");
                tr.appendChild(edit);
                edit.innerText = "编辑";
                edit.style.cursor = "pointer";
                edit.className = rep[i]["id"];
                edit.onclick = showEditDiv;

                var del = document.createElement("td");
                tr.appendChild(del);
                del.innerText = "删除";
                del.style.cursor = "pointer";
                del.id = rep[i]["id"];
                del.onclick = det;
            }
        },
        error:function (){
            alert("显示错误");
        }
    });
}

// 编辑 用户信息
function showEditDiv() {
    var div = $("#editInfo");
    var id = this.getAttribute("class");
    div.css("display","block");
    $.ajax({
        url:"SearchUser",
        async:true,
        data: {'input':id},
        dataType: "json",
        type:"GET",
        success:function (data){
            var form = document.getElementById("changeEdit");
            var submit = document.createElement("button");
            var reset = document.createElement("button")
            var cancel = document.createElement("button");
            div.append(form);
            for (var i = 0;i < list.length;i++){
                var input = document.createElement("input");
                var span = document.createElement("span");
                if (i == 0){
                    span.innerText = "序号：";
                    input.readOnly = "readonly";
                    input.name = "user.id";
                }else if(i == 1){
                    span.innerText = "用户名：";
                    input.name = "user.name";
                }else if(i == 2){
                    span.innerText = "密码：";
                    input.name = "user.password";
                }else if (i == 3){
                    span.innerText = "性别：";
                    input.name = "user.sex";
                }else if (i == 4){
                    span.innerText = "年龄：";
                    input.name = "user.age";
                }else if (i == 5){
                    span.innerText = "住址：";
                    input.name = "user.address";
                }else if (i == 6){
                    span.innerText = "电话：";
                    input.name = "user.phone";
                }else {
                    span.innerText = "是否会员：";
                    input.name = "user.vip";
                }
                form.appendChild(span);
                form.appendChild(input);
                form.appendChild(document.createElement("br"));
                input.value = data[0][list[i]];
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

// 删除 用户信息
function det() {
    var id = this.getAttribute("id");
    $.ajax({
        url: "DeleteUser",
        async: true,
        data: {'id':id},
        type: "GET",
        success:function (){
            alert("删除成功");
            location.reload();
        },
        error:function (){
            alert("删除失败");
        }
    })
}

//更新用户信息
function updateInfo() {
    $.ajax({
        url:"EditUserInfo",
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