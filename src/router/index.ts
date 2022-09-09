import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 鉴权
const isAuthenticated = (): boolean => {
  return true
}

router.beforeEach((to, _from, next) => {
  if (to.path !== '/login' && !isAuthenticated()) {
    next(`/login?redirect=${to.path}`)
  }
  next()
})

export default router