<script setup name="App">
import topbar from "./components/Top_bar.vue";
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="topbar">
    <topbar />
  </div>
  <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-show="true"></component>
    </keep-alive>
  </RouterView>
  <img
    src="https://count.getloli.com/@xiaoqvan.github.io?name=xiaoqvan.github.io&theme=rule34&padding=9&offset=0&align=top&scale=1&pixelated=1&darkmode=auto"
    alt="tj" style="display: none;">
</template>

<style scoped>
.topbar {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
