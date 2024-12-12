<template>
  <span ref="textRef" class="msg"></span>
</template>

<script setup name="typeit">
import { ref, onMounted } from "vue";
import TypeIt from 'typeit'

const textRef = ref(null);

const props = defineProps({
  text: {
    type: String,
  }
})

onMounted(() => {
  new TypeIt(textRef.value, {
    strings: props.text,
    cursorChar: "<span class='cursorChar'>_<span>", // 用于光标的字符。HTML也可以
    speed: 70,
    lifeLike: true, // 使打字速度不规则
    cursor: true, // 在字符串末尾显示闪烁的光标
    breakLines: false, // 控制是将多个字符串打印在彼此之上，还是删除这些字符串并相互替换
    // loop: true, // 是否循环
  }).go()
})
</script>

<style scoped>
.msg {
  color: var(--el-color-info-light-3);
  letter-spacing: 2px;
}

::v-deep(.cursorChar) {
  display: inline-block;
  margin-left: 2px;
}
</style>
