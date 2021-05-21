function save(){
    $.ajax({
        url:"AddMusic",
        async:true,
        type:"GET",
        //提交表单
        data:$('#musicInfo').serialize(),
        success:function (){
            alert("添加成功");
        },
        error:function (){
            alert("添加失败");
        }
    });
}