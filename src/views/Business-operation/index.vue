<script setup>
import LoadTop from '@/components/monitoring/LoadTop.vue'
import ResponseTime from './components/ResponseTime.vue'
import { useChartsLeft, useMainData, useChartsRight } from './hooks'
import { useWebSocket } from '@/hooks'
import { useSetUpdatedDom } from '@/hooks/useSetUpdatedDom'
const { leftChart } = useChartsLeft()
const { centerChart, deviceCount } = useMainData()
const { rightChart } = useChartsRight()

const props = defineProps({
  parentData: {
    type: Object,
    default: () => ({}),
  },
})

// const updatedModelKeys = ref([])

const chartLeft1 = ref(null)
const initChartLeft1 = (msg) => {
  leftChart.init1(msg, chartLeft1.value)
}

const leftData2 = ref([])
const initChartLeft2 = async (msg) => {
  leftData2.value = await leftChart.init2(msg)
}

const chartLeft3 = ref(null)
const initChartLeft3 = (msg) => {
  leftChart.init3(msg, chartLeft3.value)
}

const deviceCountNum = ref({
  total: 0,
  offline: 0,
})
const numAnimRefCount = ref(null)
const numAnimRefOnline = ref(null)
const numAnimRefOffline = ref(null)
watch(deviceCount, (newVal) => {
  if (newVal) {
    deviceCountNum.value = newVal
    console.log('deviceCountNum', deviceCountNum.value)
    setTimeout(() => {
      numAnimRefCount.value?.play()
      numAnimRefOnline.value?.play()
      numAnimRefOffline.value?.play()
    }, 500)
  }
})

const initCenterChart1 = (msg) => {
  console.log('initCenterChart1', msg)
  centerChart.init1(msg)
}

const chartCenter201 = ref(null)
const initChartCenter201 = (msg) => {
  console.log('initChartCenter201', msg)
  centerChart.init201(msg, chartCenter201.value)
}

const chartCenter202 = ref(null)
const initChartCenter202 = (msg) => {
  centerChart.init202(msg, chartCenter202.value)
}

const centerChart3 = ref(null)
const countData = ref({})
const tableConfig = {
  width: '100%',
  height: '80%',
  isRoll: true,
  'wrap-class': '.BOtableWrap',
}
const initChartCenter3 = (msg) => {
  countData.value = centerChart.init3(msg)
  console.log('countData', countData.value)
}

const chartRight1 = ref(null)
const initChartRight1 = (msg) => {
  rightChart.init1(msg, chartRight1.value)
}

const chartRight2 = ref(null)
const initChartRight2 = (msg) => {
  rightChart.init2(msg, chartRight2.value)
}
const chartRight3 = ref(null)
let appResponseTime = ref([])
const initChartRight3 = (msg) => {
  appResponseTime.value = rightChart.init3(msg)
  console.log('appResponseTime', appResponseTime.value)
}

// 页面加载完成后初始化
onMounted(async () => {
  // 父界面已更新的模块不再重复更新
  // const updatedKeys = updatedModelKeys.value
  // for (const key in parentSendCorrespondFunction) {
  //   if (Object.hasOwnProperty.call(parentSendCorrespondFunction, key)) {
  //     const fn = parentSendCorrespondFunction[key]
  //     if (!updatedKeys.includes(key)) {
  //       fn()
  //     }
  //   }
  // }
  // initChartLeft1()
  // initChartLeft3()
  // await initChartLeft2()
  // initCenterChart1()
  // initChartCenter201()
  // initChartCenter202()
  // initChartCenter3()
  // initChartRight1()
  // initChartRight2()
  // initChartRight3()
})

