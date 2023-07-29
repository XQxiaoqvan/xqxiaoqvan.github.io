<script setup lang="ts" name="HomeView">
import Footer from "@/components/Footer_bar.vue";
import Main1 from "@/components/home/main_1.vue";
import Main2 from "@/components/home/main_2.vue";
import Main3 from "@/components/home/main_3.vue";
</script>

<template>
    <div class="main-all">
        <div class="main">
            <keep-alive>
                <Main1 />
            </keep-alive>
            <keep-alive>
                <Main2 />
            </keep-alive>
            <keep-alive>
                <Main3 />
            </keep-alive>

        </div>
    </div>
    <!-- 底部栏 -->
    <div>
        <Footer />
    </div>
</template>


<style scoped>
.main-all {
    overflow: hidden;
    margin: 200px 0;
}

.main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 190px;
    height: 100%;
}

@media (min-width: 1500px) and (min-height: 800px) {
    .main-all {
        overflow: hidden;
        margin: 150px 0;
        transition: display 0.5s ease;
    }
}
</style>