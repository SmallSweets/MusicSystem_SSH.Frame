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
                inform.innerText = "❌"
            }else {
                inform.style.color = "green";
                inform.style.fontSize = "10px";
                inform.innerText = "✔";
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
        dataType:"text",
        async:true,
        type: "GET",
        data:$("#info").serialize(),
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