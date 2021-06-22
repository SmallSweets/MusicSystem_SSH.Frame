// 在此 js 文件中 引入其他 js 文件
document.write("<script language=JavaScript src='../js/admin/ShowAllUser.js'></script>");

function search(){
    var list = ["id","name","password","sex","age","address","phone","vip"]
    var input = document.getElementsByName("input")[0].value;
    var table = document.getElementById("box");
    $.ajax({
        url:"SearchUser",
        data:{"input":input},
        dataType:"json",
        async:true,
        success:function (res){
            table.innerHTML = "<tr><th>序号</th><th>用户名</th><th>密码</th><th>性别</th><th>年龄</th><th>地址</th><th>联系电话</th><th>是否会员</th><th>编辑</th><th>删除</th></tr>"
            for(var i = 0;i < res.length;i++){
                var tr = document.createElement("tr");
                table.appendChild(tr);
                for (var x = 0;x < list.length;x++){
                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerText = res[i][list[x]];
                }
                var edit = document.createElement("td");
                tr.appendChild(edit);
                edit.innerText = "编辑";
                edit.style.cursor = "pointer";
                edit.className = res[i]["id"];
                // 共用 所有用户信息js中的方法
                edit.onclick = showEditDiv;

                var del = document.createElement("td");
                tr.appendChild(del);
                del.innerText = "删除";
                del.id = res[i]["id"];
                del.style.cursor = "pointer";
                // 共用 所有用户信息js中的方法
                del.onclick = det;
            }

        }
    })
}