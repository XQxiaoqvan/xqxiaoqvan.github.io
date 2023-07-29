import '@/assets/css/media.css'
import '@/assets/css/main.css'
import '@/assets/css/theme.css'
import '@/assets/ts/myhk';
import ToastifyPlugin from '@/assets/ts/toastify'
import { useMusic } from '@/assets/ts/music';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastifyPlugin)
useMusic();
app.mount('#app')