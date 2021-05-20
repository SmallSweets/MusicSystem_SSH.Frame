function judge(){
    var name = document.getElementById("input").value;
    var inform = document.getElementById("out");
    $.ajax({
        url:"JudgeSame",
        type:"GET",
        dataType:"text",
        data:{"input":name},
        async:true,
        success:function (res){
            var result = res.substring(0,4);
            if(result == "have"){
                inform.style.color = "red";
                inform.innerText = "用户名已存在"
            }else {
                inform.style.color = "green";
                inform.innerText = "用户名可用";
            }
        },
        error:function (){
            alert("获取失败");
        }
    });
}

function register(){
    $.ajax({
        url:"Register",
        data:$("#info").serialize(),
        dataType:"text",
        async:true,
        success:function (res){
            var result = res.substring(0,4);
            if (result == "succ"){
                alert("注册成功");
            }else {
                alert("注册失败");
            }
        }
    });
}