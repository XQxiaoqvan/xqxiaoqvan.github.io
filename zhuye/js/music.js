document.addEventListener('DOMContentLoaded', function() {
    var myhkScript = document.createElement('script');
    myhkScript.src = 'https://myhkw.cn/api/player/168460845260';
    myhkScript.id = 'myhk';
    myhkScript.setAttribute('key', '168460845260');
    myhkScript.setAttribute('m', '1');

    myhkScript.onload = function() {
        // 定义一个函数，用于检查并处理footer的显示与隐藏
        function checkFooterVisibility() {
            var myhkplayerDiv = document.getElementById('myhkplayer');
            var footerElement = document.getElementById('footer');
            var myhkLrc = document.getElementById('myhkLrc');
            var ulElement = myhkLrc.querySelector('ul');

            if (myhkplayerDiv && myhkplayerDiv.classList.contains('playing')) {
                if (ulElement) {
                    footerElement.style.display = 'none';
                } else {
                    footerElement.style.display = 'block';
                }
            } else {
                footerElement.style.display = 'block';
            }
        }

        // 初始化时先调用一次
        checkFooterVisibility();

        // 使用 MutationObserver 监听myhkplayer和myhkLrc的class变化
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
                    checkFooterVisibility();
                }
            });
        });

        var myhkplayerDiv = document.getElementById('myhkplayer');
        var myhkLrc = document.getElementById('myhkLrc');

        var config = { attributes: true, attributeFilter: ['class', 'style'] };
        observer.observe(myhkplayerDiv, config);
        observer.observe(myhkLrc, config);
    };

    document.head.appendChild(myhkScript);

    // 在加载完成后，延迟一段时间再开始检查
    setTimeout(function() {
        myhkScript.onload();
    }, 2000);
});