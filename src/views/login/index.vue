<template>
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div
      style="transform: translateY(25px)"
      class="m-auto max-w-700 min-w-345 f-c-c rounded-10 bg-white bg-opacity-60 p-15 card-shadow"
      dark:bg-dark
    >
      <div hidden w-380 px-20 py-35 md:block>
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <div w-320 flex-col px-20 py-35>
        <h5 f-c-c text-24 font-normal color="#6a6a6a">
          <img src="@/assets/images/logo.png" height="50" class="mr-10" />
          {{ title }}
        </h5>
        <div mt-32>
          <n-input
            v-model:value="loginInfo.name"
            autofocus
            class="h-48 items-center text-16"
            placeholder="name"
            :maxlength="20"
          >
            <template #prefix>
              <icon-material-symbols:account-circle-outline class="mr-8 text-20 opacity-40" />
            </template>
          </n-input>
        </div>
        <div mt-32>
          <n-input
            v-model:value="loginInfo.password"
            class="h-48 items-center text-16"
            type="password"
            show-password-on="mousedown"
            placeholder="password"
            :maxlength="20"
            @keydown.enter="handleLogin"
          >
            <template #prefix>
              <icon-ri:lock-password-line class="mr-8 text-20 opacity-40" />
            </template>
          </n-input>
        </div>

        <div mt-20>
          <n-checkbox
            :checked="isRemember"
            label="记住我"
            :on-update:checked="(val) => (isRemember = val)"
          />
        </div>

        <div mt-20>
          <n-button
            h-50
            w-full
            rounded-5
            text-16
            type="primary"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import { lStorage, sStorage, setToken } from '@/utils'
import { useStorage } from '@vueuse/core'
import bgImg from '@/assets/images/login_bg.webp'
// import { login, getRsaParams } from '@/api/main'
import api from '@/api'

import { useRouter, useRoute } from 'vue-router'
import { encryptionLogin } from '@/utils/encrypt/encryption'
import { addDynamicRoutes } from '@/router'

const title = import.meta.env.VITE_TITLE

const router = useRouter()
const { query } = useRoute()
console.log('测试刷新02:', new Date().getTime())
// 通过 window.parent 调用父窗口的函数获取常量
// const constantFromParent = window.parent.getConstant()

// console.log(constantFromParent)

window.addEventListener('DOMContentLoaded', function () {
  // 添加消息事件监听器
  window.addEventListener('message', function (event) {
    // 处理收到的消息
    console.log('Received message:', event.data)
  })
})

const loginInfo = ref({
  name: '',
  password: '',
})

api.getRsaParams().then((res) => {
  console.log('getRsaParams', res)
  lStorage.set('rsaParams', res)
})
// 3、接收消息方法
// 接收方的 message event handler
// function handleMessage(event) {
//   // MDN 建议在处理消息前要先检查发送方的域名，防止恶意消息
//   if (event.origin === '*') {
//   // 处理消息
//   console.log('Received message:', event.data)
//   // 发送回执给发送方
//   event.source.postMessage('Message received', event.origin)
//   }
// }
// onMounted(() => {
//   window.addEventListener('message', handleMessage, false)
// })

// 在 iframe 中监听消息

// 监听父页面传过来的值的方法  @param {Object} event

// api
//   .getMenuGrp({
//     // menuGrpName: '身份认证平台-机构客户管理二级菜单',
//     SYSTEMKEYNAME: 'KMS-TENANCY',
//     SYSTEMTELLERNO: 'authAdmin1',
//   })
//   .then((res) => {
//     console.log('9990', res)
//     console.log('sessionStorage', window.sessionStorage)
//   })

initLoginInfo()

function initLoginInfo() {
  const localLoginInfo = lStorage.get('loginInfo')
  if (localLoginInfo) {
    loginInfo.value.name = localLoginInfo.name || ''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}

const isRemember = useStorage('isRemember', false)
const loading = ref(false)
async function handleLogin() {
  const { name, password } = loginInfo.value
  if (!name || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    loading.value = true
    $message.loading('正在验证...')
    // 密码加密,添加其他条件
    const authData = { password, captcha: '' }
    const { modulus, exponent } = lStorage.get('rsaParams')

    const encryptionPassword = encryptionLogin('', modulus, exponent, authData)
    console.log('encryptionPassword', encryptionPassword)
    const data = {
      userID: name,
      password: encryptionPassword,
      svrName: '工作平台',
      keySvrName: 'developmentServerTest121',
    }

    // const res = await api.login({ name, password: password.toString() })
    const res = await api.login(data)
    sStorage.set('userInfo', res)
    $message.success('登录成功')
    setToken(res.SERVICELOGSSN)
    if (isRemember.value) {
      lStorage.set('loginInfo', { name, password })
    } else {
      lStorage.remove('loginInfo')
    }
    await addDynamicRoutes()
    if (query.redirect) {
      const path = query.redirect
      Reflect.deleteProperty(query, 'redirect')
      router.push({ path, query })
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    $message.removeMessage()
  }
  loading.value = false
}
</script>
