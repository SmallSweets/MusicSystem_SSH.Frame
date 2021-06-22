function selfInfo(){
    var backgroundBoard = document.getElementById("backgroundBoard");
    var div = document.getElementById("container");
    var list = ["id","name","password","phone"];
    backgroundBoard.style.backgroundImage = "url(../image/SelfInfoBackground.jpg?timestamp=" + new Date().getTime() + ")";
    $.ajax({
        url:"AdminSelfInfo",
        dataType:"json",
        async:true,
        success:function (res){
            for (var i = 0;i < res.length;i++){
                for (var x = 0;x < list.length;x++){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    var span = document.createElement("span");
                    if (x == 0){
                        span.innerText = "序号：";
                    }else if(x == 1) {
                        span.innerText = "用户名：";
                    }else if(x == 2){
                        span.innerText = "密码：";
                    }else{
                        span.innerText = "电话：";
                    }
                    div.appendChild(span);
                    div.appendChild(p);
                    div.appendChild(br);
                    p.innerText = res[i][list[x]];
                }
            }
        }
    })
}