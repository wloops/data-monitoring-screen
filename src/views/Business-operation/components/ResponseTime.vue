<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
onMounted(() => {
  // 计算tb-body高度
  const parentElement = document.querySelector('.appResponseTime')
  const scrollBox = document.querySelector('.responseTimeAll')
  if (parentElement) {
    const width = parentElement.offsetWidth - 50
    const height = parentElement.offsetHeight - 100
    console.log('width:', width, 'height:', height)
    scrollBox.style.width = width + 'px'
    scrollBox.style.height = height + 'px'
  }

})
console.log('props', props.data)
</script>

<template>
  <div p-30 flex justify-center align-center>
    <div class="responseTime">
      <div class="responseTimeTitle">
        <span style="margin-right: 5px">
          <span class="end"></span>
          已安装/已连接
        </span>
        <span>
          <span class="not"></span>
          未安装/未连接
        </span>
      </div>
      <div class="responseTimeAll">
        <div v-for="item in data">
          <div :class="['responseTimeBox', item.status === '1' ? 'responseTimeBox2' : '']">
            <span class="picon" v-if="item.status !== '1'"></span>
            <p style="font-size: 14px; margin-bottom: 0px">{{ item.appName }}</p>
            <p>
              <span class="responseTimeNum">{{ item.time }}</span>
              <span class="responseTimeMs">ms</span>
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.responseTime {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
  overflow: hidden;
}

.responseTimeTitle {
  /* width: 100%; */
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 10px; */
  /* margin-right: 30px; */
  color: white;
  font-size: 16px;
}

.responseTimeTitle .end {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #007197;
}

.responseTimeTitle .not {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #012054;
  border: 1px solid #0063bd;
}

.responseTimeAll {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  justify-items: center;
  margin-top: 30px;
  /* margin-right: 10px; */
  overflow: hidden;
}

.responseTimeBox {
  width: 108px;
  height: 65px;
  background-color: #002158;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  border: 1px solid #0063bd;
  border-radius: 3px;
  position: relative;
  margin: 5px;
}

.responseTimeBox2 {
  background-color: #007197;
  border: 1px solid #007197;
}

.responseTimeBox .picon {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 15px solid #008dff;
  border-right: 15px solid transparent;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 3px;
}

.responseTimeBox .responseTimeNum {
  font-size: 20px;
  font-weight: 700;
  padding-right: 5px;
}

.responseTimeBox .responseTimeMs {
  font-size: 10px;
  padding: 0 2px;
}
</style>
