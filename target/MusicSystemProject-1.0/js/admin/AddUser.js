function addUser(){
    $.ajax({
        url:"AddUser",
        async:true,
        type:"GET",
        //提交表单
        data:$('#userInfo').serialize(),
        success:function (){
            alert("添加成功");
        },
        error:function (){
            alert("添加失败");
        }
    });
}