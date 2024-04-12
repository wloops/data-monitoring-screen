<script setup>
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
const emit = defineEmits(['selectTab'])
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
    disabled: true,
  },
  {
    label: '设备状态监控',
    key: 'DeviceStatus',
    disabled: false,
  },
  {
    label: '设备运行态势',
    key: 'DeviceRunStatus',
    disabled: false,
  },
])
// 首次加载时默认选择第一个选项
mainTitle.value = options.value[0].label
const isMultiDevice = ref(false) // 是否多设备

const handleSelect = (key) => {
  console.log('handleSelect', key)
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
    name: '设备001',
    key: 1,
    type: 'success',
  },
  {
    name: '设备002',
    key: 2,
    type: 'warning',
  },
  {
    name: '设备003',
    key: 3,
    type: 'warning',
  },
])

// 当前设备
const currentDeviceName = ref(devices.value[0].name)

const showSelectDevices = ref(false) // 显示选择设备弹窗

const handleDeviceSelect = (key) => {
  devices.value.forEach((item) => {
    if (item.key === key) {
      item.type = 'success'
      currentDeviceName.value = item.name
    } else {
      item.type = 'warning'
    }
  })
}
</script>

<template>
  <div>
    <header>
      <div class="top-left-box">
        <div class="left-message" v-if="!isMultiDevice">
          <span style="margin-right: 3px">
            <svg
              t="1711951211497"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="13010"
              width="15"
              height="15"
            >
              <path
                d="M683.4 836.9c0 65.7-74.5 118.9-166.5 118.9s-166.5-53.2-166.5-118.9h333zM509.9 138.4h4.6c170.5 0 308.8 125.4 308.8 280.1v344H201.1V418.3c0-154.6 138.2-280.1 308.8-280.1v0.2z m253.7 348c-0.2-149.5-110.7-270.7-247.1-270.7h-4.2c-14.8 0.2-26.6 13.2-26.4 29 0 15.9 11.9 29 26.4 29h4.3c107.3 0 194.1 95.4 194.3 212.8 0 10.3 5.1 19.8 13.2 25 8.2 5.2 18.3 5.2 26.5 0 8-5.3 13.1-14.8 13-25.1zM163.7 778.8h690.7c3.9 0 7.5 1.7 10.2 4.7l15.4 17.6c3.4 3.8 4.3 9.5 2.3 14.3-1.9 4.8-6.4 8-11.3 8H156.9c-5.6 0-10.6-3.6-12.8-9.1-2.2-5.5-1.2-11.8 2.6-16.2l17-19.3z m454.1-603.7v0.4c0.1 6-221.5 5.8-221.4-0.4 4-62.5 52.4-111.1 110.7-111.1 58.4 0 106.8 48.6 110.7 111.1z m0 0"
                p-id="13011"
                fill="#4da7f0"
              ></path>
            </svg>
          </span>
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
              <div class="trigger" @click="showSelectDevices = true">
                <div style="margin-right: 5px">
                  <svg
                    t="1711956799629"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1133"
                    width="12"
                    height="12"
                  >
                    <path
                      d="M544 1024C809.152 1024 1024 809.088 1024 544c0-265.088-214.84799999-480-480-480C278.912 64 64 278.912 64 544 64 809.088 278.912 1024 544 1024zM458.88 374.976c-12.48-12.48-12.48-32.76800001 0-45.248 6.272-6.272 14.464-9.344 22.656-9.344s16.384 3.136 22.656 9.344l191.488 191.552c12.48 12.48 12.48 32.76800001 0 45.248L502.84799999 759.36c-12.48 12.48-32.76800001 12.48-45.24799999 0s-12.48-32.76800001 0-45.248l170.112-170.176L458.88 374.976z"
                      p-id="1134"
                      fill="#4da7f0"
                    ></path>
                  </svg>
                </div>
                <div>{{ currentDeviceName }}</div>
              </div>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <div class="trigger2">设备状态监控详情</div>
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
      </div>
      <div class="title">
        <h1>{{ mainTitle }}</h1>
        <!-- 切换页面按钮 -->
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
          <div class="btn-group">
            <svg
              t="1711940843189"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10981"
              width="15"
              height="15"
            >
              <path
                d="M900.4 424.87c19.47 0 37.03-11.73 44.49-29.73 7.46-17.98 3.33-38.7-10.43-52.48L713.97 122.19c-7.3-7.3-19.12-7.3-26.42 0l-41.69 41.69c-7.3 7.3-7.3 19.13 0 26.42l138.28 138.27H86.32c-10.19 0-18.46 8.26-18.46 18.46v59.39c0 10.19 8.26 18.46 18.46 18.46H900.4zM937.65 598.72H123.8c-19.47 0-37.03 11.73-44.49 29.73-7.46 17.98-3.33 38.7 10.43 52.48l220.49 220.48c7.3 7.3 19.12 7.3 26.42 0l41.69-41.69c7.3-7.3 7.3-19.13 0-26.42L240.06 695.02h697.59c10.32 0 18.68-8.37 18.68-18.68v-58.93c0-10.32-8.36-18.69-18.68-18.69z"
                p-id="10982"
                fill="#4da7f0"
              ></path>
            </svg>
          </div>
        </n-dropdown>
      </div>
      <div id="fullScreen">
        <div class="showTime"></div>
        <div class="top-right-btn">
          <div @click="openFullScreen">
            <svg
              t="1705994007728"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6655"
              width="15"
              height="15"
            >
              <path
                d="M983.04 727.04a40.96 40.96 0 0 0-40.96 40.96v173.592381h-174.08a40.96 40.96 0 1 0 0 82.407619h173.592381A82.407619 82.407619 0 0 0 1024 941.592381v-173.592381a40.96 40.96 0 0 0-40.96-40.96zM941.592381 0h-173.592381a40.96 40.96 0 1 0 0 82.407619h173.592381v173.592381a40.96 40.96 0 1 0 82.407619 0V82.407619A82.407619 82.407619 0 0 0 941.592381 0zM256 941.592381H82.407619v-173.592381a40.96 40.96 0 1 0-82.407619 0v173.592381A82.407619 82.407619 0 0 0 82.407619 1024h173.592381a40.96 40.96 0 1 0 0-82.407619zM40.96 296.96a40.96 40.96 0 0 0 40.96-40.96V82.407619h174.08a40.96 40.96 0 1 0 0-82.407619H82.407619A82.407619 82.407619 0 0 0 0 82.407619v173.592381a40.96 40.96 0 0 0 40.96 40.96z"
                fill="#4da7f0"
                p-id="6656"
                data-spm-anchor-id="a313x.search_index.0.i8.5e923a81C9YEE3"
                class="selected"
              ></path>
              <path
                d="M219.428571 219.428571m82.407619 0l420.32762 0q82.407619 0 82.407619 82.407619l0 420.32762q0 82.407619-82.407619 82.407619l-420.32762 0q-82.407619 0-82.407619-82.407619l0-420.32762q0-82.407619 82.407619-82.407619Z"
                fill="#4da7f0"
                p-id="6657"
                data-spm-anchor-id="a313x.search_index.0.i4.5e923a81C9YEE3"
                class=""
              ></path>
            </svg>
          </div>
          <div @click="openNewTab">
            <svg
              t="1706164188902"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4235"
              width="15"
              height="15"
            >
              <path
                d="M0 341.333333h113.777778v-113.777777H0v113.777777z m0 227.555556h113.777778v-113.777778H0v113.777778zM0 113.777778h113.777778V0C51.2 0 0 51.2 0 113.777778z m227.555556 910.222222h113.777777v-113.777778h-113.777777v113.777778zM0 796.444444h113.777778v-113.777777H0v113.777777z m113.777778 227.555556v-113.777778H0c0 62.577778 51.2 113.777778 113.777778 113.777778zM910.222222 0H455.111111v341.333333h568.888889V113.777778c0-62.577778-51.2-113.777778-113.777778-113.777778z m0 796.444444h113.777778v-113.777777h-113.777778v113.777777zM227.555556 113.777778h113.777777V0h-113.777777v113.777778z m682.666666 910.222222c62.577778 0 113.777778-51.2 113.777778-113.777778h-113.777778v113.777778z m0-455.111111h113.777778v-113.777778h-113.777778v113.777778zM455.111111 1024h113.777778v-113.777778h-113.777778v113.777778z m227.555556 0h113.777777v-113.777778h-113.777777v113.777778z"
                p-id="4236"
                fill="#4da7f0"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </header>

    <n-drawer v-model:show="showSelectDevices" placement="left">
      <n-drawer-content title="切换设备" closable>
        <div v-for="(item, index) in devices" :key="index" style="margin-bottom: 10px">
          <n-card :title="item.name" hoverable>
            <n-button
              style="width: 100%"
              :type="item.type"
              dashed
              @click="handleDeviceSelect(item.key)"
            >
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
      font-size: 28px;
      color: #fff;
      text-align: center;
      // line-height: 1rem;
      margin: 0 15px 15px 15px;
    }
    .btn-group {
      cursor: pointer;
    }
  }
  .top-left-box {
    width: 18%;
    height: 25%;
    position: absolute;
    left: 0;
    top: 20px;
    // line-height: 0.9375rem;
    color: #4da7f0;
    font-size: 12px;
    // font-weight: 600;
    font-family: electronicFont;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .left-message {
      display: flex;
      align-items: center;
      justify-content: center;
      .message-box {
        span {
          color: #9b9da9;
        }
      }
    }

    .left-router {
      display: flex;
      align-items: center;
      justify-content: center;
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
    width: 15%;
    position: absolute;
    right: 35px;
    top: 15px;
    color: #4da7f0;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      // margin-top: 15px;
      margin-right: 10px;
    }
    .showTime {
      // position: absolute;
      // left: 1rem;
      // top: 0;
      // line-height: 0.9375rem;
      color: #4da7f0;
      font-size: 20px;
      font-weight: 600;
      font-family: electronicFont;
    }
    .top-right-btn {
      display: flex;
      align-items: center;
      justify-content: center;
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
</style>
