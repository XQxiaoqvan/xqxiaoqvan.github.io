<template>
  <div id="custom-toast-container"></div>
</template>

<script setup>
// 不需要任何特殊的逻辑，容器会在需要时动态创建
</script>

<style>
#custom-toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.custom-toast {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
}

.custom-toast.fade-out {
  animation: fadeOut 0.3s ease forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
