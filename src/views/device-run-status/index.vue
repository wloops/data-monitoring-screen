<script setup>
import { useChartsLeft, useChartsRight, useMainData } from './hooks'
// import { useThemeVars } from 'naive-ui'
import DevicesBox from './components/DevicesBox.vue'
import LoadTop from '@/components/monitoring/LoadTop.vue'

// const themeVars = useThemeVars()

const { leftChart } = useChartsLeft()
const { rightChart } = useChartsRight()
const { centerChart, deviceCount } = useMainData()

const devicesData = ref([])

const initChartLeft1 = async (msg) => {
  devicesData.value = await leftChart.getData(msg)
}

const rightData1 = ref([])
const initChartRight1 = async (msg) => {
  rightData1.value = await rightChart.getData1(msg)
}

const rightData2 = ref([])
const initChartRight2 = async (msg) => {
  rightData2.value = await rightChart.getData2(msg)
}

const rightData3 = ref([])
const initChartRight3 = async (msg) => {
  rightData3.value = await rightChart.getData3(msg)
}

const chartCenter2 = ref(null)
const initChartCenter2 = async (msg) => {
  await centerChart.init2(msg, chartCenter2.value)
}

const deviceCountNum = ref({
  online: 0,
  offline: 0,
})
const numAnimRefCount = ref(null)
const numAnimRefOnline = ref(null)
const numAnimRefOffline = ref(null)
watch(deviceCount, (newVal) => {
  if (newVal) {
    deviceCountNum.value = newVal
    console.log('newVal', newVal)
    setTimeout(() => {
      numAnimRefCount.value?.play()
      numAnimRefOnline.value?.play()
      numAnimRefOffline.value?.play()
    }, 500)
  }
})

const centerChart3 = ref(null)
const countData = ref({})
const tableConfig = {
  width: '100%',
  height: '130px',
  isRoll: false,
}
const initChartCenter3 = (msg) => {
  countData.value = centerChart.init3(msg)
  console.log('countData', countData.value)
}

onMounted(async () => {
  await initChartLeft1()
  await initChartRight1()
  await initChartRight2()
  await initChartRight3()
  await centerChart.getData1()
  await initChartCenter2()
  await initChartCenter3()
})
</script>

<template>
  <div>
    <div class="cardBox">
      <div class="column">
        <div class="card card1" data-text="高风险设备预警">
          <div class="derviceBox" v-for="(item, index) in devicesData">
            <devices-box ref="devicesBoxRef" :data="item" :key="index"></devices-box>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card card-notbg" data-text="设备总数" pt-10>
          <div class="countBox">
            <n-statistic label="" tabular-nums>
              <n-number-animation
                ref="numAnimRefCount"
                :from="0.0"
                :to="deviceCountNum.online + deviceCountNum.offline"
                :active="false"
                :precision="0"
                locale="en-US"
                show-separator
              />
              <template #suffix>台</template>
            </n-statistic>
          </div>
          <div class="areBox">
            <div class="onlineBox card onoff" data-text="在线设备数量">
              <n-statistic label="" tabular-nums>
                <n-number-animation
                  ref="numAnimRefOnline"
                  :from="0.0"
                  :to="deviceCountNum.online"
                  :active="false"
                  :precision="0"
                  locale="en-US"
                  show-separator
                />
                <template #suffix>台</template>
              </n-statistic>
            </div>
            <div class="offlineBox card onoff" data-text="离线设备数量">
              <n-statistic label="" tabular-nums>
                <n-number-animation
                  ref="numAnimRefOffline"
                  :from="0.0"
                  :to="deviceCountNum.offline"
                  :active="false"
                  :precision="0"
                  locale="en-US"
                  show-separator
                />
                <template #suffix>台</template>
              </n-statistic>
            </div>
          </div>
        </div>
        <div class="card" data-text="设备运行时长">
          <div class="chart" ref="chartCenter2"></div>
        </div>
        <div class="card" data-text="设备分类统计信息">
          <div class="chart" pl-10 pr-10>
            <app-table
              ref="centerChart3"
              :tb-data="countData.data"
              :tb-header="countData.header"
              :table-config="tableConfig"
            ></app-table>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card" data-text="CPU负载TOP5">
          <load-top :data="rightData1"></load-top>
        </div>
        <div class="card" data-text="内存负载TOP5">
          <load-top :data="rightData2"></load-top>
        </div>
        <div class="card" data-text="网络负载TOP5">
          <load-top :data="rightData3"></load-top>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardBox {
  display: flex;
}
.column {
  flex: 2;
  height: 90vh;
  /* border: 5px double #00357a; */
  display: flex;
  flex-direction: column;

  .card {
    border: 5px double rgba(64, 121, 226, 0.35);
    border-radius: 18px;
    margin: 10px;
    flex: 1;
    position: relative;
  }
  .card::before {
    content: attr(data-text);
    position: absolute;
    top: 0px;
    left: 25%;
    width: 50%;
    height: 25px;
    background: rgba(64, 121, 226, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    border-radius: 0 0 20px 20px;
    color: #ffffffc7;
    font-size: 14px;
    font-weight: 550;
    letter-spacing: 1px;
    clip-path: polygon(1px 0, 20px 100%, calc(100% - 20px) 100%, calc(100% - 1px) 0);
    /* font-family: 'electronicFont'; */
    text-shadow: -1px 8px 16px rgba(47, 131, 209, 0.55);
  }
  .chart {
    width: 100%;
    height: 100%;
  }
}
.column:nth-child(2) {
  flex: 3;
  .card:nth-child(1) {
    border: 0px double rgba(64, 121, 226, 0.35);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'electronicFont';
    text-shadow: -1px 8px 16px rgba(47, 131, 209, 0.55);

    .countBox {
      flex: 3;
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
      width: 102%;
      height: 100%;
      flex: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .onlineBox,
    .offlineBox {
      height: 100%;
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
  .card-notbg::before {
    background: transparent;
    font-size: 18px;
    font-weight: 600;
  }
}
.column:nth-child(3) {
  flex: 2;
}
.card1 {
  display: flex;
  flex-direction: column;
  .derviceBox {
    flex: 1;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .derviceBox:nth-child(1) {
    margin-top: 25px;
  }
}

::v-deep .n-statistic .n-statistic__label {
  text-align: end;
  color: #b1b2bb;
  font-size: 12px;
}
::v-deep .n-statistic .n-statistic-value {
  text-align: end;
}
::v-deep .n-statistic .n-statistic-value__content {
  color: #5486f3;
  font-size: 56px;
  font-weight: 600;
  font-family: electronicFont;
}
::v-deep .n-statistic .n-statistic-value__suffix {
  color: #0586bd;
  font-size: small;
}
::v-deep .onoff .n-statistic .n-statistic-value__content {
  font-size: 36px;
  color: #18a058;
}
::v-deep .onoff:nth-child(2) .n-statistic .n-statistic-value__content {
  color: #c27666;
}
</style>