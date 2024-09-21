<!-- 这里是顶部栏 -->
<script setup lang="ts" name="Top_bar">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import Config from '@/config/Config';

const { title } = Config;
const isNightMode = ref(false);
const isHidden = ref(false);
let lastScrollY = window.scrollY;

function toggleNightMode() {
    isNightMode.value = !isNightMode.value;
    document.dispatchEvent(new CustomEvent('toggleNightMode', { detail: isNightMode.value }));
}

function handleScroll() {
    if (window.scrollY > lastScrollY) {
        isHidden.value = true;
    } else {
        isHidden.value = false;
    }
    lastScrollY = window.scrollY;
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>


<template>
    <div :class="['top', 'Theme_colors', 'Frosted_glass', { hidden: isHidden }]">
        <div class="topbar">
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
            <!-- 主题切换 -->
            <div class="topbar_info">
                <div class="info" @click="toggleNightMode">
                    <i :class="isNightMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* 去链接样式 */
.tag {
    text-decoration: none;
    color: inherit;
}

/* 顶部栏背景 */
.top {
    width: 100%;
    border-radius: 0 0 20px 20px;
    box-sizing: border-box;
    transform: translateY(-5px);
    transition: transform 0.3s ease;
    position: fixed;
    max-width: 80%;
    z-index: 100;
}

/* 现有代码 */
.hidden {
    transform: translateY(-100%);
    transition: transform 0.3s ease;
}

.top:hover {
    transform: translateY(0px);
    transition: transform 0.3s ease;
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
    background-color: rgba(192, 192, 192, 0.2);
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

.active {
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 5px 5px rgba(104, 104, 104, 0.16);
}
</style>