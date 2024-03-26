/**********************************
 * @FilePath: interceptors.js
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/04 22:46:40
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { resolveResError } from './helpers'
import { sStorage } from '@/utils'
// import { useAuthStore } from '@/store'
import qs from 'qs' //引入qs模块，用于序列化post请求参数

export function setupInterceptors(axiosInstance) {
  function reqResolve(config) {
    const defaultNeedRequest = ['/main', '/getRecordMenuGrp', '/getTaskInfor', '/largeScreen']
    if (defaultNeedRequest.includes(config.url)) {
      if (!config.data) config.data = {}
      config.data = {
        SYSTEMTELLERNO: sStorage.get('userInfo').SYSTEMTELLERNO,
        SYSTEMKEYNAME: sStorage.get('userInfo').SYSTEMKEYNAME,
        ...config.data,
      }
    }
    console.log('request config0:', config.data)
    if (config.method === 'post' && config.data) {
      // 设置请求头 发送的数据是x-www-form-urlencoded 格式
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = qs.stringify(config.data)
    }
    console.log('request:', config)
    // 处理不需要token的请求
    if (config.noNeedToken) {
      return config
    }

    // const { accessToken } = useAuthStore()
    const accessToken = 'developmentServerTest121__token'
    if (accessToken) {
      // token: Bearer + xxx
      config.headers.Authorization = 'Bearer ' + accessToken
    }

    return config
  }

  function reqReject(error) {
    return Promise.reject(error)
  }

  const SUCCESS_CODES = [0, 200]
  function resResolve(response) {
    const { data, status, config, statusText, headers } = response
    if (headers['content-type']?.includes('json')) {
      if (SUCCESS_CODES.includes(data?.code) || status === 200) {
        return Promise.resolve(data)
      }
      const code = data?.code ?? status

      // 根据code处理对应的操作，并返回处理后的message
      const message = resolveResError(code, data?.message ?? statusText)

      //需要错误提醒
      !config.noNeedTip && window.$message?.error(message)
      return Promise.reject({ code, message, error: data ?? response })
    }
    return Promise.resolve(data ?? response)
  }

  async function resReject(error) {
    if (!error || !error.response) {
      const code = error?.code
      /** 根据code处理对应的操作，并返回处理后的message */
      const message = resolveResError(code, error.message)
      window.$message?.error(message)
      return Promise.reject({ code, message, error })
    }

    const { data, status, config } = error.response
    const code = data?.code ?? status

    const message = resolveResError(code, data?.message ?? error.message)
    /** 需要错误提醒 */
    !config?.noNeedTip && message && window.$message?.error(message)
    return Promise.reject({ code, message, error: error.response?.data || error.response })
  }

  axiosInstance.interceptors.request.use(reqResolve, reqReject)
  axiosInstance.interceptors.response.use(resResolve, resReject)
}
