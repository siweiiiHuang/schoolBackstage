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
    redirect: '/checking',
    children: [
      {
        path: '/allPaper',
        name: 'AllPaper',
        component: () => import('../views/allPaper/index.vue')
      },
      {
        path: '/checking',
        name: 'Checking',
        component: () => import('~/views/checking/index.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
