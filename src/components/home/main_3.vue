<script setup lang="ts" name="main_3">

import Music from "@/components/home/Music.vue";
import { ref, onMounted } from 'vue';

const timeText = ref<string>('00:00:00');
const dateText = ref<string>('0000 年 0 月 00 日');
const weekdayText = ref<string>('星期一');

const updateTime = (): void => {
    const now = new Date();
    timeText.value = now.toLocaleTimeString();
    dateText.value = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日`;
    weekdayText.value = `星期${'日一二三四五六'.charAt(now.getDay())}`;
};

onMounted((): void => {
    updateTime();
    setInterval(updateTime, 1000);
});
</script>
<template>
    <!-- 第三屏 -->
    <div class="main-3">
        <!-- 时间 -->
        <div class="timeshow  Theme_colors Frosted_glass " id="time">
            <span class="time-text">{{ timeText }}</span>
            <div class="time-info">
                <span>{{ dateText }}</span>
                <span class="weekday">{{ weekdayText }}</span>
            </div>
        </div>
        <!-- 音乐播放器 -->
        <Music />
        <!-- 天气 -->
        <div class="weather Frosted_glass Theme_colors">
            <div class="weather-icon">
                <img id="weather-icon" src="https://weather.cma.cn/static/img/w/icon/w0.png" alt="weather">
            </div>
            <div class="weather-content">
                <span id="city_text">天气</span>&nbsp;
                <span id="wea_text">加载</span>&nbsp;
                <span id="tem_text"></span>
                <span id="win_text">失败</span>
                <span id="win_speed"></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'UnidreamLED';
    src: url('@/assets/font/UnidreamLED.ttf') format('truetype');
}

/* 第三屏 */

.main-3 {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

/* 时间 */

.timeshow {
    box-sizing: border-box;
    width: 100%;
    padding: 14px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.time-text {
    font-size: 55px;
    font-family: 'UnidreamLED', sans-serif;
    margin: 0;
}

.time-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 70px;
}


/* 天气 */

.weather {
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    width: 100%;
}

.weather-icon img {
    width: 80px;
    height: 80px;
    margin: 0 18px;
}

.weather-content {
    margin: 0 18px;
}
</style>