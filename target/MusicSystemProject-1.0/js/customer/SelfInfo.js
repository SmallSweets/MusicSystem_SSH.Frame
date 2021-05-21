var list = ["id","name","password","sex","age","address","phone","vip"]

function selfInfo(){
    var form = document.getElementById("info");

    $.ajax({
        url:"SelfInfo",
        dataType:"json",
        async:true,
        success:function (res){
            for (var i = 0;i < res.length;i++){
                for (var x = 0;x < list.length;x++){
                    var input = document.createElement("input");
                    var br = document.createElement("br");
                    form.appendChild(input);
                    form.appendChild(br);
                    input.value = res[i][list[x]];
                }
            }
        }
    })
}