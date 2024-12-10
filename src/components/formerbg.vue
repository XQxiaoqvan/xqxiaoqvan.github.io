<script setup name="formerbg">
import { ref, watch, computed } from 'vue';
import Config from '@/config/Config';

const isNightMode = ref(false);

// 新增处理异步加载图片的逻辑
const backgroundImg = ref('');

if (typeof Config.backgroundImg === 'string') {
  backgroundImg.value = Config.backgroundImg;
} else if (typeof Config.backgroundImg === 'function') {
  Config.backgroundImg().then((module) => {
    backgroundImg.value = module.default;
  });
}

watch(isNightMode, (newVal) => {
  const overlay = document.querySelector('.overlay');
  if (overlay) {
    overlay.classList.toggle('night-mode', newVal);
  }
});

document.addEventListener('toggleNightMode', (event) => {
  const customEvent = event;
  isNightMode.value = customEvent.detail;
});
</script>

<template>
  <div class="background">
    <!-- 修改 :src 为 backgroundImg -->
    <img :src="backgroundImg" alt="background">
    <!-- 下方为背景灰色蒙版 -->
    <div class="overlay"></div>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.background img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  z-index: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.5s ease, transform 0.5s ease;
}

.overlay.night-mode {
  background-color: rgba(0, 0, 0, 0.4);
  ;
  transform: scale(1.1);
  animation: expand 0.5s ease-out;
}

@keyframes expand {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}
</style>
