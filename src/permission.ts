import router from './router'
import storage from 'store' 
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { ACCESS_TOKEN } from '@/constant/storage-key'

const loginRoutePath = '/login'
const defaultRoutePath = '/'

const whiteList = ['/login']

// 模拟鉴权
const isAuthenticated = (): boolean => {
  /* has token */
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    return true
  }
  return false
}

router.beforeEach((to, _from, next) => {
  NProgress.start() // start progress bar
  if (isAuthenticated()) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
      NProgress.done()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})
