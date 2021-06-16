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
    var div = $("#container");
    var id = this.getAttribute("class");
    div.css("display","block");
    $.ajax({
        url:"SearchUser",
        async:true,
        data: {'input':id},
        dataType: "json",
        type:"GET",
        success:function (data){
            alert(data);
            var form = document.createElement("form");
            div.append(form);
            for (var i = 0;i < list.length;i++){
                var input = document.createElement("input");
                form.appendChild(input);
                form.appendChild(document.createElement("br"));
                input.value = data[0][list[i]];
            }
        }
    })
}

// 删除 用户信息
function det() {
    var id = this.getAttribute("id");
    alert(id);
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