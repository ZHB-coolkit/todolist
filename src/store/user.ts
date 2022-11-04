import { defineStore } from 'pinia'

import Crypto from '@/utils/crypto'
import storage from '@/utils/storage'

import { login } from '@/api/v1/user'

import { ACCESS_TOKEN } from '@/constant/storage-key'

interface IUserInfo {
  username: string,
  password: string
}

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      accessToken: '',
      name: ''
    }
  },
  actions: {

    /**
     * 登录
     * @param userInfo 
     * @returns 
     */
    async login(userInfo: IUserInfo) {
      const { username, password } = userInfo
      const encryptPassword = Crypto.encrypt(password)
      let res
      try {
        res = await login({ username, password: encryptPassword})
      } catch (error) {
        return Promise.reject(error)
      }
      const { accessToken } = res.data
      // @ts-ignore
      storage.set(ACCESS_TOKEN, accessToken, new Date().getTime() + 24 * 60 * 60 * 1000)
      this.accessToken = accessToken
      return Promise.resolve(res)
    },

    /**
     * 重置 token
     * @returns 
     */
    resetToken() {
      return new Promise((resolve, reject) => {
        try {
          storage.clearAll()
          this.accessToken = ''
          resolve(null)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})
