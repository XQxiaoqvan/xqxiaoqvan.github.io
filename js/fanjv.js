/*
 * @Date: 2024-01-10 17:35:46
 * @LastEditors: XQxiaoqvan xiaoqvandd@qq.com
 * @LastEditTime: 2024-01-12 23:16:54
 */
document.addEventListener('DOMContentLoaded', function() {

    const fanjvDiv = document.getElementById('fanjv');

    fetch('fanjv/index.html')
        .then(response => response.text())
        .then(html => {
            // console.log('成功获取HTML内容:', html);

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const fanjvPythonElement = doc.getElementById('fanjv-python');

            if (fanjvPythonElement) {
                // console.log('找到目标元素:', fanjvPythonElement);

                fanjvDiv.innerHTML = '';
                fanjvDiv.appendChild(fanjvPythonElement.cloneNode(true));
            } else {
                console.error('未找到目标元素');
            }
        })
        .catch(error => console.error('获取HTML内容失败', error));
});

window.onload = function() {
    let container = document.querySelector('.fanjv-main');
    if (container) {
        container.addEventListener('wheel', function(e) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }, false);
    }
}

$(document).ready(function() {
    // 定义一个函数用于处理相关的操作
    function handleDynamicContent() {
        // 获取今天是星期几
        var today = new Date().getDay();

        // 添加 "dqxq" 类到对应的星期
        $('.fanjv-times div').eq(today).find('p').addClass('dqxq');

        // 隐藏所有的 day-container
        $('.day-container').hide();

        // 显示今天对应的 day-container
        var todayContainer = $('#day-' + today);
        console.log(todayContainer);

        if (todayContainer.length > 0) {
            todayContainer.show();
        } else {
            console.error('无法找到对应的 day-container');
        }
    }

    // 使用 setTimeout 来确保页面上的动态元素都加载完成
    setTimeout(handleDynamicContent, 1000);

    // 或者你也可以监听元素插入事件
    $(document).on('DOMNodeInserted', function(e) {
        // 检查插入的元素是否是你关心的那个元素
        if ($(e.target).is('.day-container')) {
            // 执行相关操作
            handleDynamicContent();

            // 取消后续的事件监听，确保只执行一次
            $(document).off('DOMNodeInserted');
        }
    });
});



$(document).ready(function() {
    // 获取今天是星期几
    var today = new Date().getDay();

    // 隐藏所有番剧内容
    $(document).on('click', '.fanjv-main .day-container', function() {
        $('.fanjv-main .day-container').hide();
        $(this).show();
    });

    // 添加 "dqxq" 类到对应的星期
    $(document).on('click', '.fanjv-times div', function() {
        // 获取点击的是哪一天
        var dayIndex = $(this).index();

        // 隐藏所有番剧内容
        $('.fanjv-main .day-container').hide();

        // 显示点击的星期对应的番剧内容
        $('#day-' + dayIndex).show();

        // 移除之前的 "dqxq" 类
        $('.fanjv-times div p').removeClass('dqxq');

        // 添加新的 "dqxq" 类到点击的星期
        $(this).find('p').addClass('dqxq');
    });

    // 初始化显示今天对应的番剧内容
    $('#day-' + today).show();
    // 初始化添加 "dqxq" 类到今天对应的星期
    $('.fanjv-times div').eq(today).find('p').addClass('dqxq');
});