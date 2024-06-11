<script setup>
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
import { h } from 'vue'
import { NIcon, darkTheme } from "naive-ui";
import {
  TrendingUp as icon1,
  EaselSharp as icon2,
  CaretForwardCircleSharp as icon3
} from "@vicons/ionicons5";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

const emit = defineEmits(['selectTab', 'refreshComponent'])
const props = defineProps({
  currentTab: {
    type: String,
    default: '',
  },
})
const countDown = () => {
  let t = null
  t = setTimeout(time, 1000) //開始运行
  function time() {
    clearTimeout(t) //清除定时器
    let dt = new Date()
    let y = dt.getFullYear()
    let mt = dt.getMonth() + 1
    let day = dt.getDate()
    let h = dt.getHours() //获取时
    let m = dt.getMinutes() //获取分
    let s = dt.getSeconds() //获取秒
    if (h < 10) h = '0' + h
    if (m < 10) m = '0' + m
    if (s < 10) s = '0' + s
    document.querySelector('.showTime').innerHTML =
      y + '/' + mt + '/' + day + ' ' + h + ':' + m + ':' + s
    t = setTimeout(time, 1000) //设定定时器，循环运行
  }
}
countDown()

const isFullScreen = ref(false) // 是否全屏
const openFullScreen = () => {
  // 点击打开全屏/再次点击关闭
  if (isFullScreen.value) {
    closeFullScreen()
  } else {
    const element = document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen()
    }
  }
  isFullScreen.value = !isFullScreen.value
  refresh()
}
const closeFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    // IE11
    document.msExitFullscreen()
  }
  refresh()
}
const openNewTab = () => {
  // 把当前页面用标签页打开
  window.open(window.location.href, '_blank')
}

let alarmMessage = ref('某用户连续三次登录网上银行业务失败，请及时处理。') // 报警信息

const mainTitle = ref('数据监控') // 主标题

const options = ref([
  {
    label: '业务运行态势',
    key: 'BusinessOperation',
    icon: renderIcon(icon1),
    disabled: false,
  },
  {
    label: '设备状态监控',
    key: 'DeviceStatus',
    icon: renderIcon(icon2),
    disabled: false,
  },
  {
    label: '设备运行态势',
    key: 'DeviceRunStatus',
    icon: renderIcon(icon3),
    disabled: false,
  },
])
// 首次加载时默认选择第一个选项
options.value.forEach((item, index) => {
  if (props.currentTab === item.key) {
    mainTitle.value = item.label
    item.disabled = true
  }
})
const isMultiDevice = ref(false) // 是否多设备

const handleSelect = (key) => {
  console.log('handleSelect', key)
  if (window.parent.switchTab && typeof window.parent.switchTab === 'function') {
    window.parent.switchTab(key)
  }
  // 选项置为选中状态
  options.value.forEach((item) => {
    if (item.key === key) {
      mainTitle.value = item.label
      item.disabled = true
      emit('selectTab', key)
    } else {
      item.disabled = false
    }
  })

  if (key === 'DeviceStatus') {
    isMultiDevice.value = true
  } else {
    isMultiDevice.value = false
  }
  // $message.info(String(key))
}

// 多设备
const devices = ref([
  {
    name: '签名服务器',
    key: 1,
    type: 'success',
  },
  {
    name: '加密机001',
    key: 2,
    type: 'warning',
  },
  {
    name: '加密机002',
    key: 3,
    type: 'warning',
  },
  {
    name: '加密机003',
    key: 4,
    type: 'warning',
  },
  {
    name: '证书认证系统',
    key: 5,
    type: 'warning',
  },
])

// 当前设备
const currentDeviceName = ref(devices.value[0].name)
const currentDeviceKey = ref(devices.value[0].key)

const showSelectDevices = ref(false) // 显示选择设备弹窗

const loading = ref(false);
const handleDeviceSelect = (key) => {
  if (currentDeviceKey.value === key) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;

    devices.value.forEach((item) => {
      if (item.key === key) {
        item.type = 'success'
        currentDeviceName.value = item.name
        currentDeviceKey.value = item.key
      } else {
        item.type = 'warning'
      }
      // 通过ws或http请求切换设备
      // 刷新当前页面
      refresh()
    })
  }, 2e3)
}

const refresh = () => {
  emit('refreshComponent')
}
</script>

