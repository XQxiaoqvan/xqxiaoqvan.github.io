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