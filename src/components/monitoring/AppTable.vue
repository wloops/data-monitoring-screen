<script setup>
const timer = ref(null)
const animate = ref(false)
const lineType = ref(false)
const props = defineProps({
  tbData: {
    type: Array,
    default: () => [],
  },
  tbHeader: {
    type: Array,
    default: () => [],
  },
  tableConfig: {
    type: Object,
    default: () => ({}),
  },
})
onMounted(() => {
  console.log('onMounted ->tableConfig', props.tableConfig, props.tbData)
  if (props.tableConfig.isRoll && props.tableConfig.isRoll === true) {
    setRoll()
  } else if (props.tbData && props.tbData.length > 5) {
    setRoll()
  }
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
    if (props.tbData && props.tbData.length > 5) {
      props.tbData.push(props.tbData[0])
      props.tbData.shift()
      lineType.value = !lineType.value
      animate.value = false
    }
  }, 500)
}

console.log('tbData:', props.tbData)
</script>

<template>
  <div overflow-hidden>
    <div class="tb-header">
      <div
        v-for="item in tbHeader"
        :class="['tb-item', 'tb-header-item', { 'item-flex': !item.width }]"
        :style="{ width: item.width + '%', textAlign: tableConfig.align || 'left' }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="tb-body">
      <div
        class="tb-body"
        :style="{
          height: tableConfig.height,
          overflow: 'hidden',
          textAlign: tableConfig.align || 'left',
        }"
        :class="{ anim: animate }"
      >
        <div
          class="tb-list"
          v-for="(item, index) in props.tbData"
          :class="{ 'tb-zebra1': !lineType, 'tb-zebra2': lineType }"
        >
          <div
            v-for="itemSon in tbHeader"
            :class="['tb-item', { 'item-flex': item.width }]"
            :style="{ width: itemSon.width + '%', textAlign: tableConfig.align || 'left' }"
          >
            <template
              v-if="
                typeof item[itemSon.param] === 'string' && item[itemSon.param].indexOf('|') > -1
              "
            >
              <n-badge dot v-if="item[itemSon.param].split('|')[1] === '0'" color="#0E6DB6" />
              <n-badge dot v-if="item[itemSon.param].split('|')[1] === '1'" color="#E69C68" />
              <n-badge dot v-if="item[itemSon.param].split('|')[1] === '2'" color="#D85C6D" />
              {{ item[itemSon.param].split('|')[0] }}
            </template>
            <template v-else>
              {{ item[itemSon.param] }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tb-header {
  /* width: 1472px; */
  width: 100%;
  background: rgba(0, 109, 198, 0.3);
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin-top: 45px;
  display: flex;
}
.tb-body {
  /* width: 100%;
  height: 400px;
  overflow: hidden; */
  /* width: 1472px;
  height: 830px; */
  max-height: calc(32px * 5);
}
.item-flex {
  flex: 1;
}
.tb-list {
  /* width: 1472px; */
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  display: flex;
  margin-bottom: 2px;
}
.tb-item {
  flex: 1;
  /* float: left; */
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  height: 30px;
  color: #cee0f2;
  background: rgba(0, 109, 198, 0.08);
  margin: 2px;
  padding: 0 3px;
}
.tb-header-item {
  background: rgba(0, 109, 198, 0.1);
  color: #00b2f8;
  /* flex: 1; */
  padding: 0 3px;
}
/* .tb-zebra1 {
}
.tb-zebra2 {
} */
.tb-zebra1:nth-child(odd) {
  background: #005aff10;
}
.tb-zebra2:nth-child(even) {
  background: #005aff10;
}
.anim {
  transition: all 0.5s;
  transform: translateY(-30px);
}
</style>