<template>
  <div>
    <header z-2000>
      <div class="top-left-box">
        <div class="left-message" v-if="!isMultiDevice">
          <div style="margin-right: 3px">
            <svg t="1716363913118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="14541" width="15" height="15">
              <path
                d="M85.333333 810.666667c0-23.466667 19.2-42.666667 42.666667-42.666667h42.666667v-192c0-187.733333 153.6-341.333333 341.333333-341.333333s341.333333 153.6 341.333333 341.333333v192h42.666667c23.466667 0 42.666667 19.2 42.666667 42.666667v149.333333c0 23.466667-19.2 42.666667-42.666667 42.666667H128c-23.466667 0-42.666667-19.2-42.666667-42.666667v-149.333333z m85.333334 42.666666v64h682.666666v-64H170.666667z m85.333333-277.333333v192h512v-192c0-140.8-115.2-256-256-256s-256 115.2-256 256zM469.333333 64v85.333333c0 23.466667 19.2 42.666667 42.666667 42.666667s42.666667-19.2 42.666667-42.666667V64c0-23.466667-19.2-42.666667-42.666667-42.666667s-42.666667 19.2-42.666667 42.666667M119.466667 183.466667c-17.066667 17.066667-17.066667 42.666667 0 59.733333l59.733333 59.733333c8.533333 8.533333 19.2 12.8 29.866667 12.8 10.666667 0 21.333333-4.266667 29.866666-12.8 17.066667-17.066667 17.066667-42.666667 0-59.733333L181.333333 183.466667c-17.066667-17.066667-44.8-17.066667-61.866666 0M844.8 183.466667l-59.733333 59.733333c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 19.2 12.8 29.866666 12.8 10.666667 0 21.333333-4.266667 29.866667-12.8l59.733333-59.733333c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-44.8-17.066667-59.733333 0"
                fill="#4DA7F0" p-id="14542"></path>
              <path
                d="M648.533333 439.466667c-19.2-19.2-44.8-34.133333-70.4-44.8-21.333333-8.533333-46.933333 4.266667-55.466666 25.6s4.266667 46.933333 25.6 55.466666c14.933333 4.266667 27.733333 12.8 38.4 25.6 10.666667 10.666667 19.2 23.466667 25.6 38.4 6.4 17.066667 23.466667 27.733333 40.533333 27.733334 4.266667 0 10.666667 0 14.933333-2.133334 21.333333-8.533333 34.133333-32 25.6-55.466666-10.666667-25.6-25.6-49.066667-44.8-70.4"
                fill="#4DA7F0" p-id="14543"></path>
            </svg>
          </div>
          <div class="message-box">
            <span>告警信息：</span>
            <n-ellipsis style="max-width: 180px">
              {{ alarmMessage }}
            </n-ellipsis>
          </div>
        </div>
        <div class="left-router" v-else>
          <n-breadcrumb separator=">">
            <n-breadcrumb-item>
              <n-popover trigger="hover" :show-arrow="false" style="width: 500px" :theme="darkTheme">
                <template #trigger>
                  <div class="trigger" @click="showSelectDevices = true">
                    <div style="margin-right: 5px">
                      <svg t="1711956799629" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1133" width="15" height="15">
                        <path
                          d="M544 1024C809.152 1024 1024 809.088 1024 544c0-265.088-214.84799999-480-480-480C278.912 64 64 278.912 64 544 64 809.088 278.912 1024 544 1024zM458.88 374.976c-12.48-12.48-12.48-32.76800001 0-45.248 6.272-6.272 14.464-9.344 22.656-9.344s16.384 3.136 22.656 9.344l191.488 191.552c12.48 12.48 12.48 32.76800001 0 45.248L502.84799999 759.36c-12.48 12.48-32.76800001 12.48-45.24799999 0s-12.48-32.76800001 0-45.248l170.112-170.176L458.88 374.976z"
                          p-id="1134" fill="#4da7f0"></path>
                      </svg>
                    </div>
                    <div>{{ currentDeviceName }}</div>
                  </div>
                </template>
                <n-grid :x-gap="12" :y-gap="8" :cols="2">
                  <n-grid-item v-for="(item, index) in devices" :key="index" style="margin-bottom: 10px">
                    <n-card :title="item.name" hoverable :theme="darkTheme" size="small">
                      <n-button style="width: 100%" :type="item.type" dashed ghost :loading="loading"
                        @click="handleDeviceSelect(item.key)">
                        {{ item.type === 'success' ? '正在监控' : '未连接' }}
                      </n-button>
                    </n-card>
                  </n-grid-item>
                </n-grid>
              </n-popover>

            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <div class="trigger2">设备状态监控详情</div>
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </div>
      <div class="title">
        <div class="shine">{{ mainTitle }}</div>
        <!-- 切换页面按钮 -->
        <n-dropdown trigger="hover" :options="options" size="large" :theme="darkTheme" @select="handleSelect">
          <div class="btn-group">
            <svg t="1716369382656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="19650" width="20" height="20">
              <path
                d="M605.53 958l299.75-208.28a11.48 11.48 0 0 0 0-18.93l-299.75-208.4a10.25 10.25 0 0 0-11.36-0.23 11.28 11.28 0 0 0-5.09 10.62v148H335.49s-136.69 3.5-171.22-101.54a272.59 272.59 0 0 0 108.67 192.84 151.35 151.35 0 0 0 88.91 27.52H587.4v148.07a12.79 12.79 0 0 0 6.27 10.51 11.6 11.6 0 0 0 11.86-0.17z m-186-891.8L119.86 274.5a11.53 11.53 0 0 0 0 19L419.5 501.72a10.31 10.31 0 0 0 11.36 0.28 11.24 11.24 0 0 0 5.14-10.62v-148h253.59S826.23 340 860.81 445a272.54 272.54 0 0 0-108.66-192.86 151.45 151.45 0 0 0-89-27.53h-227V76.49A11.25 11.25 0 0 0 431 65.81a10.27 10.27 0 0 0-11.47 0.34z"
                p-id="19651" fill="#4da7f0"></path>
            </svg>
          </div>
        </n-dropdown>
      </div>
      <div id="fullScreen">
        <div class="showTime"></div>
        <div class="top-right-btn">
          <div @click="refresh">
            <svg t="1716358243805" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="11847" width="18" height="18">
              <path
                d="M981.314663 554.296783a681.276879 681.276879 0 0 1-46.986468 152.746388q-105.706098 230.734238-360.983096 242.19829a593.06288 593.06288 0 0 1-228.689008-33.853939v-1.022615l-31.808709 79.979258a55.759429 55.759429 0 0 1-20.506122 22.551352 40.043451 40.043451 0 0 1-21.04434 5.382184 51.076928 51.076928 0 0 1-19.483507-5.382184 95.210839 95.210839 0 0 1-13.347817-7.158305 52.314831 52.314831 0 0 1-5.382184-4.628679L71.671707 731.908862a57.427906 57.427906 0 0 1-7.158305-21.528737 46.932646 46.932646 0 0 1 1.022615-17.438277 35.952991 35.952991 0 0 1 7.158305-13.347816 74.435608 74.435608 0 0 1 10.279972-10.279972 60.495751 60.495751 0 0 1 11.248765-7.373593 50.431066 50.431066 0 0 1 8.18092-3.606063 6.189512 6.189512 0 0 0 3.067845-1.776121l281.003839-74.866183a91.497132 91.497132 0 0 1 35.899168-2.583448 122.337047 122.337047 0 0 1 22.174599 6.404799 21.528737 21.528737 0 0 1 12.325202 12.325202 76.157907 76.157907 0 0 1 4.628679 14.854829 47.63233 47.63233 0 0 1 0 14.370431 55.167388 55.167388 0 0 1-2.04523 10.764369 10.764368 10.764368 0 0 0-1.022615 3.606063l-32.831324 79.979258a677.50935 677.50935 0 0 0 164.264262 39.505232q77.395809 7.696523 131.809692-3.606063a358.507291 358.507291 0 0 0 101.023598-36.921784 381.27393 381.27393 0 0 0 73.951211-50.753997 352.64071 352.64071 0 0 0 48.708767-55.382676 410.391547 410.391547 0 0 0 26.910921-41.550462c3.767529-7.481236 6.673908-13.616926 8.719139-18.460892zM40.885614 449.667121a685.69027 685.69027 0 0 1 63.563595-176.427998q118.0313-212.273346 374.330913-207.160271a571.803252 571.803252 0 0 1 207.160271 39.989629l33.853939-78.956643A75.619688 75.619688 0 0 1 735.187378 9.189165a37.67529 37.67529 0 0 1 15.393047-8.234742 42.303968 42.303968 0 0 1 14.854829-0.538219 47.578509 47.578509 0 0 1 13.347817 3.606064 102.907362 102.907362 0 0 1 11.302586 6.13569 49.569917 49.569917 0 0 1 6.673909 4.628678l3.067845 3.067845 154.84544 276.913379a81.970666 81.970666 0 0 1 6.13569 22.712817 46.986468 46.986468 0 0 1-1.022615 17.438277 32.293105 32.293105 0 0 1-7.696523 13.347817 69.322533 69.322533 0 0 1-10.764369 9.741753 92.142994 92.142994 0 0 1-11.302587 6.673909l-8.18092 4.09046a7.104483 7.104483 0 0 1-3.067845 1.022615l-283.049068 67.546412a112.003254 112.003254 0 0 1-46.125319-1.022615c-11.571696-3.390776-19.160576-8.019454-22.551352-13.832214a41.173709 41.173709 0 0 1-5.382184-21.04434 97.256069 97.256069 0 0 1 1.291724-17.438277 24.381295 24.381295 0 0 1 3.067845-8.234742L600.632773 296.81309a663.730958 663.730958 0 0 0-164.102797-43.057474q-77.987849-9.203535-131.809692 0a348.227319 348.227319 0 0 0-101.292707 33.853938 368.571976 368.571976 0 0 0-75.350579 49.246986 383.31916 383.31916 0 0 0-50.269601 54.360061 408.507783 408.507783 0 0 0-28.740863 41.012244A113.025869 113.025869 0 0 0 40.885614 449.667121z m0 0"
                fill="#4da7f0" p-id="11848"></path>
            </svg>
          </div>
          <div @click="openFullScreen">
            <svg t="1705994007728" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="6655" width="18" height="18">
              <path
                d="M983.04 727.04a40.96 40.96 0 0 0-40.96 40.96v173.592381h-174.08a40.96 40.96 0 1 0 0 82.407619h173.592381A82.407619 82.407619 0 0 0 1024 941.592381v-173.592381a40.96 40.96 0 0 0-40.96-40.96zM941.592381 0h-173.592381a40.96 40.96 0 1 0 0 82.407619h173.592381v173.592381a40.96 40.96 0 1 0 82.407619 0V82.407619A82.407619 82.407619 0 0 0 941.592381 0zM256 941.592381H82.407619v-173.592381a40.96 40.96 0 1 0-82.407619 0v173.592381A82.407619 82.407619 0 0 0 82.407619 1024h173.592381a40.96 40.96 0 1 0 0-82.407619zM40.96 296.96a40.96 40.96 0 0 0 40.96-40.96V82.407619h174.08a40.96 40.96 0 1 0 0-82.407619H82.407619A82.407619 82.407619 0 0 0 0 82.407619v173.592381a40.96 40.96 0 0 0 40.96 40.96z"
                fill="#4da7f0" p-id="6656" data-spm-anchor-id="a313x.search_index.0.i8.5e923a81C9YEE3" class="selected">
              </path>
              <path
                d="M219.428571 219.428571m82.407619 0l420.32762 0q82.407619 0 82.407619 82.407619l0 420.32762q0 82.407619-82.407619 82.407619l-420.32762 0q-82.407619 0-82.407619-82.407619l0-420.32762q0-82.407619 82.407619-82.407619Z"
                fill="#4da7f0" p-id="6657" data-spm-anchor-id="a313x.search_index.0.i4.5e923a81C9YEE3" class=""></path>
            </svg>
          </div>
          <div @click="openNewTab">
            <svg t="1706164188902" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4235" width="18" height="18">
              <path
                d="M0 341.333333h113.777778v-113.777777H0v113.777777z m0 227.555556h113.777778v-113.777778H0v113.777778zM0 113.777778h113.777778V0C51.2 0 0 51.2 0 113.777778z m227.555556 910.222222h113.777777v-113.777778h-113.777777v113.777778zM0 796.444444h113.777778v-113.777777H0v113.777777z m113.777778 227.555556v-113.777778H0c0 62.577778 51.2 113.777778 113.777778 113.777778zM910.222222 0H455.111111v341.333333h568.888889V113.777778c0-62.577778-51.2-113.777778-113.777778-113.777778z m0 796.444444h113.777778v-113.777777h-113.777778v113.777777zM227.555556 113.777778h113.777777V0h-113.777777v113.777778z m682.666666 910.222222c62.577778 0 113.777778-51.2 113.777778-113.777778h-113.777778v113.777778z m0-455.111111h113.777778v-113.777778h-113.777778v113.777778zM455.111111 1024h113.777778v-113.777778h-113.777778v113.777778z m227.555556 0h113.777777v-113.777778h-113.777777v113.777778z"
                p-id="4236" fill="#4da7f0"></path>
            </svg>
          </div>
        </div>
      </div>
    </header>

    <n-drawer v-model:show="showSelectDevices" placement="left">
      <n-drawer-content title="切换设备" closable>
        <div v-for="(item, index) in devices" :key="index" style="margin-bottom: 10px">
          <n-card :title="item.name" hoverable>
            <n-button style="width: 100%" :type="item.type" dashed @click="handleDeviceSelect(item.key)">
              {{ item.type === 'success' ? '正在监控' : '未连接' }}
            </n-button>
          </n-card>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  height: 90px;
  background: url(./head_bg.png) no-repeat;
  background-size: 100% 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 34px;
      color: #fff;
      text-align: center;
      // line-height: 1rem;
      margin: 0 10px 15px 20px;
    }

    .btn-group {
      cursor: pointer;
    }
  }

  .top-left-box {
    width: 28%;
    height: 50px;
    position: absolute;
    left: 0;
    top: 8px;
    // line-height: 0.9375rem;
    color: #4da7f0;
    font-size: 14px;
    // font-weight: 600;
    font-family: electronicFont;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .left-message {
      position: absolute;
      left: 10%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-top: 5px;
      }

      .message-box {
        color: #87c3f5;

        span {
          color: #9b9da9;
        }
      }
    }

    .left-router {
      position: absolute;
      left: 10%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-top: 2px;
      }

      .trigger {
        color: #4da7f0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          margin-left: 2px;
        }
      }

      .trigger2 {
        color: #606ebb;
      }
    }
  }

  #fullScreen {
    // width: 20%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    right: 45px;
    top: 5px;
    color: #4da7f0;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      margin: 20px 10px 0 0;
    }

    .showTime {
      // position: absolute;
      // left: 1rem;
      // top: 0;
      // line-height: 0.9375rem;
      flex: 10;
      color: #4da7f0;
      font-size: 24px;
      font-weight: 600;
      font-family: electronicFont;
      display: flex;
    }

    .top-right-btn {
      flex: 3;
      display: flex;
      margin-left: 20px;
      // align-items: center;
      // justify-content: center;
    }
  }
}

