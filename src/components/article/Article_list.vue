<script setup lang="ts" name="Article_list">
import { ref } from 'vue';

interface Article {
    title: string;
    date: string;
    category: string;
    tags: string[];
    summary: string;
    link: string;
    image: string;
}

// 动态导入所有 Markdown 文件
const articles = ref<Article[]>([]);
const modules = import.meta.glob<{ frontmatter: Article }>('@/config/Article/*.md');

for (const path in modules) {
    modules[path]().then((mod) => {
        const article = mod.frontmatter;
        articles.value.push(article);
        // 按日期排序
        articles.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
}

// 格式化日期函数
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    const [fullDate, time] = isoString.split('T');
    const [hours, minutes] = time.split(':');
    return `${fullDate} ${hours}:${minutes}`;
}
</script>

<template>
    <div class="content__right">
        <!-- 遍历文章列表 -->
        <div v-for="(article, index) in articles" :key="index" class="article Theme_colors Frosted_glass">
            <div class="article1">
                <div class="">
                    <h1>{{ article.title }}</h1>
                </div>
                <div class="article_info">
                    <div>
                        <p>{{ formatDate(article.date) }}</p>
                    </div>
                    <div>
                        <p>{{ article.category }}</p>
                    </div>
                </div>
                <div class="article_tap">
                    <div v-for="(tag, tagIndex) in article.tags" :key="tagIndex">
                        <p>{{ tag }}</p>
                    </div>
                </div>
                <div class="article_desc">
                    <p>{{ article.summary }}</p>
                </div>
            </div>
            <a class="article_img" :href="article.link">
                <img :src="article.image" alt="文章图片" />
            </a>
        </div>
    </div>
</template>
<style scoped>
/* 右区域 */

.content__right {
    margin-left: 10px;
    box-sizing: border-box;
    width: 100%;
}

/* 每一篇文章 */

/* 基础样式 */
.article {
    display: flex;
    width: 100%;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
}

.article1,
.article_img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* 垂直居中 */
}

.article1 {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.article_img {
    flex: 0 0 35%;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
}

.article_img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

.article_img:empty+.article1 {
    flex: 1;
}

.article_info,
.article_tap {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}
</style>