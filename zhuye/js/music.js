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
<div class="player-row" style="display: flex; align-items: flex-start;">
    <div class="player-info">歌曲名称 - 歌手</div>
</div>
<div class="player-row" style="display: flex; justify-content: center; padding: 0 10px;">
    <i class="fas fa-step-backward fa-xs" onclick="handlePrevButtonClick()" style="font-size: 24px;"></i>
    <i class="fas fa-play fa-xs" onclick="handlePlayButtonClick()" style="font-size: 24px;"></i>
    <i class="fas fa-pause fa-xs" onclick="handlePauseButtonClick()" style="font-size: 24px; display: none;"></i>    
    <i class="fas fa-step-forward fa-xs" onclick="handleNextButtonClick()" style="font-size: 24px;"></i>    
</div>
<div class="player-row" style="display: flex; align-items: flex-end;">
    <div class="player-time">00:00 / 00:00</div>
</div>
<div class="progress-bar">
    <img src="./zhuye/img/music_3_fill.png" class="player-button custom-button" onclick="handleReturnButtonClick()"/>
    <div class="progress"></div>
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

function handlePrevButtonClick() {
    // 处理上一首按钮点击事件的代码
    var prevButton = document.querySelector('.myhkprev');
    if (prevButton) {
        prevButton.click(); // 模拟点击上一首按钮

        // 更新播放和暂停按钮的显示状态
        var playIcon = document.querySelector('.fa-play');
        playIcon.style.display = 'none';

        var pauseIcon = document.querySelector('.fa-pause');
        pauseIcon.style.display = 'inline-block';
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

        // 更新播放和暂停按钮的显示状态
        var playIcon = document.querySelector('.fa-play');
        playIcon.style.display = 'none';

        var pauseIcon = document.querySelector('.fa-pause');
        pauseIcon.style.display = 'inline-block';
    }
}


function handleReturnButtonClick(event) {
    document.getElementById("hitokoto-content").style.display = originalContentDisplay; // 恢复原始的 CSS 属性
    document.getElementById("music-player").style.display = "none";
}


document.addEventListener('DOMContentLoaded', function() {
    // 创建一个观察器实例
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                var myhkplayer = document.getElementById('myhkplayer');
                if (myhkplayer) {
                    var titleElement = myhkplayer.querySelector('.songstyle .myhksong span');
                    var artistElement = myhkplayer.querySelector('.artiststyle .myhkartist span');
                    var timeElement = myhkplayer.querySelector('.timestyle .myhktime');

                    if (titleElement && artistElement && timeElement) {
                        var title = titleElement.textContent.trim();
                        var artist = artistElement.textContent.trim();
                        var time = timeElement.textContent.trim();

                        var playerInfoElement = document.querySelector('.player-info');
                        var playerTimeElement = document.querySelector('.player-time');

                        if (playerInfoElement && playerTimeElement) {
                            playerInfoElement.textContent = title + ' - ' + artist;
                            playerTimeElement.textContent = time;
                        }
                    }
                }
            }
        });
    });

    // 配置观察选项:
    var config = { childList: true, subtree: true };

    // 传入目标节点和观察选项
    observer.observe(document.body, config);
});
document.addEventListener('DOMContentLoaded', function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                var myhkplayerDiv = document.getElementById('myhkplayer');
                if (myhkplayerDiv) {
                    myhkplayerDiv.style.cssText = 'visibility: hidden; background: rgba(113, 171, 175, 0.8);';
                }
            }
        });
    });

    var config = { childList: true, subtree: true };
    observer.observe(document.body, config);
});



// 获取进度条元素和包含时间信息的元素
var progressBar = document.querySelector('.progress-bar');
var progress = document.querySelector('.progress');
var playerTime = document.querySelector('.player-time');

// 监听时间信息的变化
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'characterData') {
      // 解析时间字符串，提取当前时间和总时间
      var timeString = playerTime.textContent.trim();
      var currentTime = parseInt(timeString.split(' / ')[0].split(':')[1]);
      var totalTime = parseInt(timeString.split(' / ')[1].split(':')[1]);

      // 计算当前播放进度的百分比
      var progressPercentage = (currentTime / totalTime) * 100;

      // 设置进度条的宽度
      progress.style.width = progressPercentage + '%';
    }
  });
});

// 配置观察选项
var config = { characterData: true, subtree: true };

// 传入目标节点和观察选项
observer.observe(playerTime, config);