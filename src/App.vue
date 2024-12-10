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
</template>

<style scoped>
.topbar {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
