<script setup>
// 导入js文件 flexible.js
import api from '@/api'
import './js/flexible'
import { useFilterMessage, useChartsLeft, useChartsRight, useChartsCenter } from './hooks'
import useMainData from './hooks/useMainData'
import { useWebSocket } from '@/hooks'

import deviceStatus from './components/DeviceStatus.vue'
import ErrorMessageTable from './components/ErrorMessageTable.vue'

const ws = useWebSocket(handleMessage)

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

// const [initLeftLine1, getDataOnLeftLine1] = useChartsLine()
const { leftChart } = useChartsLeft()
const { rightChart, appResponseTime, deviceStatusList } = useChartsRight()
const { centerChart } = useChartsCenter()
const { topCenterData, getServiceFlow } = useMainData()
const chartLeft1 = ref(null) // 左栏第一个图表
const initChartLeft1 = (msg) => {
  leftChart.init1(chartLeft1.value, msg)
}
const chartLeft2 = ref(null) // 左栏第二个图表
const initChartLeft2 = (msg) => {
  leftChart.init2(chartLeft2.value, msg)
}
const chartLeft3 = ref(null) // 左栏第三个图表
const initChartLeft3 = (msg) => {
  leftChart.init3(chartLeft3.value, msg)
}

const chartRight1 = ref(null) // 右栏第一个图表
const initChartRight1 = (msg) => {
  rightChart.init1(chartRight1.value, msg)
}

// 右栏第二个图表data
const initChartRight2 = (msg) => {
  rightChart.init2(null, msg)
  console.log('appResponseTime', appResponseTime.value)
}

const chartRight3 = ref(null) // 右栏第三个图表
const initChartRight3 = (msg) => {
  rightChart.init3(chartRight3.value, msg)
}
const chartRight4 = ref(null) // 右栏第四个图表
const initChartRight4 = (msg) => {
  rightChart.init4(null, msg)
}

// 中间上方服务流水
const initTopCenter1 = (msg) => {
  getServiceFlow(msg)
}
const chartCenter1 = ref(null) // 中间第一个图表
const initChartCenter1 = (msg) => {
  centerChart.init1(chartCenter1.value, msg)
}
const chartCenter2 = ref(null) // 中间第二个图表
const initChartCenter2 = (msg) => {
  centerChart.init2(chartCenter2.value, msg)
}
const chartCenter3 = ref(null) // 中间第三个图表
const errMsg = ref([])
const initChartCenter3 = (msg) => {
  errMsg.value = centerChart.init3(chartCenter3.value, msg)
  console.log('errMsg', errMsg.value)
}
onMounted(() => {
  initChartLeft1()
  initChartLeft2()
  initChartLeft3()
  initChartRight1()
  initChartRight2()
  initChartRight3()
  initChartRight4()
  initTopCenter1()
  initChartCenter1()
  initChartCenter2()
  initChartCenter3()
})

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

// 消息类型与对应处理函数
const typeCorrespondFunction = {
  服务趋势: initChartLeft1,
  应用访问TOP: initChartLeft2,
  算法调用TOP: initChartLeft3,
  业务健康信息: initChartRight1,
  业务平均响应时间: initChartRight2,
  总体资源指标: initChartRight3,
  设备状态: initChartRight4,
  交易详情: initChartCenter1,
  交易占比: initChartCenter2,
  业务错误信息: initChartCenter3,
  业务服务流水: initTopCenter1,
}

function handleMessage(e) {
  const _msgData = JSON.parse(e.data)
  const type = _msgData.msg.spiedResType
  const message = useFilterMessage(_msgData.msg)
  $message.success('websocket接收到消息')
  // 执行更新
  typeCorrespondFunction[type](message)
  console.log('websocket接收到消息', message)
}
</script>

