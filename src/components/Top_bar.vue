<!-- 这里是顶部栏 -->
<script setup name="Top_bar">
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';
import Config from '@/config/Config';
import Music from "@/components/home/Music.vue";

const { title } = Config;
const route = useRoute();

const isHome = computed(() => route.name === 'home' || route.path === '/');
</script>


<template>
  <div :class="['top', { 'home-style': isHome, 'other-style Theme_colors': !isHome }]">
    <div class="topbar">
      <div class="left">
        <!-- 标题 -->
        <div class="topbar_title">
          <h1>{{ title }}</h1>
        </div>
        <!-- 导航标签 -->
        <div class="topbar_tag">
          <RouterLink to="/home" class="tag" active-class="active">首页</RouterLink>
          <RouterLink to="/article" class="tag" active-class="active">博客</RouterLink>
          <RouterLink to="/games" class="tag" active-class="active">游戏</RouterLink>
          <RouterLink to="/anime" class="tag" active-class="active">动漫</RouterLink>
          <!-- <RouterLink to="/about" class="tag" active-class="active">关于</RouterLink> -->
        </div>
      </div>
      <div class="right">
        <Music />
      </div>
    </div>
  </div>
</template>


<style scoped>
.tag {
  text-decoration: none;
  color: inherit;
}


.top {
  width: 100%;
  box-sizing: border-box;
  transform: translateY(-5px);
  transition: transform 0.3s ease, background-color 0.5s ease, border-radius 0.3s ease, max-width 0.3s ease, margin-top 0.3s ease, color 0.3s ease;
  position: fixed;
  z-index: 100;
}

.home-style {
  border-radius: 15px;
  max-width: 95%;
  margin-top: 10px;
  color: #c7c7c7;
}

.other-style {
  border-radius: 0 0 20px 20px;
  max-width: 80%;
}

.top:hover {
  background-color: rgba(255, 255, 255, 0.800);
  box-shadow: 0 0 10px 6px rgba(104, 104, 104, 0.591);
  color: #000;
}

.left {
  display: flex;
  gap: 50px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  padding: 10px 20px 10px 20px;

}

.topbar_title h1 {
  text-align: center;
  font-size: 25px;
  /* 渐变背景 */
  background-image: linear-gradient(90deg, #2af5e4 10%, #009efd 100%);

  /* 文字阴影 */
  text-shadow: 1px 1px 5px rgba(0, 229, 255, 0.632);

  /* 确保文字不透明度为100%，避免与背景混合 */
  color: transparent;

  /* 使用背景作为文字颜色 */
  -webkit-background-clip: text;
  background-clip: text;
}

/* 标签背景 */
.tag {
  /* background-color: rgba(192, 192, 192, 0.2); */
  padding: 10px;
  border-radius: 6px;

}

.tag:hover {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 5px 5px rgba(104, 104, 104, 0.16);
  transform: translateY(-1px);
  transition: transform 0.3s ease;
}

/* 登录信息栏 */
.topbar_info {
  width: 50px;
  height: 50px;

}

.info {
  width: 100%;
  height: 100%;
  cursor: pointer;

}

.info i {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info i:hover {
  box-shadow: 0 0 10px 6px rgba(104, 104, 104, 0.591);
  transform: translateY(-1px) scale(1.01);
  transition: transform 0.3s ease;
}


.topbar_tag {
  display: flex;
  gap: 5px;
}
</style>
