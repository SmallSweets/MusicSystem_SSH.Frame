var images = document.getElementById("transform").children;
var points = document.getElementById("point").children;
var interval;
var leftButton = document.getElementById("left");
var rightButton = document.getElementById("right");



//设置开始图片下标 从第一张图片开始
var index = 0;

//循环设置元素下标
for (var i = 0;i < images.length;i++){
    images[i].index = i;
    points[i].index = i;
    //添加点击小点切换图片事件
    points[i].onclick = appoint;
    images[i].onmouseover = function (){clearInterval(interval)};
    images[i].onmouseleave = function (){automatic()};
}

function appoint(){
    var apo = this.index;
    //循环设置li不透明度为0 也就是不可见
    for (var i = 0;i < images.length;i++){
        images[i].style.opacity = "0";
    }
    images[apo].style.opacity = "100";
}

//自动切换图片函数
function automatic(){
    interval = setInterval(function (){
        //循环设置li不透明度为0 也就是不可见
        for (var i = 0;i < images.length;i++){
            images[i].style.opacity = "0";
        }
        //然后设置指定下标的li的不透明度为100 实现了显示指定下标的图片，而不显示其他图片
        images[index].style.opacity = "100";
        //下标自动增长
        index++;
        //下标如果超出范围，将下标重置为0
        if (index == images.length){
            index = 0;
        }
    },2000);
}

//为左右切换图片按钮添加事件
leftButton.onclick = previous;
//鼠标移动到 上一张 按钮 停止定时器
leftButton.onmouseover = function (){clearInterval(interval)};
//鼠标离开 上一张 按钮 开始定时器
leftButton.onmouseleave = function (){automatic()};
rightButton.onclick = next;
//鼠标移动到 下一张 按钮 停止定时器
rightButton.onmouseover = function (){clearInterval(interval)};
//鼠标离开 下一张 按钮 开始定时器
rightButton.onmouseleave = function (){automatic()};

//切换下一张图片函数
function next(){
    index = index + 1;
    //如果下标超出范围 将下标赋值为0
    if (index == images.length){
        index = 0;
    }
    //循环设置li不透明度为0 也就是不可见
    for (var i = 0;i < images.length;i++){
        images[i].style.opacity = "0";
    }
    //将下一张图片设置为可见
    images[index].style.opacity = "100";
}

//切换上一张图片
function previous(){
    index = index - 1;
    //如果下标超出范围 将下标设置为 图片数量-1
    if (index == -1){
        index = images.length -1;
    }
    //循环设置li不透明度为0 也就是不可见
    for (var i = 0;i < images.length;i++){
        images[i].style.opacity = "0";
    }
    //将上一张图片设置为可见
    images[index].style.opacity = "100";
}