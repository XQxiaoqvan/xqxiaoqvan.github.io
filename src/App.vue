<script setup lang="ts" name="App">
import { RouterView } from 'vue-router'
import background from "./components/background.vue";
import topbar from "./components/Top_bar.vue";
</script>

<template>
  <!-- 背景 -->
  <background />
  <div class="main">
    <div class="container">
      <!-- 顶部栏 -->
      <topbar />
    </div>
    <!-- 路由显示位置 -->
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-show="true"></component>
      </keep-alive>
    </RouterView>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  width: 80%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
}
</style>
