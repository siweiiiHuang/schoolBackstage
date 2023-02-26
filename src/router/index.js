import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
    redirect: '/allPaper',
    children: [
      {
        path: '/allPaper',
        name: 'AllPaper',
        component: () => import('../views/allPaper/index.vue')
      },
      {
        path: '/carousel',
        name: 'Carousel',
        component: () => import('../views/carousel/index.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
