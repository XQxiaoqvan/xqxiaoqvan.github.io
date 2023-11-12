/*!
 * by.xiaoqvan
 * 魔改https://myhkw.cn播放器
 * Copyright 2023 xiaoqvan
 * Released under the MIT license
 */
// 明月浩空播放器引入
document.addEventListener('DOMContentLoaded', function() {
    var myhkScript = document.createElement('script');
    myhkScript.src = 'https://myhkw.cn/api/player/168460845260';
    myhkScript.id = 'myhk';
    myhkScript.setAttribute('key', '168460845260');
    myhkScript.setAttribute('m', '1');

    document.head.appendChild(myhkScript);
});
// 对系统的原生播放器通道设置播放器属性会显示歌曲名和歌曲封面，封面目前只测试对win系统生效
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


// 网站内嵌内容将明月浩空嵌入进网站
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
<div>
    <img src="./zhuye/img/music_3_fill.png" class="player-button custom-button" onclick="handleReturnButtonClick()"/>
    <progress id="musicprogress-bar" style="width: 90%; margin: 0 5%;" value="0" max="100"></progress>
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

// 设置歌曲名字和时长
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


// 隐藏明月浩空
document.addEventListener('DOMContentLoaded', function() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                var myhkplayerDiv = document.getElementById('myhkplayer');
                var myhkLrcDiv = document.getElementById('myhkLrc');
                if (myhkplayerDiv) {
                    myhkplayerDiv.style.cssText = 'visibility: hidden;';
                }
                if (myhkLrcDiv) {
                    myhkLrcDiv.style.cssText = 'display: none;';
                }
            }
        });
    });

    var config = { childList: true, subtree: true };
    observer.observe(document.body, config);
});
// 根据时长生成进度条
document.addEventListener('DOMContentLoaded', function() {
    // 创建一个观察器实例
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                var myhkplayer = document.getElementById('myhkplayer');
                if (myhkplayer) {
                    var timeElement = myhkplayer.querySelector('.timestyle .myhktime');

                    if (timeElement) {
                        var time = timeElement.textContent.trim();
                        var times = time.split(' / ');
                        var currentTime = parseTime(times[0]);
                        var totalTime = parseTime(times[1]);

                        var progressBar = document.getElementById('musicprogress-bar');
                        progressBar.max = totalTime;
                        progressBar.value = currentTime;
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

function parseTime(timeString) {
    var parts = timeString.split(':');
    var minutes = parseInt(parts[0]);
    var seconds = parseInt(parts[1]);
    return minutes * 60 + seconds;
}
// 获取歌词替换到底部栏
document.addEventListener('DOMContentLoaded', function() {
    var checkExist = setInterval(function() {
        var myhkplayer = document.getElementById('myhkplayer');
        var myhkLrcDiv = document.getElementById('myhkLrc');
        var powerDiv = document.querySelector('.power');
        var foorerMusicDiv = document.querySelector('#foorer-music');

        if (myhkLrcDiv && myhkplayer) {
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' || (mutation.type === 'attributes' && mutation.target === myhkplayer && mutation.attributeName === 'class')) {
                        var myhknowElement = myhkLrcDiv.querySelector('.myhknow');

                        if (myhknowElement && myhkplayer.classList.contains('playing')) {
                            foorerMusicDiv.innerHTML = '<i class="fa-brands fa-tiktok"></i> ' + myhknowElement.innerText + ' <i class="fa-brands fa-tiktok"></i>';
                            foorerMusicDiv.style.display = 'block';
                            powerDiv.style.display = 'none';
                        } else {
                            foorerMusicDiv.style.display = 'none';
                            powerDiv.style.display = 'block';
                        }
                    }
                });
            });

            var config = { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] };
            observer.observe(myhkLrcDiv, config);
            observer.observe(myhkplayer, config);

            clearInterval(checkExist);
        }
    }, 100); // check every 100ms
});