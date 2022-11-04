import axios from 'axios'
import { userStore } from '@/store/user'
import storage from './storage'
import { message, Modal } from 'ant-design-vue'
import { ACCESS_TOKEN } from '@/constant/storage-key'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    const accessToken = storage.get(ACCESS_TOKEN)
    if (accessToken) {
      config.headers!['authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    const { code, msg } = res
    if (code !== 0) {
      message.error({
        content: msg,
        duration: 5
      })

      if ([401, 402].includes(code)) {
        Modal.confirm({
          content: 'You have been logged out, you can cancel to stay on this page, or log in again',
          async onOk() {
            const useUserStore = userStore()
            await useUserStore.resetToken()
            location.reload()
          }
        })
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    message.error({
      content: error.message,
      duration: 5
    })
    return Promise.reject(error)
  }
)

export default service