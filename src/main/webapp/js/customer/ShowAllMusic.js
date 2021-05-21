// 动态生成并加载数据和标签到页面
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
                $("tr").addClass("hover_tr");
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
    }).mouseleave(function (){
        $(this).css("background-color","#ffffff");
    });
}