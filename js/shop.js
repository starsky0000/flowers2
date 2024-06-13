window.addEventListener('load', function () {
    // tab栏切换

    // 获取元素
    var subcon = document.querySelector('.subcon');
    var lis = document.querySelector('.subnav').querySelector('ul').querySelectorAll('li');
    console.log(lis);
    var items = document.querySelectorAll('.item');
    console.log(items);

    // 绑定事件
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].addEventListener('mouseenter', function () {
            // 排他思想，干掉其他人
            for (var j = 0; j < items.length; j++) {
                items[j].style.display = 'none';
            }
            // 留下我自己
            items[i].style.display = 'block';
            items[i].parentNode.style.width = i / 5 * 300 + 'px';
        })
        lis[i].addEventListener('mouseleave', function () {
            var index = this.getAttribute('index');
            items[index].style.display = 'none';
        })
    }
})