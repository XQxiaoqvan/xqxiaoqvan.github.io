<script setup name="HomeView">
import background from "@/components/background.vue";
import anime from "@/components/home/main_2.vue";
import getHitokoto from "@/assets/js/hitokoto";
import { ref, onMounted, watch } from "vue";
import { me } from '@/config/info';
import typeit from "@/components/typeit.vue";
import { Footer } from '@/config/Footer'

const { icp, footername, footerlink, beian_enabled, beian_link, beian_imgSrc, beian_text } = Footer


const componentKey = ref(0);
const hitokoto = ref({
  hitokoto: "权酱是个大吃货",
  creator: "xiaoqvan",
});

onMounted(() => {
  getHitokoto().then((res) => {
    hitokoto.value = res;
  });
});
watch(hitokoto, () => {
  componentKey.value++;
});
</script>

<template>
  <div class="main">
    <background />
    <div class="card">
      <div class="me">
        <div class="me-avatar">
          <img src="../assets/img/tx.png" alt="">
        </div>
        <div class="info">
          <p class="name">{{ me.name }}</p>
          <p class="bio">{{ me.introduction }}</p>
        </div>
      </div>
      <!-- 社交链接 -->
      <div class="social">
        <div v-for="link in me.socialLinks" :key="link.href" class="social-item">
          <a class="no-link" :href="link.href" :title="link.title" target="_blank">
            <i :class="`fa-brands ${link.icon}`"></i>
          </a>
        </div>
      </div>
      <!-- 一言 -->
      <div class="hitokoto">
        <p class="hitokoto-text">{{ hitokoto.hitokoto }}</p>
        <div class="hitokoto-from">-「 <span>{{ hitokoto.creator }}</span> 」</div>
      </div>
      <div class="anime">
        <anime />
      </div>
    </div>
    <div class="main-tile">
      <h1 class="hitokoto-text">
        <typeit :key="componentKey" :text="hitokoto.hitokoto" />
      </h1>
      <h2 class="hitokoto-from">-「 <span>{{ hitokoto.creator }}</span> 」</h2>
    </div>
  </div>
  <div>
    <footer>
      <div class="footer-content">
        <!-- 版权信息 -->
        <span id="power">Copyright&nbsp;&copy;
          {{ currentYear }}
          <a v-if="showFooterName && footername.toLowerCase() !== 'xiaoqvan'" :href="footerlink" id="power-text">{{
            footername }}</a>
        </span>
        <!-- 网站模板作者信息 -->
        <span class="made" id="made">&nbsp;&amp;&nbsp;Made&nbsp;by&nbsp;<a rel="noopener"
            href="https://github.com/XQxiaoqvan/xqxiaoqvan.github.io" target="_blank">xiaoqvan</a></span>
        <!-- 备案信息 -->
        <span v-if="icp">&nbsp;&amp;&nbsp;</span>
        <a v-if="icp && icp.trim() !== ''" rel="noopener" href="https://beian.miit.gov.cn" id="beian" target="_blank">{{
          icp }}</a>
        <!-- 公安备案 -->
        <span v-if="showBeian">&nbsp;&amp;&nbsp;<a :href="beian_link" target="_blank">
            <img style="width: 20px; height: 20px; transform: translateY(+3px);" :src="beian_imgSrc" alt="beian">
            <span>{{ beian_text }}</span>
          </a></span>
      </div>
    </footer>
  </div>
</template>


<style scoped>
.topbar {
  width: 100%;
  display: flex;
  justify-content: center;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;

  .card {
    position: absolute;
    top: 80px;
    width: 550px;
    height: 80%;
    margin: 20px 20px 20px 50px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

  }

  .me {
    display: flex;
    gap: 20px;
    border-radius: 15px;

    .me-avatar {
      width: 100px;
      height: 100px;

      overflow: hidden;
      padding: 10px;

      img {
        user-select: none;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 0 10px 0 rgba(104, 104, 104, 0.2);
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .name {
        font-size: 30px;
        font-weight: bold;
        color: #fff;
      }

      .bio {
        font-size: 15px;
        color: #fff;
      }
    }
  }


  .hitokoto {
    padding: 10px;
    border-radius: 15px;
    color: #fff;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .hitokoto-text {
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hitokoto-from {
      text-align: right;
    }
  }

  .social {
    display: flex;
    padding: 10px;
    border-radius: 15px;
    color: #fff;

    .social-item {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      margin: 0 10px;
      font-size: 20px;
      color: var(--home-font-color);
      cursor: pointer;

      a {
        color: var(--home-font-color);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 10px 6px rgba(104, 104, 104, 0.591);
        transform: translateY(-1px) scale(1.01);
        transition: transform 0.3s ease;
      }
    }
  }

  .anime {
    box-sizing: border-box;
  }
}

.main-tile {
  position: absolute;
  top: 350px;
  left: 800px;
  color: #fff;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .hitokoto-from {
    text-align: right;
  }

}
</style>
