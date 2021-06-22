var list = ["id","name","password","sex","age","address","phone","vip"]
var propertyName = ["序号：","用户名：","密码：","性别：","年龄：","地址：","电话：","是否会员："]
function selfInfo(){
    var backgroundBoard = document.getElementById("backgroundBoard");
    var div = document.getElementById("container");
    backgroundBoard.style.backgroundImage = "url(../image/SelfInfoBackground.jpg?timestamp=" + new Date().getTime() + ")";
    $.ajax({
        url:"SelfInfo",
        dataType:"json",
        async:true,
        success:function (res){
            for (var i = 0;i < res.length;i++){
                for (var x = 0;x < list.length;x++){
                    var p = document.createElement("p");
                    var br = document.createElement("br");
                    var span = document.createElement("span");
                    span.innerText = propertyName[x];
                    div.appendChild(span);
                    div.appendChild(p);
                    div.appendChild(br);
                    p.innerText = res[i][list[x]];
                }
            }
        }
    })
}