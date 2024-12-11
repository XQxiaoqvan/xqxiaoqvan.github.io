<script setup lang="ts" name="main_2">
import { onMounted, reactive } from 'vue';
import { fetchCalendarData } from '@/assets/js/anime';

const calendarData = reactive([]);

onMounted(async () => {
  try {
    const data = await fetchCalendarData();
    calendarData.push(...data);
    handleDynamicContent();
    addScrollListener();
  } catch (error) {
    console.error('数据获取失败:', error);
  }
});

function handleDynamicContent() {
  const today = (new Date().getDay() + 6) % 7 + 1; // 将星期天(0)转换为7，其余的加1

  setTimeout(() => {
    const fanjvTimesDivs = document.querySelectorAll<HTMLDivElement>('.fanjv-times div');
    const dayContainers = document.querySelectorAll<HTMLDivElement>('.day-container');

    const todayDiv = fanjvTimesDivs[today - 1]?.querySelector('p'); // 调整索引
    if (todayDiv) {
      todayDiv.classList.add('dqxq');
    }

    dayContainers.forEach(container => container.style.display = 'none');
    const todayContainer = document.getElementById('day-' + today);
    if (todayContainer) {
      todayContainer.style.display = 'block';
    }

    fanjvTimesDivs.forEach((div, index) => {
      div.addEventListener('click', () => {
        dayContainers.forEach(container => container.style.display = 'none');
        const dayContainer = document.getElementById('day-' + (index + 1)); // 调整索引
        if (dayContainer) {
          dayContainer.style.display = 'block';
        }
        fanjvTimesDivs.forEach(d => {
          const p = d.querySelector('p');
          if (p) {
            p.classList.remove('dqxq');
          }
        });
        const p = div.querySelector('p');
        if (p) {
          p.classList.add('dqxq');
        }
      });
    });
  }, 1000);
}

function addScrollListener() {
  const container = document.querySelector<HTMLDivElement>('.fanjv-main');
  if (container) {
    container.addEventListener('wheel', function (e) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }, { passive: false });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const fanjvDiv = document.getElementById('fanjv');

  fetch('fanjv/index.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const fanjvPythonElement = doc.getElementById('fanjv-python');

      if (fanjvPythonElement) {
        if (fanjvDiv) {
          fanjvDiv.innerHTML = '';
          fanjvDiv.appendChild(fanjvPythonElement.cloneNode(true));
        } else {
          console.error('未找到目标元素');
        }
      } else {
        console.error('未找到目标元素');
      }
    })
    .catch(error => console.error('获取HTML内容失败', error));
});

</script>
<template>
  <div class="main-2">
    <!-- 番剧 -->
    <div class="fanjv">
      <div id="fanjv" class="fanjv-timeshow">
        <div class='fanjv-all' id='fanjv-python'>
          <div class='fanjv-top'>
            <div class='fanjv-top-1'>
              <div class='fanjv-header'>
                <h1>今日番剧</h1>
              </div>
              <div class='fanjv-scrq'>
                <RouterLink to="/anime" class="fanjv-scrq-1">详细页面</RouterLink>
              </div>
            </div>
          </div>
          <div class='fanjv-times'>
            <div v-for="(day, index) in calendarData" :key="index">
              <p class='today-header'><span id='xq'></span>{{ day.weekday.cn }}</p>
            </div>
          </div>
          <div class='fanjv-main'>
            <div v-for="(day, index) in calendarData" :key="index" :id="'day-' + day.weekday.id" class='day-container'>
              <div class='anime-list'>
                <div v-for="anime in day.items" :key="anime.id" class='anime-item'>
                  <img
                    :src="anime.images?.large ? anime.images.large : 'https://dummyimage.com/350x600/cccccc/ffffff&text=%E6%97%A0%E5%B0%81%E9%9D%A2'"
                    alt="anime.name" class='anime-image' />
                  <p class='anime-title'>{{ anime.name_cn || anime.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 第二屏 */

.main-2 {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.557);

}

.fanjv {
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
}

.fanjv-main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  border-radius: 5px;
}


/* 自定义滚动条样式 */

.fanjv-main::-webkit-scrollbar {
  width: 15px;
  height: 5px;
}

.fanjv-main::-webkit-scrollbar-thumb {
  background-color: #585858;
  border-radius: 6px;
}

.fanjv-main::-webkit-scrollbar-track {
  background-color: #f1f1f100;
}

.fanjv-top {
  box-sizing: border-box;
  width: 100%;
}

.fanjv-top-1 {
  /* 定义背景颜色变量 */
  border-radius: 0 0 7px 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px;
}

.fanjv-all {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.anime-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.anime-image {
  width: 100px;
  height: 135px;
  object-fit: cover;
  border-radius: 10px;
}

.fanjv-header h1 {
  margin: 0;
  font-size: 20px;
}

.fanjv-scrq p {
  margin: 0;
  font-size: 15px;
}

.fanjv-times {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 3px;
}

.fanjv-times p {
  margin: 0 3px;
  font-size: 17px;
}

.anime-title {
  width: 105px;
  /* 设置文本显示的宽度 */
  white-space: nowrap;
  /* 禁止换行 */
  overflow: hidden;
  /* 超出部分隐藏 */
  text-overflow: ellipsis;
  /* 超出部分用省略号表示 */
  font-size: 13px;
}

.day-container {
  padding: 5px;
}

.dqxq {
  border-radius: 5px 5px 0 0 !important;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.557) !important;
}

.fanjv-scrq-1 {
  text-decoration: none;
  padding: 2px 5px;
  color: #fff;
}

.fanjv-scrq-1:hover {
  text-decoration: underline;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.557);
}

.today-header {
  padding: 0 3px;
}

.today-header:hover {

  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.557);
}
</style>
