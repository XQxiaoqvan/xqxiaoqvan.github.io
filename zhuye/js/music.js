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

document.addEventListener('DOMContentLoaded', function() {
    function checkElementExistence() {
        var myhkplayer = document.getElementById('myhkplayer');

        if (myhkplayer) {
            var coverElement = myhkplayer.querySelector('.myhkcover.coverplay img');
            var titleElement = myhkplayer.querySelector('.songstyle .myhksong span');
            var artistElement = myhkplayer.querySelector('.artiststyle .myhkartist span');

            if (coverElement && titleElement && artistElement) {
                var coverSrc = coverElement.src;
                var title = titleElement.textContent.trim();
                var artist = artistElement.textContent.trim();

                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: title,
                        artist: artist,
                        artwork: [{
                            src: coverSrc,
                            sizes: '96x96',
                            type: 'image/png'
                        }]
                    });

                    // 添加上一首和下一首的控制逻辑
                    navigator.mediaSession.setActionHandler('previoustrack', function() {
                        var prevButton = document.querySelector('.myhkprev');
                        if (prevButton) {
                            prevButton.click(); // 模拟点击上一首按钮
                        }
                    });

                    navigator.mediaSession.setActionHandler('nexttrack', function() {
                        var nextButton = document.querySelector('.myhknext');
                        if (nextButton) {
                            nextButton.click(); // 模拟点击下一首按钮
                        }
                    });
                }
            }
        }
    }

    var observer = new MutationObserver(checkElementExistence);
    observer.observe(document.body, { childList: true, subtree: true });
});