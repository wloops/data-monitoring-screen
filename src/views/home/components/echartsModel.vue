<template>
  <div class="echarts-chart">
    <div ref="chart" style="height: 300px"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'

const chartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)
  // 设置图表数据和选项
  chart.setOption(props.chartOptions)
})
</script>

<style scoped></style>
