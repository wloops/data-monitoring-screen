<script setup>
const timer = ref(null)
const animate = ref(false)
const lineType = ref(false)
const props = defineProps({
  tbData: {
    type: Array,
    default: () => [],
  },
})
onMounted(() => {
  setRoll()
})
function setRoll() {
  setInterval(() => {
    tabelRoll()
  }, 3000)
}
function tabelRoll() {
  clearTimeout(timer.value)
  animate.value = true
  timer.value = setTimeout(() => {
    if (props.tbData && props.tbData.length > 10) {
      props.tbData.push(props.tbData[0])
      props.tbData.shift()
      lineType.value = !lineType.value
      animate.value = false
    }
  }, 500)
}

console.log(props.tbData)
const tbName = ref([
  { name: '应用名称', param: 'compName', width: 20 },
  { name: '操作', param: 'resName', width: 20 },
  { name: '错误信息', param: 'msgGenRuleID', width: 20 },
  { name: '时间', param: 'inputDate', width: 20 },
  { name: '错误来源', param: 'arrIndex', width: 20 },
])
</script>

<template>
  <div>
    <div class="tb-header">
      <div v-for="item in tbName" class="tb-item" :style="{ width: item.width + '%' }">
        {{ item.name }}
      </div>
    </div>
    <div class="tb-body">
      <div class="tb-body" style="height: 365px; overflow: hidden" :class="{ anim: animate }">
        <div
          class="tb-list"
          v-for="(item, index) in props.tbData"
          :class="{ 'tb-zebra1': !lineType, 'tb-zebra2': lineType }"
        >
          <div v-for="itemSon in tbName" class="tb-item" :style="{ width: itemSon.width + '%' }">
            {{ item[itemSon.param] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chartBox {
  /* width: 1472px;
  height: 960px; */
  width: 100%;
  height: 400px;
  overflow-y: auto;
}
.tb-header {
  /* width: 1472px; */
  width: 100%;
  background: #0059ff69;
  color: #167bdf;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  margin-top: 45px;
}
.tb-body {
  width: 100%;
  height: 400px;
  overflow: hidden;
  /* width: 1472px;
  height: 830px; */
}
.tb-list {
  /* width: 1472px; */
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.tb-item {
  float: left;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 40px;
  color: #cee0f2;
}
.tb-zebra1 {
}
.tb-zebra2 {
}
.tb-zebra1:nth-child(odd) {
  background: #005aff10;
}
.tb-zebra2:nth-child(even) {
  background: #005aff10;
}
.anim {
  transition: all 0.5s;
  transform: translateY(-40px);
}
</style>
