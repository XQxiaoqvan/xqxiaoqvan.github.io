<script setup name="HomeView">
import background from "@/components/background.vue";
import anime from "@/components/home/main_2.vue";
import getHitokoto from "@/assets/js/hitokoto";
import { ref, onMounted, watch } from "vue";
import Config from '@/config/Config';
import typeit from "@/components/typeit.vue";

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
          <p class="name">{{ Config.name }}</p>
          <p class="bio">{{ Config.introduction }}</p>
        </div>
      </div>
      <!-- 社交链接 -->
      <div class="social">
        <div v-for="link in Config.socialLinks" :key="link.href" class="social-item">
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
