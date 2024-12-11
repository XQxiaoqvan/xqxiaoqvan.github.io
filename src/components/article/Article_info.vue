<script setup name="Article_info">
import Config from '@/config/Config';
</script>
<template>
  <!-- 左边信息 -->
  <div class="content__left">
    <!-- 博客信息 -->
    <div class="info Theme_colors">
      <!-- 头像 -->
      <img :src="Config.avatarUrl" alt="头像" />
      <div class="info_name">
        <h1>{{ Config.blog }}</h1>
        <!-- 简介 -->
        <div class="info__desc">
          <p v-html="Config.blogDescription"></p>
        </div>
        <!-- 社交链接 -->
        <div class="info__social">
          <div v-for="link in Config.socialLinks" :key="link.href">
            <a :href="link.href" :title="link.title" target="_blank"><i :class="`fa-brands ${link.icon}`"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 左区域 */

.content__left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}

/* 信息 */

.info {
  width: 100%;
  border-radius: 10px;
}

.info img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.info_name {
  text-align: center;
  padding: 10px;
}

.info_name h1 {
  font-size: 25px;
}

.info__desc {
  margin-top: 5px;
}

.info__social {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 10px;
}

.info__social div {
  background-color: rgba(255, 255, 255, 0.306);
  border-radius: 10px;
  width: 30px;
  height: 30px;
  margin: 0 10px;
}

.info__social a {
  text-decoration: none;
  color: inherit;
}
</style>
