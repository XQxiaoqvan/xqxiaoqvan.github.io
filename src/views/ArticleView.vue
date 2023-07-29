<!-- 文章 -->
<script setup lang="ts" name="ArticleView">
import Article_info from '@/components/article/Article_info.vue';
import Article_list from '@/components/article/Article_list.vue';
import Footer from "@/components/Footer/Footer.vue";
</script>

<template>
  <div class="main">
    <div class="container Theme_colors">
      <!-- 主内容区域 -->
      <div class="main__content">
        <!-- 左边信息 -->
        <Article_info />
        <!-- 右边文章 -->
        <Article_list />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  width: 130%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  padding: 30px;
  border-radius: 10px;
}

/* 主内容区 */

.main__content {
  display: flex;
  width: 100%;
  box-sizing: border-box;
}
</style>
