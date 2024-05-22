/** 重置样式 */
import '@/styles/reset.css'
import 'uno.css'
import '@/styles/global.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
import { setupNaiveDiscreteApi, getUrlParam, sStorage } from './utils'
// import DataV, { setClassNamePrefix } from '@dataview/datav-vue3'
// window.addEventListener('DOMContentLoaded', function () {
//   window.addEventListener('message', function (e) {
//     const data = e.data
//     // 打印接收到的数据
//     console.log('父界面传输过来的数据', data) // 输出传输过来的数据
//     // window.sessionStorage.setItem('receivedData', JSON.stringify(receivedData.message))
//   })
// })
// window.addEventListener('message', function (event) {
//   // 确保来源是可信任的域
//   // if (event.origin !== '你的网址') {
//   //   return
//   // }
//   // 获取从 Vue 组件发送过来的数据
//   var receivedData = event.data

//   // 在这里处理接收到的数据
//   console.log('父界面传输过来的数据', receivedData.message) // 输出传输过来的数据
//   // app.config.globalProperties.msg = receivedData.message
//   // window.sessionStorage.setItem('receivedData', JSON.stringify(receivedData.message))
// })

async function setupApp() {
  const app = createApp(App)
  // app.use(DataV, { classNamePrefix: 'dv-' })
  setupStore(app)
  setupNaiveDiscreteApi()

  const SYSTEMTELLERNO = getUrlParam('SYSTEMTELLERNO')
  const SYSTEMKEYNAME = getUrlParam('SYSTEMKEYNAME')
  sStorage.set('userInfo', { SYSTEMTELLERNO, SYSTEMKEYNAME })

  await setupRouter(app)

  app.mount('#app')
}

setupApp()