<template>
  <div class="main">
    <!-- 头部的盒子 -->
    <header>
      <h1>综合安全态势平台</h1>
      <div class="showTime"></div>
      <div id="fullScreen">
        <div @click="openFullScreen">
          <svg
            t="1705994007728"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6655"
            width="20"
            height="20"
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
            width="20"
            height="20"
          >
            <path
              d="M0 341.333333h113.777778v-113.777777H0v113.777777z m0 227.555556h113.777778v-113.777778H0v113.777778zM0 113.777778h113.777778V0C51.2 0 0 51.2 0 113.777778z m227.555556 910.222222h113.777777v-113.777778h-113.777777v113.777778zM0 796.444444h113.777778v-113.777777H0v113.777777z m113.777778 227.555556v-113.777778H0c0 62.577778 51.2 113.777778 113.777778 113.777778zM910.222222 0H455.111111v341.333333h568.888889V113.777778c0-62.577778-51.2-113.777778-113.777778-113.777778z m0 796.444444h113.777778v-113.777777h-113.777778v113.777777zM227.555556 113.777778h113.777777V0h-113.777777v113.777778z m682.666666 910.222222c62.577778 0 113.777778-51.2 113.777778-113.777778h-113.777778v113.777778z m0-455.111111h113.777778v-113.777778h-113.777778v113.777778zM455.111111 1024h113.777778v-113.777778h-113.777778v113.777778z m227.555556 0h113.777777v-113.777778h-113.777777v113.777778z"
              p-id="4236"
              fill="#4da7f0"
            ></path>
          </svg>
        </div>
      </div>
    </header>

    <!-- 页面主体部分 -->
    <section class="mainbox">
      <div class="column">
        <div class="panel bar">
          <h2>服务趋势</h2>
          <div class="chart" ref="chartLeft1"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>
            应用访问 TOP
            <!-- <a href="javacript:;">2020</a>
            <a href="javascript:;">2021</a> -->
          </h2>
          <div class="chart" ref="chartLeft2">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>算法调用 TOP</h2>
          <div class="chart" ref="chartLeft3">图表</div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <!-- no模块制作 -->
        <div class="no" mb-10>
          <div class="no-hd">
            <ul>
              <li>{{ topCenterData.total }}</li>
              <li>{{ topCenterData.success }}</li>
              <li>{{ topCenterData.fail }}</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li class="li-flex">
                <svg
                  t="1705991540503"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1096"
                  width="25"
                  height="25"
                >
                  <path
                    d="M700.53080036 851.35544067V1014.7488005h-125.68719975v-257.65876002c157.1090008-25.13744054 282.79620057-150.82464031 307.93363962-307.93364109h125.68720124c-18.85308003 182.24643987-144.54027981 339.35544067-307.93364111 402.19904128z m-377.06160072 0c-169.67772034-62.84360061-289.08056106-219.95259994-314.21800014-402.19904128h125.68719975c25.13744054 157.1090008 150.82464031 282.79620057 307.93364109 307.93364109V1014.7488005H323.46919964v-163.39335983zM650.25592077 72.09479865C750.80567999 72.09479865 826.21800014 141.22275977 826.21800014 248.05687948c0 87.98103968-75.41232014 182.24643987-131.97156027 232.52132096-37.70616007 37.70616007-100.54976068 75.41232014-182.24643987 119.40283924-81.69668065-43.99052059-144.54027981-81.69668065-182.24643987-119.40283924-62.84360061-56.55924012-131.97156027-144.54027981-131.97156027-232.52132096C197.78199986 141.22275977 273.19432001 72.09479865 373.74407923 72.09479865c56.55924012 0 100.54976068 25.13744054 138.25592077 69.12796112 37.70616007-43.99052059 81.69668065-69.12795966 138.25592077-69.12796112z"
                    fill="#1296db"
                    p-id="1097"
                  ></path>
                </svg>
                <span>服务笔数</span>
              </li>
              <li class="li-flex">
                <svg
                  t="1705991405862"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1825"
                  width="25"
                  height="25"
                >
                  <path
                    d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m299.4176 230.4c-194.56 119.808-335.6672 271.2064-399.36 347.0848L256.512 455.0144 187.7504 510.6176l268.4416 274.432c46.08-118.8864 192.6656-351.232 371.5584-516.4032l-16.384-38.2464z"
                    fill="#3BBA68"
                    p-id="1826"
                  ></path>
                </svg>
                <span>成功笔数</span>
              </li>
              <li class="li-flex">
                <svg
                  t="1705991559591"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1249"
                  width="25"
                  height="25"
                >
                  <path
                    d="M511.99941746 3.74329458C231.30068765 3.74329458 3.74387712 231.30010624 3.74387712 511.99883605c0 280.69989376 227.55681053 508.25670542 508.25554034 508.25670542S1020.25495893 792.69872981 1020.25495893 511.99883605C1020.25495893 231.30010624 792.69814727 3.74329458 511.99941746 3.74329458L511.99941746 3.74329458zM745.04937245 655.19432021c7.7413979 7.75886279 7.7413979 20.31694848 0 28.07581128l-61.77982351 61.77865955c-7.75886279 7.74256185-20.31578453 7.76002674-28.07581127 0L511.99941746 601.85447083 368.8039333 745.04879104c-7.75886279 7.74256185-20.33324829 7.74256185-28.07581127 0l-61.77865956-61.77865955c-7.74256185-7.74256185-7.74256185-20.31694848 0-28.07581128l143.21178396-143.19548416L278.94946247 368.80451584c-7.74256185-7.75886279-7.74256185-20.33324829 0-28.07581127l61.77865956-61.7798235c7.76002674-7.7413979 20.31694848-7.7413979 28.07581127 0l143.19548416 143.21294904 143.19432021-143.21294904c7.76002674-7.7413979 20.31694848-7.7413979 28.07581127 0l61.77982351 61.7798235c7.7413979 7.74256185 7.7413979 20.31694848 0 28.07581127L601.85388829 511.99883605 745.04937245 655.19432021 745.04937245 655.19432021zM745.04937245 655.19432021"
                    fill="#FF696A"
                    p-id="1250"
                  ></path>
                </svg>
                <span>失败笔数</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 地图模块 -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <div class="chart"></div>
          <div flex justify-between>
            <div class="panel bar2 w-full cPanel">
              <h2>交易详情</h2>
              <div class="chart2" ref="chartCenter1">图表</div>
              <div class="panel-footer"></div>
            </div>
            <div class="panel bar2 w-1/3 cPanel2">
              <h2>交易占比</h2>
              <div class="chart2" ref="chartCenter2">图表</div>
              <div class="panel-footer"></div>
            </div>
          </div>
          <div class="panel bar2 w-full cbPanel">
            <h2>业务错误信息</h2>
            <div class="chart">
              <error-message-table ref="chartCenter3" :tb-data="errMsg"></error-message-table>
            </div>
            <div class="panel-footer"></div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="panel2 bar2">
          <h2>业务健康信息</h2>
          <div class="chart" ref="chartRight1">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel2 line2">
          <h2>业务平均响应时间</h2>
          <!-- <div class="chart" ref="chartRight2">图表</div> -->
          <div class="responseTime">
            <div class="responseTimeAll">
              <div v-for="item in appResponseTime">
                <div class="responseTimeBox">
                  <span class="picon"></span>
                  <p>{{ item.appName }}</p>
                  <p>
                    <span class="responseTimeNum">{{ item.avaUsedTime }}</span>
                    <span class="responseTimeMs">ms</span>
                  </p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel2 pie2">
          <h2>总体资源指标</h2>
          <div class="chart" ref="chartRight3">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel2 pie2 pieX">
          <h2>设备状态</h2>
          <div>
            <device-status ref="chartRight4" :device-status-list="deviceStatusList"></device-status>
          </div>
          <!-- <div class="chart" >图表</div> -->
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import './css/index.scss';
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
