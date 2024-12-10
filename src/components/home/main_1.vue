<script setup name="main_1">
import { ref, onMounted } from 'vue';
import axios from "axios";
import Config from '@/config/Config';
import { showToast } from '@/utils/toast';

const hitokotoText = ref('权酱是个大吃货');
const fromText = ref('xiaoqvan');
const HITOKOTO_EXPIRATION = 3600000; // 1小时
let lastFetchTime = 0;

// 获取一言
const fetchHitokoto = async () => {
  const now = Date.now();
  if (now - lastFetchTime < 2000) {
    showToast('不能点击太快了哦');
    return;
  }
  lastFetchTime = now;
  try {
    const response = await axios.get('https://v1.hitokoto.cn?max_length=19');
    const data = response.data;
    hitokotoText.value = data.hitokoto;
    fromText.value = data.from;
    sessionStorage.setItem('hitokoto', JSON.stringify({ ...data, timestamp: Date.now() }));
  } catch (error) {
    console.error(error);
    showToast('获取一言失败');
  }
};

// 在组件挂载后立即获取一言
onMounted(() => {
  const storedHitokoto = sessionStorage.getItem('hitokoto');
  if (storedHitokoto) {
    const data = JSON.parse(storedHitokoto);
    if (Date.now() - data.timestamp < HITOKOTO_EXPIRATION) {
      hitokotoText.value = data.hitokoto;
      fromText.value = data.from;
    } else {
      fetchHitokoto();
    }
  } else {
    fetchHitokoto();
  }
});
</script>
<template>
  <!-- 第一屏 -->
  <div class="tx-all">
    <!-- 基本信息 -->
    <div class="tx Theme_colors Frosted_glass">
      <img :src="Config.avatarUrl" alt="头像">
      <h1>{{ Config.name }}</h1>
      <div class="tx-content">
        <div class="tx-content">
          <p v-html="Config.introduction"></p>
        </div>
      </div>
    </div>
    <!-- 一言 -->
    <div class="hitokoto-all Theme_colors Frosted_glass" id="hitokoto-content" @click="fetchHitokoto">
      <div class="hitokoto-text"><span id="hitokoto_text">{{ hitokotoText }}</span></div>
      <div class="hitokoto-from">-「 <span id="from_text">{{ fromText }}</span> 」</div>
    </div>
    <!--社交链接-->
    <div class="relation">
      <div v-for="link in Config.socialLinks" :key="link.href" class="Theme_colors Frosted_glass">
        <a :href="link.href" :title="link.title" target="_blank">
          <i :class="`fa-brands ${link.icon}`"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.tx-all {
  width: 100%;
  height: auto;
  transition: display 0.5s ease;
  /* 添加过渡效果 */

}

/* 头像 */

.tx {
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 0px;
}

.tx img {
  margin-top: 30px;
  width: 150px;
  height: 150px;
  border-radius: 500px;
}

.tx h1 {
  margin-top: 0;
  margin-bottom: 10px;
}

.tx-content {
  margin-bottom: 10px;
}

.tx-content p {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

/* 一言 */

.hitokoto-all {
  border-radius: 20px;
  height: 100%;
  padding: 20px;
  margin: 10px 0;
  transition: transform 0.3s ease;
}

.hitokoto-text {
  text-align: left;
}

.hitokoto-from {
  text-align: right;
}

.hitokoto-all:hover {
  transform: scale(1.01);
  transition: transform 0.3s ease;
}

/* 社交信息 */

.relation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.relation div {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  margin: 0 10px;
}

.relation i {
  font-size: 26px;
}

.relation a {
  text-decoration: none;
  color: inherit;
}
</style>