.responseTime {
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* padding-top: 1rem; */
}

.responseTimeTitle {
  width: 90%;
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* margin-top: 10px; */
  /* margin-right: 20px; */
  color: white;
  font-size: 12px;
}

.responseTimeTitle .end {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #007197;
}

.responseTimeTitle .not {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #012054;
  border: 1px solid #0063bd;
}

.responseTimeAll {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  justify-items: center;
  /* margin-top: 40px; */
  margin-right: 10px;
}

.responseTimeBox {
  width: 90px;
  height: 55px;
  background-color: #002158;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  border: 1px solid #0063bd;
  border-radius: 3px;
  position: relative;
  margin: 5px;
  font-size: small;
}

.responseTimeBox2 {
  background-color: #007197;
  border: 1px solid #007197;
}

.responseTimeBox .picon {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 10px solid #008dff;
  border-right: 10px solid transparent;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 3px;
}

.responseTimeBox .responseTimeNum {
  font-size: 16px;
  font-weight: 700;
  padding-right: 5px;
}

.responseTimeBox .responseTimeMs {
  font-size: small;
}

:deep(.n-card) {
  max-width: 500px;
}

.shine {
  font-size: 2em;
  font-size: 34px;
  text-align: center;
  // line-height: 1rem;
  margin: 0 10px 15px 20px;
  font-weight: 900;
  color: rgba(84, 134, 243, 0.7);
  background: #222 -webkit-gradient(linear,
      left top,
      right top,
      from(#222),
      to(#222),
      color-stop(0.5, #fff)) 0 0 no-repeat;
  // background-image: -webkit-linear-gradient(-40deg,
  //     transparent 0%,
  //     transparent 40%,
  //     #fff 50%,
  //     transparent 60%,
  //     transparent 100%);
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 50px;
  -webkit-background-size: 50px;
  animation: zezzz;
  -webkit-animation: zezzz;
  animation-duration: 5s;
  -webkit-animation-duration: 5s;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}

@keyframes zezzz {

  0%,
  10% {
    background-position: -200px;
  }

  20% {
    background-position: top left;
  }

  100% {
    background-position: 200px;
  }
}
</style>
