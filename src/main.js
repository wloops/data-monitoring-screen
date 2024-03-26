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
