window.addEventListener('load', function () {
    // 获取元素
    var subcon = document.querySelector('.subcon');
    var lis = document.querySelector('.subnav').querySelector('ul').querySelectorAll('li');
    console.log(lis);
    var items = document.querySelectorAll('.item');
    console.log(items);

    // 绑定事件
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);

        lis[i].onmouseenter = function () {
            var index = this.getAttribute('index');
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = 'none';
            }
            items[index].style.display = 'block';
        }

        lis[i].onmouseleave = function () {
            var index = this.getAttribute('index');
            items[index].onmouseenter = function () {
                items[index].style.display = 'block';
            }
            items[index].style.display = 'none';
        }

        var index = lis[i].getAttribute('index');

        items[index].onmouseleave = function () {
            this.style.display = 'none';
        }
    }
})