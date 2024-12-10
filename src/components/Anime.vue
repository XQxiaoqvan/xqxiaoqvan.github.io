<!-- 动画页面 -->
<!-- api接口：Bangumi -->
<script setup name="anime">
import { onMounted, reactive } from 'vue';
import { CalendarDay } from '@/assets/js/anime';
import { fetchCalendarData } from '@/assets/js/anime';

const calendarData = reactive([]);

onMounted(async () => {
  try {
    const data = await fetchCalendarData();
    calendarData.push(...data);
  } catch (error) {
    console.error('数据获取失败:', error);
  }
});
</script>

<template>
  <div class="main">
    <div class="anime_main Theme_colors">
      <h1>番剧日历</h1>
      <div v-for="day in calendarData" :key="day.weekday.id">
        <h2>{{ day.weekday.cn }}</h2>
        <div class="anime_list">
          <div v-for="item in day.items" :key="item.id">
            <div class="anime">
              <a :href="item.url" target="_blank">
                <img
                  :src="item.images && item.images.large ? item.images.large : 'https://dummyimage.com/350x600/cccccc/ffffff&text=%E6%97%A0%E5%B0%81%E9%9D%A2'"
                  alt="封面图">
              </a>
              <div class="anime_text">
                {{ item.name_cn ? item.name_cn : item.name }} - 评分：
                {{ item.rating && item.rating.score ? item.rating.score : '暂无' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.anime_main {
  border-radius: 20px;
  display: flex;
  width: 82%;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  margin-top: 200px;
  margin-bottom: 100px;
}

.anime_list {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.anime {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* 新增：为父元素添加相对定位 */
  border-radius: 10px;
  margin: 5px;
}

.anime:hover {
  box-shadow: 0 0 10px 6px rgba(104, 104, 104, 0.591);
  transform: translateY(-1px) scale(1.01);
  transition: transform 0.3s ease;
}

.anime_text {
  /* 新增：控制文本显示的样式 */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.354);
  /* 半透明背景增加可读性 */
  color: white;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  overflow-wrap: break-word;
  transform: translateY(-3px);
  border-radius: 10px;
  /* 确保文本换行 */
}
</style>
