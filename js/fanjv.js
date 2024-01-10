document.addEventListener('DOMContentLoaded', function() {
    // 你的 JavaScript 代码放在这里

    const fanjvDiv = document.getElementById('fanjv');

    // 使用fetch获取HTML内容
    fetch('fanjv/index.html')
        .then(response => response.text())
        .then(html => {
            console.log('成功获取HTML内容:', html);

            // 使用DOMParser解析HTML字符串
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 选择目标元素
            const fanjvPythonElement = doc.getElementById('fanjv-python');

            // 检查是否成功找到目标元素
            if (fanjvPythonElement) {
                console.log('找到目标元素:', fanjvPythonElement);

                // 清空目标<div>中的内容，然后将目标元素的内容添加到目标<div>中
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
    if (container) { // 确保元素存在
        container.addEventListener('wheel', function(e) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }, false);
    }
}