window.addEventListener('load', function () {
    var box = this.document.querySelector('.magnifier').querySelector('.box');
    var mask = this.document.querySelector('.mask');
    var big = this.document.querySelector('.big');
    //当我们鼠标经过 box 就显示隐藏  mask遮挡层  和  big大盒子
    box.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    box.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    box.addEventListener('mousemove', function (e) {
        //1.先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        //2.减去盒子高度  宽度 的一半 就是mask 的最终 left和top值了
        //3.mask的移动距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //4.如果x坐标小于0，就让他等于0
        //遮挡层的最大移动距离
        var maskXMax = box.offsetWidth - mask.offsetWidth;
        var maskYMax = box.offsetHeight - mask.offsetHeight;
        if (maskX < 0) {
            maskX = 0;
        } else if (maskX >= maskXMax) {
            maskX = maskXMax;
        }
        if (maskY < 0) {
            maskY = 0;
        } else if (maskY >= maskYMax) {
            maskY = maskYMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //大图片的移动距离=遮挡层的移动距离*大图片的移动距离/遮挡层的最大移动距离
        //大图
        var bigimg = document.querySelector('.bigimg');
        //大图片的移动距离
        var bigXMax = bigimg.offsetWidth - big.offsetWidth;
        var bigYMax = bigimg.offsetHeight - big.offsetHeight;
        //大图片的移动距离X和Y
        var bigX = maskX * bigXMax / maskXMax;
        var bigY = maskY * bigYMax / maskYMax;
        bigimg.style.left = -bigX + 'px';
        bigimg.style.top = -bigY + 'px';
    })
})