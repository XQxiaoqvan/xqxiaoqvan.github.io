<!-- 文章 -->
<script setup name="ArticleView">
import Article_info from '@/components/article/Article_info.vue';
import Article_list from '@/components/article/Article_list.vue';
import Footer from "@/components/Footer/Footer.vue";
import background from "@/components/formerbg.vue"
</script>

<template>
  <background />
  <div class="box">
    <div class="box1">
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
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box1 {
  display: flex;
  width: 80%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  width: 120%;
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
