function Show(){
    var list = ["id","name","password","sex","age","address","phone","vip"]
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
                edit.innerHTML = "<a href='UserEdit.html'>编辑</a>";

                var del = document.createElement("td");
                del.appendChild(edit);
                del.innerHTML = "<a href=''>删除</a>";
            }
        },
        error:function (){
            alert("显示错误");
        }
    });
}