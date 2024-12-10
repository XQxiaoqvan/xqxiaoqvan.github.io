<script setup name="GamesView">
import Footer from "@/components/Footer_bar.vue";
import Config from '@/config/Config';
import background from "@/components/formerbg.vue"
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {

  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}
</script>

<template>
  <background />
  <div class="box">
    <div class="box1">
      <div class="game_list">
        <div v-for="(game, index) in Config.games" :key="index" class="game_box Frosted_glass Theme_colors">
          <div class="info">
            <div class="avatar">
              <img :src="game.avatar" alt="tx">
            </div>
            <div class="game_data">
              <div class="name">
                <h1>{{ game.playerName }}</h1>
              </div>
              <p>{{ game.playerLevel }}</p>
              <div class="game_active">
                <div v-for="(active, idx) in game.gameActive" :key="idx" class="game_active_data">
                  <p>{{ active.value }}</p>{{ active.label }}
                </div>
              </div>
            </div>
          </div>
          <div class="game_info">
            <div class="game_name">
              <img class="game_img" :src="game.gameIcon" alt="游戏图标">
              <div class="game_name_text">{{ game.gameName }}</div>
            </div>
            <div class="game_uid">
              <p>{{ game.gameServer }}</p>
              <p>&nbsp;|&nbsp;</p>
              <p class="copy_uid" @click="copyToClipboard(game.gameUID)">{{ game.gameUID }}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box1 {
  display: flex;
  width: 80%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
}

.game_list {
  display: flex;
  gap: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  flex-direction: row;
  max-width: 80%;
  margin-top: 200px;
}

.game_box {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  width: 320px;
}

.game_box:hover {
  box-shadow: 0 0 10px 6px rgba(74, 74, 74, 0.591);
  transform: translateY(-1px);
  transition: transform 0.3s ease;
}

.info {
  display: flex;
  box-sizing: border-box;
  width: 100%;
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 40%;
  justify-content: center;
}

.avatar img {
  max-width: 100%;
  /* 图片最大宽度为容器宽度 */
  max-height: 100%;
  /* 图片最大高度为容器高度 */
  border-radius: 50%;
}

.game_data {
  margin-left: 10px;
  box-sizing: border-box;
  width: 100%;
}

.game_active {
  display: flex;
  justify-content: space-around;
}

.game_active_data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.306);
  box-shadow: 0px 0px 5px 0px rgba(104, 104, 104, 0.591);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  font-size: 14px;
}

.game_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #acacac;
  /* 添加一条顶部边框作为分隔线 */
}

.game_name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
}

.game_img {
  width: 25px;
  height: 25px;
  border-radius: 5px;
}

.game_uid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
}

.copy_uid:hover {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(104, 104, 104, 0.591);
}
</style>
