import storage from '@/utils/storage'
import { defineStore } from 'pinia'
import Crypto from '@/utils/crypto'
import { ACCESS_TOKEN } from '@/constant/storage-key'

interface IUserInfo {
  username: string,
  password: string
}

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      token: '',
      name: ''
    }
  },
  actions: {
    // 登录
    login(userInfo: IUserInfo) {
      return new Promise((resolve, _reject) => {
        // 代替异步请求
        const { username, password } = userInfo
        if (username === 'admin' && Crypto.encrypt(password) === Crypto.encrypt('123456')) {
          const token = Crypto.encrypt(username)
          storage.set(ACCESS_TOKEN, token, new Date().getTime() + 24 * 60 * 60 * 1000)
          this.token = token
          resolve({
            error: 0,
            msg: 'login success!',
            data: {}
          })
        } else {
          resolve({
            error: 401,
            msg: 'username or password is incorrect!',
            data: {}
          })
        }
      })
    }
  }
})