// 消息类型与对应处理函数
const typeCorrespondFunction = {
  'today-trade-stats': initCenterChart1,
  'today-trade-tops': initChartLeft2,
}
const setDoms = {
  BO_MIDDLE_01: initCenterChart1,
  BO_MIDDLE_02_1: initChartCenter201,
  BO_MIDDLE_02_2: initChartCenter202,
  BO_MIDDLE_03: initChartCenter3,
  BO_RIGHT_01: initChartRight1,
  BO_RIGHT_02: initChartRight2,
  BO_RIGHT_03: initChartRight3,
  BO_LEFT_01: initChartLeft1,
  BO_LEFT_02: initChartLeft2,
  BO_LEFT_03: initChartLeft3,
}
const wsSendData = {
  unionId: 'today-trade-stats',
}
const wsSendData2 = {
  unionId: 'today-trade-tops',
}
const ws = useWebSocket(handleMessage, wsSendData)
useWebSocket(handleMessage, wsSendData2)
function handleMessage(e) {
  const message = JSON.parse(e.data)
  console.log('websocket接收到消息', message)
  const key = message.unionId
  // const message = useFilterMessage(_msgData.msg)
  // $message.success('websocket接收到消息')
  pushUpdateMessage(message, key, 'ws')
}
const pushUpdateMessage = (msg, key, type) => {
  const useKey = key
  // 执行更新
  if (type === 'ws') {
    typeCorrespondFunction[useKey](msg)
  } else {
    console.log('setDoms[useKey]', setDoms[useKey])
    setDoms[useKey](msg)
  }
}

console.log('props parentData:', props.parentData)

