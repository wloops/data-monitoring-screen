<script setup>
import { useThemeVars } from 'naive-ui'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  unit: {
    type: String,
    default: '%',
  },
})
console.log('LoadTop.vue data: ', props.data)
const themeVars = useThemeVars()

const getSortedData = (data) => {
  return data.sort((a, b) => Number(b.percent) - Number(a.percent))
}

const progressColor = (percent) => {
  if (props.unit !== '%') {
    return themeVars.value.infoColor
  }
  if (percent <= 50) {
    return themeVars.value.successColor
  } else if (percent > 50 && percent < 80) {
    return themeVars.value.warningColor
  } else {
    return themeVars.value.errorColor
  }
}
</script>

<template>
  <div w-full h-full p-30 flex justify-center items-center>
    <div class="loadBox" w-full h-full c-coolgray-300 p-20 pt-40>
      <div class="load-info-box" h-full flex flex-col justify-center items-center>
        <div class="load-info-item" flex-1 w-full flex justify-between items-center
          v-for="item in getSortedData(props.data)" :key="item.name">
          <div class="load-info-item-title w-1/3 text-16">{{ item.name }}</div>
          <div class="load-info-item-content w-2/3 flex justify-between items-center">
            <div class="progress-box mr-20">
              <n-progress type="line" :color="progressColor(item.percent)" rail-color="#003663"
                :percentage="item.percent" indicator-text-color="#ffffffc7" :show-indicator="false"
                :height="16"></n-progress>
            </div>
            <div>
              <span text-14 w-full>
                {{ unit !== '%' ? item.number + unit : item.percent + unit }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-box {
  width: calc(80% - 20px);
}
</style>
