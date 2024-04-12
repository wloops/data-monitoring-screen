<script setup>
import { useThemeVars } from 'naive-ui'
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})
import { useChartsLeft } from '../hooks'
const { leftChart, deviceMessage } = useChartsLeft()
const derviceChart = ref(null)
const initChart = (msg) => {
  console.log('initChart', derviceChart.value)
  leftChart.init(msg, derviceChart.value)
}

// const data = ref([])

// watch(deviceMessage, (newVal) => {
//   data.value = newVal
//   console.log('newVal', newVal)
// })

console.log('onMounted', props.data)
onMounted(() => {
  initChart([props.data])
})
const themeVars = useThemeVars()

const progressColor = (percent) => {
  if (percent < 50) {
    return themeVars.value.successColor
  } else if (percent > 50 && percent < 80) {
    return themeVars.value.warningColor
  } else {
    return themeVars.value.errorColor
  }
}
</script>

<template>
  <div w-full h-full>
    <div class="derviceBox1">
      <div
        class="chart"
        style="width: 50%; height: 100%; margin-right: 10%"
        ref="derviceChart"
      ></div>
      <div class="dervice-info-box">
        <div class="dervice-info-title">{{ data.name }}</div>
        <div class="dervice-info-content">
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">IP地址：</div>
            <div class="dervice-info-item-content">{{ data.ip }}</div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">端口：</div>
            <div class="dervice-info-item-content">{{ data.port }}</div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">运行时长：</div>
            <div class="dervice-info-item-content">{{ data.runTime }}</div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">CPU利用率：</div>
            <div class="dervice-info-item-content">
              <n-progress
                type="line"
                :color="progressColor(data.cpuUsage)"
                :rail-color="themeVars.primaryColor"
                :percentage="data.cpuUsage"
                indicator-text-color="#ffffffc7"
              />
            </div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">内存利用率：</div>
            <div class="dervice-info-item-content">
              <n-progress
                type="line"
                :color="progressColor(data.memoryUsage)"
                :rail-color="themeVars.primaryColor"
                :percentage="data.memoryUsage"
                indicator-text-color="#ffffffc7"
              />
            </div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">网络负载：&nbsp;&nbsp;&nbsp;</div>
            <div class="dervice-info-item-content">
              <n-progress
                type="line"
                :color="progressColor(data.networkUsage)"
                :rail-color="themeVars.primaryColor"
                :percentage="data.networkUsage"
                indicator-text-color="#ffffffc7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.derviceBox1 {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .chart {
    /* flex: 1; */
    width: 50%;
    height: 100%;
    margin-right: 10%;
  }
  .dervice-info-box {
    /* flex: 1; */
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #ffffffc7;
    margin-top: 25px;
    margin-right: 10px;

    .dervice-info-title {
      color: #04b7e4;
      font-weight: 600;
      width: 100%;
      text-align: left;
    }

    .dervice-info-content {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 10px;
      margin-top: 10px;
      .dervice-info-item {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        .dervice-info-item-title {
          font-size: 12px;
          font-weight: 500;
          color: #ffffffc7;
          margin-right: 10px;
          text-align: left;
        }
        .dervice-info-item-content {
          flex: 2;
          font-size: 12px;
          font-weight: 500;
          color: #ffffffc7;
          /* text-align: right; */
        }
      }
    }
  }
}
</style>
