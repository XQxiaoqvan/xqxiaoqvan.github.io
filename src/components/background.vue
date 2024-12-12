<script setup name="background">
import backgroundImg from '@/assets/img/background3.webp'
import { init } from "@/assets/js/rain";
import { ref, onMounted } from 'vue';

const canvasStyle = ref({
  position: 'absolute',
  width: "100%",
  height: "100vh",
  zIndex: "-1",
  left: "0",
  top: "0",
  overflow: "hidden",
});

const ctx = ref({});

onMounted(() => {
  initCanvas();
});

function initCanvas() {
  const canvas = document.querySelector("#canvas");
  ctx.value = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init(ctx.value);
}

</script>

<template>

  <div class="background">
    <canvas id="canvas" :style="canvasStyle" />
    <img :src="backgroundImg" alt="background">
    <!-- 下方为背景灰色蒙版 -->
    <div class="overlay"></div>
  </div>
</template>

<style scoped>
.home,
.background,
.overlay {
  user-select: none;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
}

.background {
  width: 100%;
  height: 100vh;
  position: sticky;
}

.background img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -3;
  position: sticky;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.28);
  width: 100%;
  height: 100vh;
  z-index: -2;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
