/*!
 * by.xiaoqvan
 * 魔改https://myhkw.cn播放器
 * Copyright 2023 xiaoqvan
 * Released under the MIT license
 */
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

var originalContentDisplay = ""; // 保存原始的 CSS 属性

var musicPlayer = document.createElement("div");
musicPlayer.classList.add("music-player");
musicPlayer.id = "music-player";
musicPlayer.style.display = "none";
musicPlayer.innerHTML = `
<div class="player-row">
    <div class="player-info">勇者 - YOASOBI</div>
</div>
<div class="player-row" style="display: flex; justify-content: center; padding: 0 10px;">
    <i class="fas fa-step-backward fa-xs" onclick="handlePrevButtonClick()" style="font-size: 24px;"></i>
    <i class="fas fa-play fa-xs" onclick="handlePlayButtonClick()" style="font-size: 24px;"></i>
    <i class="fas fa-pause fa-xs" onclick="handlePauseButtonClick()" style="font-size: 24px; display: none;"></i>    
    <i class="fas fa-step-forward fa-xs" onclick="handleNextButtonClick()" style="font-size: 24px;"></i>    
</div>

<div class="player-row">
    <div class="player-time">00:14 / 02:45</div>
</div>
<div class="player-row">
    <img src="./zhuye/img/music_3_fill.png" class="player-button custom-button" onclick="handleReturnButtonClick()"/>
</div>
`;
document.getElementById("hitokoto").appendChild(musicPlayer);

var enableHitokotoClick = true; // 添加一个标志

function handleButtonClick(event) {
    if (enableHitokotoClick) {
        // 以下是原来的代码
        event.stopPropagation(); // 阻止事件冒泡
        originalContentDisplay = document.getElementById("hitokoto-content").style.display; // 保存原始的 CSS 属性
        document.getElementById("hitokoto").removeEventListener('click', handleButtonClick); // 移除点击事件
        document.getElementById("hitokoto-content").style.display = "none";
        document.getElementById("music-player").style.display = "block";
    }
}

function handleReturnButtonClick() {
    if (enableHitokotoClick) {
        // 以下是原来的代码
        document.getElementById("hitokoto-content").style.display = originalContentDisplay; // 恢复原始的 CSS 属性
        document.getElementById("music-player").style.display = "none";
        document.getElementById("hitokoto").addEventListener('click', handleButtonClick); // 添加点击事件
    }
}

function handlePrevButtonClick() {
    // 处理上一首按钮点击事件的代码
    var prevButton = document.querySelector('.myhkprev');
    if (prevButton) {
        prevButton.click(); // 模拟点击上一首按钮
    }
}

function handlePlayButtonClick() {
    var playButton = document.querySelector('.myhkicon-playCircle');
    playButton.click();

    var playIcon = document.querySelector('.fa-play');
    playIcon.style.display = 'none';

    var pauseIcon = document.querySelector('.fa-pause');
    pauseIcon.style.display = 'inline-block';
}

function handlePauseButtonClick() {
    var iconElement = document.querySelector('.myhkicon-pauseCircle');
    iconElement.click();

    var playIcon = document.querySelector('.fa-play');
    playIcon.style.display = 'inline-block';

    var pauseIcon = document.querySelector('.fa-pause');
    pauseIcon.style.display = 'none';
}

function handleNextButtonClick() {
    // 处理下一首按钮点击事件的代码
    var nextButton = document.querySelector('.myhknext');
    if (nextButton) {
        nextButton.click(); // 模拟点击下一首按钮
    }
}

function handleReturnButtonClick(event) {
    document.getElementById("hitokoto-content").style.display = originalContentDisplay; // 恢复原始的 CSS 属性
    document.getElementById("music-player").style.display = "none";
}