function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //步长=（目标位置-当前位置）/10
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
        //当前位置+步长
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}