watch(
  () => ({ ...props.parentData }),
  (newValue, oldValue) => {
    if (newValue) {
      console.log('parentData**newValue', newValue)
      // 判断newValue 是否为空
      if (Object.keys(newValue).length === 0) {
        nextTick(() => {
          useSetUpdatedDom(newValue, setDoms, 'not')
        })
        return
      }
      // updatedModelKeys.value = needUpdateDomKeys(newValue)
      useSetUpdatedDom(newValue, setDoms, 'parent')

      // newValue.upDate.forEach((item) => {
      //   const moduleId = item.moduleId
      //   updatedModelKeys.value.push(moduleId)
      //   const msg = item.dataVolumeLimit === 1 || item.data.length === 1 ? item.data[0] : item.data
      //   console.log('parentData', moduleId, msg)
      //   if (moduleId && msg) {
      //     nextTick(() => {
      //       pushUpdateMessage(msg, moduleId, 'parentData')
      //     })
      //   }
      // })
    }
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div>
    <div class="cardBox">
      <div class="column">
        <div class="card" data-text="实时总交易趋势">
          <div class="chart" ref="chartLeft1"></div>
        </div>
        <div class="card" data-text="今日业务TOP5">
          <load-top :data="leftData2" :unit="'万次'"></load-top>
        </div>
        <div class="card" data-text="今日交易统计">
          <div class="chart" ref="chartLeft3"></div>
        </div>
      </div>
      <div class="column column-center" flex>
        <div style="flex: 1" class="card card-center card-notbg" data-text="今日交易笔数" pt-10>
          <div class="countBox">
            <n-statistic label="" tabular-nums>
              <n-number-animation ref="numAnimRefCount" :from="0.0" :to="deviceCountNum.total" :active="false"
                :precision="0" locale="en-US" show-separator />
              <template #suffix>次</template>
            </n-statistic>
          </div>
          <div class="areBox">
            <div class="onlineBox card-min onoff" data-text="交易成功">
              <n-statistic label="" tabular-nums>
                <n-number-animation ref="numAnimRefOnline" :from="0.0"
                  :to="deviceCountNum.total - deviceCountNum.offline" :active="false" :precision="0" locale="en-US"
                  show-separator />
                <template #suffix>次</template>
              </n-statistic>
            </div>
            <div class="offlineBox card-min onoff" data-text="交易失败">
              <n-statistic label="" tabular-nums>
                <n-number-animation ref="numAnimRefOffline" :from="0.0" :to="deviceCountNum.offline" :active="false"
                  :precision="0" locale="en-US" show-separator />
                <template #suffix>次</template>
              </n-statistic>
            </div>
          </div>
        </div>
        <div style="flex: 1" class="card card-center card-notbg" w-full flex>
          <div class="card card-double-border trade-left" data-text="交易详情" style="flex: 5">
            <div class="chart" ref="chartCenter201"></div>
          </div>
          <div class="card card-double-border trade-right" data-text="交易占比" style="flex: 1.5">
            <div class="chart" ref="chartCenter202"></div>
          </div>
        </div>
        <div style="flex: 1" class="card card-center" data-text="业务错误信息">
          <div class="chart BOtableWrap" pb20 v-if="countData.data && countData.data.length > 0">
            <app-table ref="centerChart3" :tb-data="countData.data" :tb-header="countData.header"
              :table-config="tableConfig"></app-table>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card" data-text="业务交易趋势">
          <div class="chart" ref="chartRight1"></div>
        </div>
        <div class="card" data-text="业务健康信息">
          <div class="chart" ref="chartRight2"></div>
        </div>
        <div class="card" data-text="业务平均响应时间">
          <div class="chart appResponseTime" ref="chartRight3" v-if="appResponseTime.length > 0">
            <ResponseTime :data="appResponseTime"></ResponseTime>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardBox {
  display: flex;
  padding: 10px 20px;
}

.column {
  flex: 2;
  height: 100vh;
  /* margin-top: 10px; */
  /* border: 5px double #00357a; */
  display: flex;
  /* justify-content: center; */
  flex-direction: column;

  .card {
    border: 5px double rgba(64, 121, 226, 0.35);
    border-radius: 18px;
    margin: 10px;
    flex: 1;
    position: relative;
    min-height: 285px;
  }

  .card-min {
    border: 5px double rgba(64, 121, 226, 0.35);
    border-radius: 18px;
    margin: 10px;
    flex: 1;
    position: relative;
    min-height: 120px;
  }

  .chart {
    width: 100%;
    height: 100%;
  }
}

.column-center {
  flex: 3;

  .card-center {
    flex: 1;
  }

  .card:nth-child(1) {
    border: 0px double rgba(64, 121, 226, 0.26);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'electronicFont';
    text-shadow: -1px 8px 16px rgba(47, 131, 209, 0.55);

    .countBox {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      /* margin-top: 25px;
      margin-bottom: 25px; */
      border-radius: 18px;
      width: 100%;
      height: 100%;
      text-align: center;
      /* padding: 0 30px; */
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }

    .areBox {
      width: 100%;
      /* height: 100%; */
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .onlineBox,
    .offlineBox {
      height: 50%;
      border: 5px double rgba(64, 121, 226, 0.35);
      border-radius: 18px;
      /* margin: 10px; */
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      padding-top: 25px;
    }
  }

  .card:nth-child(2) {
    border: 0px double rgba(64, 121, 226, 0.26);
    color: #c7c9d3;
  }

  .card-double-border {
    border: 5px double rgba(64, 121, 226, 0.35) !important;
    margin: 0;
  }

  .card-notbg::before {
    background: transparent;
    font-size: 18px;
    font-weight: 600;
  }
}

.column:nth-child(3) {
  flex: 2;
}

.card::before,
.card-min::before {
  content: attr(data-text);
  position: absolute;
  top: 0px;
  left: 25%;
  width: 50%;
  height: 30px;
  background: rgba(64, 121, 226, 0.26);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  border-radius: 0 0 20px 20px;
  color: #ffffffc7;
  font-size: 16px;
  font-weight: 550;
  letter-spacing: 1px;
  clip-path: polygon(1px 0, 20px 100%, calc(100% - 20px) 100%, calc(100% - 1px) 0);
  /* font-family: 'electronicFont'; */
  text-shadow: -1px 8px 16px rgba(47, 131, 209, 0.55);
}

.trade-left {
  border-radius: 18px;
  margin-right: 20px !important;
}

.trade-right {
  border-radius: 18px;
  margin-right: 20px !important;
}

.trade-right::before {
  width: 80%;
  left: 10%;
}

:deep(.n-statistic .n-statistic__label) {
  text-align: end;
  color: #b1b2bb;
  font-size: 12px;
}

:deep(.n-statistic .n-statistic-value) {
  text-align: end;
}

:deep(.n-statistic .n-statistic-value__content) {
  color: #5486f3;
  font-size: 86px;
  font-weight: 600;
  font-family: electronicFont;
}

:deep(.n-statistic .n-statistic-value__suffix) {
  color: #0586bd;
  font-size: 16px;
}

:deep(.onoff .n-statistic .n-statistic-value__content) {
  font-size: 56px;
  color: #18a058;
}

:deep(.onoff:nth-child(2) .n-statistic .n-statistic-value__content) {
  color: #c27666;
}
</style>
