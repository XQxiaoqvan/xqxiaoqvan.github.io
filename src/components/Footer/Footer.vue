<script setup lang="ts" name="Footer">
import { ref, computed } from 'vue'
import Config from '@/config/Config'

const currentYear = ref(new Date().getFullYear())
const { icp, footername, footerlink, beian_enabled, beian_link, beian_imgSrc, beian_text } = Config

const showFooterName = computed(() => footername && footername.trim() !== '')
const showBeian = computed(() => beian_enabled)
</script>

<template>
    <div class="footer_div">
        <div class="footer-text Theme_colors Frosted_glass">
            <div>
                <!-- 版权信息 -->
                <span id="power">Copyright&nbsp;&copy;
                    {{ currentYear }}
                    <a v-if="showFooterName && footername.toLowerCase() !== 'xiaoqvan'" :href="footerlink"
                        id="power-text">{{ footername }}</a>
                </span>
                <!-- 网站模板作者信息 -->
                <span class="made" id="made">&nbsp;&amp;&nbsp;Made&nbsp;by&nbsp;<a rel="noopener"
                        href="https://github.com/XQxiaoqvan/xqxiaoqvan.github.io" target="_blank">xiaoqvan</a></span>
                <!-- 备案信息 -->
                <a v-if="icp && icp.trim() !== ''" rel="noopener" href="https://beian.miit.gov.cn" id="beian"
                    target="_blank">&nbsp;&amp;&nbsp; {{
                        icp }}</a>
                <!-- 公安备案 -->
                <span v-if="showBeian">&nbsp;&amp;&nbsp;<a :href="beian_link" target="_blank">
                        <img style="width: 20px; height: 20px; transform: translateY(+3px);" :src="beian_imgSrc"
                            alt="beian">
                        <span>{{ beian_text }}</span>
                    </a></span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer_div {
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    bottom: 0;
    width: 100%;
    margin-top: 50px;
    position: fixed;

}

.footer-text {
    display: flex;
    width: 80%;
    color: black;
    text-align: center;
    padding: 10px;
    border-radius: 15px 15px 0 0;
    box-sizing: border-box;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;
}

.footer-text:hover {
    transform: translateY(+0px);
    transition: transform 0.3s ease;
}

.build_time {
    display: flex;
    margin-top: 5px;
}

.build_time p {
    margin: 0 10px;
}

.footer_div a {
    text-decoration: none;
    color: #000;
}

.footer_div a:hover {
    background-color: #ffffffac;
    text-decoration: none;
    border-radius: 5px;
    padding: 0 5px;
}
</style>