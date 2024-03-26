<script setup>
const props = defineProps({
  deviceStatusList: {
    type: Array,
    default: () => [],
  },
})
console.log('deviceStatusList', props.deviceStatusList)
</script>

<template>
  <div class="mainBox">
    <div class="statusBoxAll">
      <div class="statusBox" v-for="(item, index, i) in deviceStatusList">
        <!-- 正常状态 -->
        <div class="img1" v-if="item.status === '1'"></div>
        <!-- 故障状态 -->
        <div class="img2" v-if="item.status === '11'"></div>
        <!-- 离线状态 -->
        <div class="img3" v-if="item.status === '10'"></div>
        <!-- 维修中状态 -->
        <div class="img4" v-if="item.status === '0'"></div>
        <div class=""></div>
        <div class="facilityName">{{ item.arrName }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* // 滚动条的宽度 */
.statusBoxAll::-webkit-scrollbar {
  /* // 横向滚动条 */
  width: 8px;
  /* // 纵向滚动条 必写 */
  height: 10px;
}
.statusBoxAll::-webkit-scrollbar-track-piece {
  /* //滚动条凹槽的颜色，还可以设置边框属性 */
  background-color: transparent;
}
/* // 滚动条的滑块 */
.statusBoxAll::-webkit-scrollbar-thumb {
  background-color: #2e3664;
  /* //滚动条的设置 */
  /* // background-color: #c1c1c1; */
  background-clip: padding-box;
  border-radius: 3px;
}
.statusBoxAll::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.statusBoxAll {
  /* width: 90%; */
  margin-top: 0rem;
  height: 0%;
  overflow-x: hidden;
  /* overflow-y: auto; */
  overflow-y: hidden;
  /* margin-left: 1rem; */
  display: flex;
  justify-content: space-around;
}
.statusBox {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 20%;
}
.statusBox .img1 {
  width: 100%;
  height: 12vh;
  background: url(../img/状态-正常.png) no-repeat 50%;
  background-size: 100%;
  /* margin: 0.2rem 0; */
}
.statusBox .img2 {
  width: 100%;
  height: 12vh;
  background: url(../img/状态-故障.png) no-repeat 50%;
  background-size: 100%;
  /* margin: 0.2rem 0; */
}
.statusBox .img3 {
  width: 100%;
  height: 12vh;
  background: url(../img/状态-离线.png) no-repeat 50%;
  background-size: 100%;
  /* margin: 0.2rem 0; */
}
.statusBox .img4 {
  width: 100%;
  height: 12vh;
  background: url(../img/状态-维修中.png) no-repeat 50%;
  background-size: 100%;
  /* margin: 0.2rem 0; */
}
</style>
