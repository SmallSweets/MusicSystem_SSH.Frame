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
            table.innerHTML = "<tr><th>序号</th><th>用户名</th><th>密码</th><th>性别</th><th>年龄</th><th>地址</th><th>联系电话</th><th>是否会员</th></tr>"
            for(var i = 0;i < res.length;i++){
                var tr = document.createElement("tr");
                table.appendChild(tr);
                for (var x = 0;x < list.length;x++){
                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.innerText = res[i][list[x]];
                }
            }

            var edit = document.createElement("td");
            tr.appendChild(edit);
            edit.innerHTML = "<a href=''>编辑</a>";

            var del = document.createElement("td");
            tr.appendChild(del);
            del.innerHTML = "<a href=''>删除</a>";
        }
    })
}