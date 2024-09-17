<script setup lang="ts" name="Article_list">
import { ref } from 'vue';
import tagStyles from '@/config/tag/tags.json'; // 导入 JSON 文件

interface Article {
    title: string;
    date: string;
    updated: string; // 新增字段
    category: string;
    tags: string[];
    summary: string;
    link: string;
    image: string;
    top?: number; // 新增字段
}

// 动态导入所有 Markdown 文件
const articles = ref<Article[]>([]);
const modules = import.meta.glob<{ frontmatter: Article }>('@/config/Article/*.md');

for (const path in modules) {
    modules[path]().then((mod) => {
        const article = mod.frontmatter;
        articles.value.push(article);
        // 按顶置和日期排序
        articles.value.sort((a, b) => {
            if (a.top !== undefined && b.top !== undefined) {
                return b.top - a.top;
            } else if (a.top !== undefined) {
                return -1;
            } else if (b.top !== undefined) {
                return 1;
            } else {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
        });
    });
}

// 格式化日期函数
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // 只返回日期部分
}
function getTagStyle(tag: string) {
    const style = (tagStyles as Record<string, any>)[tag] || {};
    return {
        backgroundColor: style['background-color'] ? `${style['background-color']} !important` : 'floralwhite',
        color: style['color'] ? `${style['color']} !important` : 'inherit'
    };
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
                        <p><i class="fa-solid fa-calendar-days"></i> {{ formatDate(article.date) }}
                            <span v-if="article.date !== article.updated">- <i class="fa-solid fa-pen"></i> {{
                                formatDate(article.updated) }}</span>
                        </p>
                    </div>
                    <div>
                        <p class="article_category">{{ article.category }}</p>
                    </div>
                </div>
                <div class="article_tap">
                    <div class="article_tag Frosted_glass" v-for="(tag, tagIndex) in article.tags" :key="tagIndex"
                        v-bind:style="getTagStyle(tag)">
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
.article {
    display: flex;
    width: 100%;
    height: 300px;
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

.article_tap {
    gap: 5px;
}

.article_tag {
    background-color: floralwhite;
    padding: 0 5px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.219);
}

.article_category {
    background-color: #FFE7BA;
    color: #000000;
    padding: 0 5px;
    border-radius: 5px;
    margin-left: 5px;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.219);
}
</style>