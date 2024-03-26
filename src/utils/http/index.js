/**********************************
 * @FilePath: index.js
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/04 22:46:28
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import axios from 'axios'
import { setupInterceptors } from './interceptors'

export function createAxios(options = {}) {
  axios.defaults.withCredentials = true
  const defaultOptions = {
    // baseURL: '/api',
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 12000,
    // withCredentials: true, //携带上cookie
  }
  console.log('options', options)
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  setupInterceptors(service)
  return service
}

export const request = createAxios()

export const mockRequest = createAxios({
  baseURL: '/mock-api',
})
