<script setup>
import { useChartsLeft, useChartsRight } from './hooks'
import { useSetUpdatedDom } from '@/hooks/useSetUpdatedDom'
const { leftChart, deviceMessage } = useChartsLeft()
const { rightChart, numberAnimation } = useChartsRight()
const props = defineProps({
  parentData: {
    type: Object,
    default: () => ({}),
  },
})

const deviceInfoShow = ref({
  name: '',
  unit: '',
  id: '',
  ip: '',
  version: '',
})
const deviceStatusShow = ref({
  host: {
    status: '',
  },
  spare: {
    status: '',
  },
  run: {
    status: '',
  },
  license: {
    status: '',
  },
})
const initChartLeft1 = (msg) => {
  leftChart.init1(msg)
}
watch(deviceMessage, (newVal) => {
  if (newVal) {
    console.log('newVal', newVal)
    deviceInfoShow.value = newVal.deviceInfo
    deviceStatusShow.value = newVal.deviceStatus
  }
})

const chartLeft2 = ref(null)
const initChartLeft2 = (msg) => {
  leftChart.init2(msg, chartLeft2.value)
}
const chartLeft301 = ref(null)
const initChartLeft301 = (msg) => {
  leftChart.init301(msg, chartLeft301.value)
}
const chartLeft302 = ref(null)
const initChartLeft302 = (msg) => {
  leftChart.init302(msg, chartLeft302.value)
}

const rightChart1 = ref(null)
const numberAnimationInstRef = ref(null)
const numberAnimationInst2Ref = ref(null)
const initChartRight1 = (msg) => {
  rightChart.init1(msg, rightChart1.value)
}

const numberAnimationShow = ref({
  number1: 0,
  number2: 0,
})
watch(numberAnimation, (newVal) => {
  if (newVal) {
    console.log('newVal', newVal)
    numberAnimationShow.value = newVal
    setTimeout(() => {
      numberAnimationInstRef.value?.play()
      numberAnimationInst2Ref.value?.play()
    }, 500)
  }
})

const rightChart2 = ref(null)
const initChartRight2 = (msg) => {
  rightChart.init2(msg, rightChart2.value)
}

const rightChart3 = ref(null)
const alarmData = ref({})
const tableConfig = {
  width: '100%',
  height: '130px',
  isRoll: false,
  'wrap-class': '.DStableWrap',
}
const initChartRight3 = (msg) => {
  alarmData.value = rightChart.init3(msg, rightChart3.value)
  console.log('alarmData', alarmData.value)
}

onMounted(() => {
  // initChartLeft1()
  // initChartLeft2()
  // initChartLeft301()
  // initChartLeft302()
  // initChartRight1()
  // initChartRight2()
  // initChartRight3()
})

const setDoms = {
  DS_LEFT_01: initChartLeft1,
  DS_LEFT_02: initChartLeft2,
  DS_LEFT_03_1: initChartLeft301,
  DS_LEFT_03_2: initChartLeft302,
  DS_RIGHT_01: initChartRight1,
  DS_RIGHT_02: initChartRight2,
  DS_RIGHT_03: initChartRight3,
}

