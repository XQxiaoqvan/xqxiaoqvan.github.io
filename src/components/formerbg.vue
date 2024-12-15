<script setup name="formerbg">
import { config } from '@/config/Config';

// 动态导入本地静态资源
const images = import.meta.glob('@/assets/img/*', { eager: true });
let backgroundImg = config.backgroundImg;

// 检查是否是外部 URL 或本地路径
if (!/^(https?:|\/\/)/.test(backgroundImg)) {
  const matchedImg = Object.entries(images).find(([path]) =>
    path.includes(backgroundImg.replace('src/assets/img/', ''))
  );
  backgroundImg = matchedImg ? matchedImg[1].default : '';
}
</script>

<template>
  <div class="background">
    <!-- 使用动态解析的路径 -->
    <img :src="backgroundImg" alt="background" />
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
