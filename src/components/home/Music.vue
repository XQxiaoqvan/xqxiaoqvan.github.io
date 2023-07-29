<script setup lang="ts" name="music">
import { useMusic } from '@/assets/ts/music';

const { albumArt, lyricText, progressBar } = useMusic();
import { toast, type ToastOptions } from 'vue3-toastify';

function handlePauseButtonClick() {
    var iconElement = document.querySelector(".myhkicon-pauseCircle");

    if (iconElement) {
        (iconElement as HTMLElement).click();

        document.querySelector(".fa-play")?.setAttribute("style", "display: inline-block");
        document.querySelector(".fa-pause")?.setAttribute("style", "display: none");
    } else {
        toast(`<i class="fa-solid fa-circle-exclamation"></i> 等待播放器加载`, {
            autoClose: 1000,
        } as ToastOptions);
    }
}

function handleNextButtonClick() {
    var nextButton = document.querySelector(".myhknext");
    if (nextButton) {
        (nextButton as HTMLElement).click();

        document.querySelector(".fa-play")?.setAttribute("style", "display: none");
        document.querySelector(".fa-pause")?.setAttribute("style", "display: inline-block");
    } else {
        toast(`<i class="fa-solid fa-circle-exclamation"></i> 等待播放器加载`, {
            autoClose: 1000,
        } as ToastOptions);
    }
}

function handlePlayButtonClick() {
    var playButton = document.querySelector(".myhkicon-playCircle");
    (playButton as HTMLElement).click();

    document.querySelector(".fa-play")?.setAttribute("style", "display: none");
    document.querySelector(".fa-pause")?.setAttribute("style", "display: inline-block");
}

function handlePrevButtonClick() {
    var prevButton = document.querySelector(".myhkprev");
    if (prevButton) {
        (prevButton as HTMLElement).click();

        document.querySelector(".fa-play")?.setAttribute("style", "display: none");
        document.querySelector(".fa-pause")?.setAttribute("style", "display: inline-block");
    } else {
        toast(`<i class="fa-solid fa-circle-exclamation"></i> 等待播放器加载`, {
            autoClose: 1000,
        } as ToastOptions);
    }
}
const playerElement = document.getElementById('myhkplayer');

const observer = new MutationObserver(() => {
    const isPlaying = playerElement?.classList.contains('playing');
    if (isPlaying) {
        document.querySelector(".fa-play")?.setAttribute("style", "display: none");
        document.querySelector(".fa-pause")?.setAttribute("style", "display: inline-block");
    } else {
        document.querySelector(".fa-play")?.setAttribute("style", "display: inline-block");
        document.querySelector(".fa-pause")?.setAttribute("style", "display: none");
    }
});

if (playerElement) {
    observer.observe(playerElement, { attributes: true, attributeFilter: ['class'] });
}
</script>

<template>
    <div class="music-bfq  Theme_colors Frosted_glass">
        <div>
            <img ref="albumArt" id="album-art" src="https://via.placeholder.com/150?text=%20" alt="album-art">
        </div>
        <div class="music-content">
            <div class="music-info">
                <h1 class="player-info">音乐播放器 - 加载中</h1>
            </div>
            <div class="music-button">
                <i class="fas fa-step-backward fa-xs" @click="handlePrevButtonClick"></i>
                <i class="fas fa-play fa-xs" @click="handlePlayButtonClick"></i>
                <i class="fas fa-pause fa-xs" @click="handlePauseButtonClick"></i>
                <i class="fas fa-step-forward fa-xs" @click="handleNextButtonClick"></i>
            </div>
            <div class="music-progress">
                <progress ref="progressBar" class="music-progress-bar" id="musicprogress-bar" value="0"
                    max="100"></progress>
            </div>
        </div>
    </div>
    <!-- 歌词 -->
    <div class="lyric Theme_colors Frosted_glass">
        <div class="color-text">
            <span class="lyric-text" ref="lyricText" id="lyric_text">加载中...</span>
        </div>
    </div>
</template>
<style scoped>
/* 音乐播放器 */

.music-bfq {
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    width: 100%;
    margin-top: 20px;
    flex-wrap: nowrap;
}

.music-bfq img {
    width: 90px;
    height: 90px;
    border-radius: 10px;
}

.music-info {
    text-align: center;
    /* 让子元素在容器中水平居中 */
}

.player-info {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 200px;
    padding: 5px;
    display: inline-block;
    /* 让元素变成行内块元素 */
}

.music-content {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    margin: 0 40px;
}

.music-content h1,
.music-content p {
    margin: 0;
}

.music-content h1 {
    font-size: 20px;
}

.music-progress {
    width: 100%;
    margin: 0 0;
}

.music-progress progress {
    width: 100%;
}

/* 进度条 */

.music-progress-bar {
    appearance: none;
    height: 10px;
    border-radius: 10px;
    background-color: rgb(170, 170, 170);
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.557);
}

.music-progress-bar::-webkit-progress-value {
    background: linear-gradient(90deg, #0f0, #0ff);
    border-radius: 10px;
}

.music-progress-bar::-webkit-progress-bar {
    background-color: rgb(243, 243, 243);
    border-radius: 10px;
}

.music-button {
    display: flex;
    align-items: center;
}

.music-button i {
    margin: 8px 8px;
    font-size: 24px;
}

.fas.fa-pause.fa-xs {
    display: none;
}

/* 歌词 */

.lyric {
    box-sizing: border-box;
    border-radius: 20px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    padding: 15px;
    width: 100%;
    text-align: center;
    margin: 20px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.lyric-text {
    max-width: 350px;
    overflow: hidden;
    width: 350px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;

}

.color-text {
    text-align: center;
    font-size: 15px;
    background-image: -webkit-linear-gradient(left, blue, #66ffff 10%, #cc00ff 20%, #CC00CC 30%, #CCCCFF 40%, #00FFFF 50%, #CCCCFF 60%, #CC00CC 70%, #CC00FF 80%, #66FFFF 90%, blue 100%);
    background-size: 200% 100%;
    background-clip: text;
    /* 标准属性 */
    -webkit-background-clip: text;
    /* Webkit 前缀 */
    -webkit-text-fill-color: transparent;
    animation: masked-animation 4s linear infinite;
}

@keyframes masked-animation {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: -100% 0;
    }
}

/* 播放器END */
</style>