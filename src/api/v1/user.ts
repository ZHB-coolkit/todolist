import request from '@/utils/request'
import { version, prefix } from './common'
import EHttpMethod from '@/ts/enum/EHttpMethod'

const userApi = {
  Login: `${prefix}/${version}/user/login`
}

interface LoginParameter {
  username: string,
  password: string
}

/**
 * 登录
 * @param parameter 
 * @returns 
 */
const login = (parameter: LoginParameter) => {
  return request({
    url: userApi.Login,
    method: EHttpMethod.POST,
    data: parameter
  })
}

export {
  login
}