watch(
  () => ({ ...props.parentData }),
  (newValue, oldValue) => {
    if (newValue) {
      console.log('newValue', newValue)
      // 判断newValue 是否为空
      if (Object.keys(newValue).length === 0) {
        nextTick(() => {
          useSetUpdatedDom(newValue, setDoms, 'not')
        })
        return
      }
      useSetUpdatedDom(newValue, setDoms, 'parent')
    }
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div overflow-x-hidden overflow-y-auto>
    <div class="cardBox">
      <div class="column">
        <div class="container">
          <div data-text="设备详情" style="" class="glass card-1">
            <div class="card-1-column device-info inlineBlock mt-20" v-if="deviceInfoShow">
              <p>
                <span c-bluegray text-14>设备名称：</span>
                <span text-14>{{ deviceInfoShow.name }}</span>
              </p>
              <p>
                <span c-bluegray text-14>所属部门：</span>
                <span text-14>{{ deviceInfoShow.unit }}</span>
              </p>
              <p>
                <span c-bluegray text-14>序列号：</span>
                <span text-14>{{ deviceInfoShow.id }}</span>
              </p>
              <p>
                <span c-bluegray text-14>IP地址：</span>
                <span text-14>{{ deviceInfoShow.ip }}</span>
              </p>
              <p>
                <span c-bluegray text-14>系统版本：</span>
                <span text-14>{{ deviceInfoShow.version }}</span>
              </p>
            </div>
            <div class="card-1-column device-status inlineBlock">
              <div class="status-box status-1">
                <CustomIcon icon="server" :size="80" type="custom"></CustomIcon>
                <div class="status-text">
                  <p>主机状态</p>
                  <p>
                    <span :class="[
              deviceStatusShow['host'].status === '正常'
                ? 'status-circle'
                : 'status-circle status-circle-2',
            ]"></span>
                    <span>{{ deviceStatusShow['host'].status }}</span>
                  </p>
                </div>
              </div>
              <div class="status-box status-2">
                <CustomIcon icon="spare" :size="80" type="custom"></CustomIcon>
                <div class="status-text">
                  <p>备机状态</p>
                  <p>
                    <span :class="[
              deviceStatusShow['spare'].status === '正常'
                ? 'status-circle'
                : 'status-circle status-circle-2',
            ]"></span>
                    <span>{{ deviceStatusShow['spare'].status }}</span>
                  </p>
                </div>
              </div>
              <div class="status-box status-3">
                <CustomIcon icon="run" :size="80" type="custom"></CustomIcon>
                <div class="status-text">
                  <p>运行状态</p>
                  <p>
                    <span :class="[
              deviceStatusShow['run'].status === '正常'
                ? 'status-circle'
                : 'status-circle status-circle-2',
            ]"></span>
                    <span>{{ deviceStatusShow['run'].status }}</span>
                  </p>
                </div>
              </div>
              <div class="status-box status-4">
                <CustomIcon icon="license" :size="80" type="custom"></CustomIcon>
                <div class="status-text">
                  <p>license状态</p>
                  <p>
                    <span :class="[
              deviceStatusShow['license'].status === '正常'
                ? 'status-circle'
                : 'status-circle status-circle-2',
            ]"></span>
                    <span>{{ deviceStatusShow['license'].status }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div data-text="设备硬件状态" style="" class="glass">
            <div class="chart inlineBlock" ref="chartLeft2"></div>
          </div>
        </div>
        <div class="container">
          <div data-text="设备运行TOP趋势" data-text-2="设备健康趋势" style="" class="glass">
            <div flex justify-between w-full flex-1>
              <div class="chart inlineBlock" ref="chartLeft301"></div>
              <div class="chart inlineBlock" ref="chartLeft302"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="container">
          <div data-text="证书签发数量统计趋势" class="glass inlineBlock" flex w-full>
            <div class="chart" ref="rightChart1" style="flex: 3"></div>
            <div class="numberShow" style="flex: 1" w-full>
              <n-statistic label="已签发证书数量" tabular-nums mt-30 mb-20>
                <n-number-animation ref="numberAnimationInstRef" :from="0.0" :to="numberAnimationShow.number1"
                  :active="false" :precision="0" locale="en-US" show-separator />
                <template #suffix>张</template>
              </n-statistic>
              <n-statistic label="已吊销证书数量" tabular-nums>
                <n-number-animation ref="numberAnimationInst2Ref" :from="0.0" :to="numberAnimationShow.number2"
                  :active="false" :precision="0" locale="en-US" show-separator />
                <template #suffix>张</template>
              </n-statistic>
            </div>
          </div>
        </div>
        <div class="container">
          <div data-text="证书签发成功失败统计" style="" class="glass inlineBlock">
            <div class="chart" ref="rightChart2"></div>
          </div>
        </div>
        <div class="container">
          <div data-text="设备告警信息" style="" class="glass inlineBlock">
            <div class="chart DStableWrap">
              <app-table style="margin-top: -10px" ref="rightChart3" :tb-data="alarmData.data"
                :tb-header="alarmData.header" :table-config="tableConfig"></app-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardBox {
  border: 10px double #00357a;
  border-radius: 18px;
  margin: 20px;
  height: 100%;
  display: flex;
}

.column {
  flex: 6;
}

.column:nth-child(2) {
  flex: 5;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  color: #d0d0d6;
  font-size: 16px;
  flex: 1;
}

.container .glass {
  position: relative;
  width: 95%;
  height: 26vh;
  background: transparent;
  border: 1px solid rgba(2, 24, 68, 0.1);
  box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: end;
  transition: 0.5s;
  border-radius: 10px;
  padding-bottom: 15px;
  /* margin: 40px 0 0 0; */
  /* backdrop-filter: blur(10px); */
  transform: rotate(calc(var(--r) * 1deg));

  .chart {
    width: 100%;
    height: calc(26vh - 40px);
  }
}

/*
.container:hover .glass {
  transform: rotate(0deg);
  margin: 0 10px;
} */

.container .glass::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 20px;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
}

.container .glass::after {
  content: attr(data-text-2);
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 40px;
  /* background: rgba(255, 255, 255, 0.05); */
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 20px;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
}

.card-1 {
  display: flex;

  .card-1-column {
    flex: 1;
  }

  .card-1-column:nth-child(2) {
    flex: 2;
  }

  .device-info {
    font-size: 12px;
    margin: 0 15px;
    /* margin-top: 50px; */

    p {
      padding: 5px;
    }
  }

  .device-status {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    height: 100%;

    .status-box {
      margin: 60px 0 20px;
    }
  }
}

.status-text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    margin-top: 8px;
  }

  .status-circle {
    /* 圆点 */
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #00b300;
    margin-right: 10px;
  }

  .status-circle-2 {
    background: #fe770b;
  }
}

:deep(.n-statistic .n-statistic__label) {
  text-align: end;
  color: #b1b2bb;
  font-size: 14px;
  margin-right: 10px;
}

:deep(.n-statistic .n-statistic-value) {
  text-align: end;
}

:deep(.n-statistic .n-statistic-value__content) {
  color: #00cae6;
  font-size: 32px;
  font-weight: 600;
  font-family: electronicFont;
}

:deep(.n-statistic .n-statistic-value__suffix) {
  color: #0586bd;
  font-size: small;
  margin-left: 10px;
  margin-right: 10px;
}

/* 将n-data-table的背景设置为透明 */
:deep(.n-data-table) {
  background: transparent;
}

/* 如果需要去除表格内的背景色，可以进一步覆盖 */
:deep(.n-data-table .n-data-table-wrapper) {
  background: transparent;
}

/* 去除表头的背景色 */
:deep(.n-data-table .n-data-table-header) {
  background: transparent;
}

/* 去除表格行的背景色（如果有默认的行背景色） */
:deep(.n-data-table .n-data-table-row) {
  background: transparent;
}

/* 去除表格单元格的背景色 */
:deep(.n-data-table .n-data-table-cell) {
  background: transparent;
}
</style>
