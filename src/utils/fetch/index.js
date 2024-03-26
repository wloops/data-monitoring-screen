import { redefineFetch, interceptors } from './redefineFetch'
// 这里是我项目使用到的js-cookie库，主要是为了拿到token，你们这里改成你们获取token的方式即可
import Cookies from 'js-cookie'
import qs from 'qs' //引入qs模块，用于序列化post请求参数
import { sStorage, getToken } from '@/utils'

/**
 * config 自定义配置项
 * @param withoutCheck 不使用默认的接口状态校验，直接返回 response
 * @param returnOrigin 是否返回整个 response 对象，为 false 只返回 response.data
 * @param showError 全局错误时，是否使用统一的报错方式
 * @param canEmpty 传输参数是否可以为空
 * @param mock 是否使用 mock 服务
 * @param timeout 接口请求超时时间，默认10秒
 */
let configDefault = {
  showError: true,
  canEmpty: false,
  returnOrigin: true,
  withoutCheck: true,
  mock: true,
  timeout: 10000,
  credentials: 'include',
}

// 添加请求拦截器
interceptors.request.use((config) => {
  // 这里是我项目使用到的js-cookie库，主要是为了拿到token，你们这里改成你们获取token的方式即可
  const token = Cookies.get('access_token')
  // const token = getToken()
  console.log(token)
  configDefault = Object.assign(
    {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // authorization: `Bearer ${token}`,
      },
    },
    configDefault,
    config
  )
  // 如果是 post 请求,并且请求的数据是对象格式
  if (configDefault.method === 'POST' && configDefault.body) {
    // 设置请求头 发送的数据是x-www-form-urlencoded 格式
    configDefault.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  console.log('添加请求拦截器 configDefalut ==>', configDefault)
  return configDefault
})

// 添加响应拦截器
interceptors.response.use(async (response) => {
  console.log('拦截器response ==>', response)
  console.log('configDefault', configDefault)

  // TODO: 这里是复制一份结果处理，在这里可以做一些操作
  const res = await resultReduction(response.clone())

  // HTTP 状态码 2xx 状态入口，data.code 为 200 表示数据正确，无任何错误
  if (response.status >= 200 && response.status < 300) {
    return res
  } else {
    // 非 2xx 状态入口
    if (configDefault.withoutCheck) {
      // 不进行状态状态检测
      return Promise.reject(response)
    }
    return Promise.reject(response)
  }
})

// 结果处理，fetch请求响应结果是promise，还得处理
async function resultReduction(response) {
  let res = ''
  switch (configDefault.responseType) {
    case 'json':
      res = await response.json()
      break
    case 'text':
      res = await response.text()
      break
    case 'blod':
      res = await response.blod()
      break
    default:
      res = await response.json()
      break
  }
  console.log('结果处理', res)
  return res
}

function request(method, path, data, config) {
  const defaultNeedRequest = ['/main']
  if (method === 'POST' && defaultNeedRequest.includes(path)) {
    let name = sStorage.get('userInfo').SYSTEMKEYNAME
    let key = sStorage.get('userInfo').SYSTEMTELLERNO
    if (!data) data = {}
    if (name && key) {
      data = {
        SYSTEMTELLERNO: sStorage.get('userInfo').SYSTEMTELLERNO,
        SYSTEMKEYNAME: sStorage.get('userInfo').SYSTEMKEYNAME,
        ...data,
      }
    }
    console.log('defaultNeedRequest', data)
  }
  let myInit = {
    method,
    ...configDefault,
    ...config,
    body: qs.stringify(data),
  }
  if (method === 'GET') {
    let params = ''
    if (data) {
      // 对象转url参数
      // params = JSON.stringify(data)
      //   .replace(/:/g, '=')
      //   .replace(/"/g, '')
      //   .replace(/,/g, '&')
      //   .match(/\{([^)]*)\}/)[1]

      // qs.stringify(object, [options]) 字符串化时，默认情况下，qs 对输出进行 URI 编码，以避免某些特殊字符对某些接口的调用造成请求失败。
      //encode: false 禁用encode编码
      // config.data = qs.stringify(config.data, { encode: false })
      params = qs.stringify(data)
      console.log('new config.data', params)
    }
    return redefineFetch(`${path}?${params}`, {
      ...configDefault,
      ...config,
    })
  }

  return redefineFetch(path, myInit)
}

// get请求方法使用封装
function get(path, data, config) {
  return request('GET', path, data, config)
}

// post请求方法使用封装
function post(path, data, config) {
  return request('POST', path, data, config)
}

// put请求方法使用封装
function put(path, data, config) {
  return request('PUT', path, data, config)
}

// delete请求方法使用封装
function del(path, data, config) {
  return request('DELETE', path, data, config)
}

export default {
  fetch: redefineFetch,
  get,
  post,
  put,
  delete: del,
}
