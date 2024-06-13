window.addEventListener("load", function () {
    //1.获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 禁止轮播图选中文字
    focus.addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
    prev.addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
    next.addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
    //2.鼠标经过focus就显示隐藏按钮
    focus.addEventListener('mouseenter', function () {
        // prev.style.display = 'block';
        // next.style.display = 'block';
        //清除定时器
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        // prev.style.display = 'none';
        // next.style.display = 'none';
        //开启定时器
        timer = setInterval(function () {
            //手动调用点击事件
            next.click();
        }, 1500)
    })
    //3.动态生成小圆圈    有几张图片，我们就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = this.document.createElement('li');
        //记录当前小圆圈的索引号  通过自定义属性来做
        li.setAttribute('index', i);
        //把小li插入到ol里面
        ol.appendChild(li);
        //4.小圆圈的排他思想  我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            //干掉所有人 把所有的小li  去除 selected类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下我自己 当前的小li  设置selected类名
            this.className = 'selected';
            //5.点击小圆圈，移动图片  当然移动的是ul
            //ul的移动距离  小圆圈的索引号*图片的宽度  注意是负值
            //当我们点击了某个小li  就拿到当前小li的索引
            var index = this.getAttribute('index');
            //当我们点击了某个小li 就把这个  li的   索引号给   num
            num = index;
            //当我们点击了某个小li 就把这个  li的   索引号给   circle
            circle = index;
            // num = circle = index;
            // console.log(focusWidth);
            // console.log(index);
            animate(ul, -index * focusWidth);
        })
        //ol第一个小li添加类名
        ol.children[0].className = 'selected';
    }
    //6.克隆第一张图片（li）放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);


    //7.点击右侧按钮，图片滚动一张
    var num = 0;
    //声明一个变量控制小圆圈的播放
    var circle = 0;
    //节流阀  控制  连续点击 的  移动速度
    var flag = true;
    next.addEventListener('click', function () {
        if (flag) {
            //关闭节流阀
            flag = false;
            //如果走到了最后复制的一张图片，此时 我们 ul 要快速复原left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                //打开节流阀
                flag = true;
            });
            //8.点击右侧按钮，小圆圈跟随一起变化 可以在声明一个变量控制小圆圈的播放
            circle++;
            //如果circle==ol.children.length 说明走到我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用函数
            selectedChange();
        }
    })
    //7.点击左按钮，图片滚动一张
    prev.addEventListener('click', function () {
        if (flag) {
            //关闭节流阀
            flag = false;
            //如果走到了第一张图片，跳到最后一张图片
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                //打开节流阀
                flag = true;
            });
            //8.点击左侧按钮，小圆圈跟随一起变化 可以在声明一个变量控制小圆圈的播放
            circle--;
            //如果circle <0 说明第一张图片，则小圆圈要改为第四个小圆圈
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            //调用函数
            selectedChange();
        }
    })
    //封装函数
    function selectedChange() {
        //先清除其余小圆圈的selected类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的selected类名
        ol.children[circle].className = 'selected';
    }

    //10.自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        next.click();
    }, 1500)
})