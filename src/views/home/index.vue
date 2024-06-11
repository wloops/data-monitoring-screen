<script setup>
import autofit from 'autofit.js'

/**
 * 大屏效果需要满足16:9的屏幕比例，才能达到完美的大屏适配效果
 * 其他比例的大屏效果，不能铺满整个屏幕
 * @param {*} w 设备宽度 默认 1920 
 * @param {*} h 设备高度 默认 1080
 * @returns 返回值是缩放比例
 */
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}


onMounted(() => {
  // autofit.init({
  //   dh: 1080,
  //   dw: 1920,
  //   // scale: 1.2,
  //   // width: "80%",
  //   // height: "100%",
  //   el: '#main',
  //   resize: true,
  // })
  // setFullScreen() {
  // const screenNode = document.getElementById("screen");
  // // 非标准设备（笔记本小于1920，如：1366*768、mac 1432*896）
  // if (window.innerWidth < 1920) {
  //   screenNode.style.left = "50%";
  //   screenNode.style.transform = `scale(${getScale()}) translate(-50%, 0)`;
  // } else if (window.innerWidth === 1920) {
  //   // 标准设备 1920 * 1080
  //   screenNode.style.left = 0;
  //   screenNode.style.transform = `scale(1) translate(0, 0)`;
  // } else {
  //   // 大屏设备（4K 2560*1600）
  //   screenNode.style.left = "50%";
  //   screenNode.style.transform = `scale(${getScale()}) translate(-50%, 0)`;
  // }
  // // 监听视口变化
  // window.addEventListener("resize", () => {
  //   if (window.innerWidth === 1920) {
  //     screenNode.style.left = 0;
  //     screenNode.style.transform = `scale(1) translate(0, 0)`;
  //   } else {
  //     screenNode.style.left = "50%";
  //     screenNode.style.transform = `scale(${getScale()}) translate(-50%, 0)`;
  //   }
  // });
  // }
})
import gsap from 'gsap'
import BusinessOperation from '@/views/Business-operation/index.vue'
import DeviceStatus from '@/views/device-status/index.vue'
import DeviceRunStatus from '@/views/device-run-status/index.vue'
import { useUpdateInline } from '@/hooks/useUpdateInline'

// // window.addEventListener('message', function (event) {
// //   // 确保来源是可信任的域
// //   // if (event.origin !== '你的网址') {
// //   //   return
// //   // }
// //   // 获取从 Vue 组件发送过来的数据
// //   var receivedData = event.data
// //
// //   // 在这里处理接收到的数据
// //   console.log('父界面传输过来的数据', event) // 输出传输过来的数据
// //   // app.config.globalProperties.msg = receivedData.message
// //   window.sessionStorage.setItem('receivedData', JSON.stringify(receivedData.message))
// // })
// console.log('parentData:::', window.parentData)
// // 从父界面接受的数据
// const receivedData = JSON.parse(window.sessionStorage.getItem('receivedData'))
// console.log('receivedData *****', window.parent.parentData)

onMounted(() => {
  setTimeout(() => {
    // 关闭加载界面的动画
    const load = document.getElementById('load')
    gsap.to(load, {
      duration: 1,
      opacity: 0,
      ease: 'power3.inOut',
      onComplete: () => {
        // 删除加载动画的元素
        load.remove()
      },
    })
  }, 1000)
})
const { updateInlineData } = useUpdateInline()

const parentData = ref(null) // 父组件传过来的数据，默认为空
watch(updateInlineData, (newVal, oldVal) => {
  console.log('parentData从父界面接受的数据:::', newVal)
  parentData.value = newVal
  // 这里可以根据需要，进行其他的逻辑处理
  // 这里可以给 iframe 返回数据
  // window.parent.postMessage(JSON.stringify(newVal), 'http://www.nealyang.cn');
})
// const parentData = window.parent.parentData ? ref(window.parent.parentData) : ref(null) // 父组件传过来的数据，默认为空
const currentTab = ref('BusinessOperation')

if (parentData.value && parentData.value.defaultTabKey) {
  currentTab.value = parentData.value.defaultTabKey
}
const tabs = {
  BusinessOperation,
  DeviceStatus,
  DeviceRunStatus,
}

const componentKey = ref(0);

function refreshComponent() {
  // 改变key来强制重新渲染组件
  componentKey.value++;
}
</script>

<template>
  <div style="height: 100vh; overflow: hidden">

    <div id="load">
      <div class="load_img">
        <!-- 加载动画 -->
        <img class="jzxz1" src="./images/jzxz1.png" />
        <img class="jzxz2" src="./images/jzxz2.png" />
      </div>
    </div>

    <div class="main" id="main">
      <div style="width: 100%; position: absolute; top: 10%; left: 0">
        <div class="map">
          <div class="map1"></div>
          <!-- 地图模块 -->
          <div class="map2"></div>
          <div class="map3"></div>
        </div>
      </div>

      <div class="full-screen-container">
        <div id="screen">
          <!-- 大屏展示的内容 -->
          <!-- 头部的盒子 -->
          <div id="headerBox" z-2000>
            <Header-component @selectTab="currentTab = $event" :currentTab="currentTab"
              @refreshComponent="refreshComponent" />
          </div>

          <!-- 页面主体部分 -->
          <section class="mainbox" id="mainbox">
            <component :is="tabs[currentTab]" :parentData="parentData" :key="componentKey"
              @refreshComponent="refreshComponent"></component>
          </section>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import './css/index.scss';
</style>
