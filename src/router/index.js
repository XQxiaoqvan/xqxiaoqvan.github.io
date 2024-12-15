import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/Article.vue'),
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/Games.vue'),
    },
    {
      path: '/anime',
      name: 'anime',
      component: () => import('../views/Anime.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // 捕获所有未定义路径
      name: 'NotFound',
      component: () => import('../views/404.vue'), // 404页面组件
    },
  ],
})

export default router
