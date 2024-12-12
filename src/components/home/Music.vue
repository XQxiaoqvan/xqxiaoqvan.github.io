<script setup name="music">
import { useMusic } from '@/assets/js/music';

const { albumArt, lyricText } = useMusic();

function handlePauseButtonClick() {
  var iconElement = document.querySelector(".myhkicon-pauseCircle");
  if (iconElement) {
    iconElement.click();

    document.querySelector(".fa-play")?.setAttribute("style", "display: inline-block");
    document.querySelector(".fa-pause")?.setAttribute("style", "display: none");
  } else {
    console.log('等待播放器加载');

  }
}

function handleNextButtonClick() {
  var nextButton = document.querySelector(".myhknext");
  if (nextButton) {
    nextButton.click();

    document.querySelector(".fa-play")?.setAttribute("style", "display: none");
    document.querySelector(".fa-pause")?.setAttribute("style", "display: inline-block");
  } else {
    console.log('等待播放器加载');
  }
}

function handlePlayButtonClick() {
  var playButton = document.querySelector(".myhkicon-playCircle");
  playButton.click();

  document.querySelector(".fa-play")?.setAttribute("style", "display: none");
  document.querySelector(".fa-pause")?.setAttribute("style", "display: inline-block");
}

function handlePrevButtonClick() {
  var prevButton = document.querySelector(".myhkprev");
  if (prevButton) {
    prevButton.click();

    document.querySelector(".fa-play")?.setAttribute("style", "display: none");
    document.querySelector(".fa-pause")?.setAttribute("style", "display: inline-block");
  } else {
    console.log('等待播放器加载');

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
  <div class="player">
    <div class="music_image">
      <img ref="albumArt" id="album-art" src="https://via.placeholder.com/150?text=%20" alt="album-art" />
    </div>
    <div class="music_info">
      <div class="music-name">
        <h1 class="player-info">音乐播放器 - 加载中</h1>
        <span class="lyric-text" ref="lyricText">加载中...</span>
      </div>
      <div class="music-button">
        <i class="fas fa-step-backward fa-xs" @click="handlePrevButtonClick"></i>
        <i class="fas fa-play fa-xs" @click="handlePlayButtonClick"></i>
        <i class="fas fa-pause fa-xs" @click="handlePauseButtonClick"></i>
        <i class="fas fa-step-forward fa-xs" @click="handleNextButtonClick"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  display: flex;
  align-items: center;
  width: auto;
}

.music_info {
  margin-left: 10px;
  width: 200px;
}

.music-name {
  width: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.player-info {
  display: inline-block;
  white-space: nowrap;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}

.lyric-text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

.music-button {
  display: none;
}

.player:hover .music-name {
  display: none;
}

.player:hover .music-button {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: center;
  font-size: 30px;

}

.music_image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.music_image img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  animation: rotate 15s linear infinite;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.fas {
  color: rgba(40, 50, 72, 0.8);
  transition: 0.3s;
}

.fas:hover {
  color: rgb(0, 0, 0);
}

.fas:active {
  transform: scale(0.9);
  color: rgba(40, 50, 72, 0.8);
  transition: 0.1s;
}
</style>
