<script setup>
import BusinessOperation from '@/views/Business-operation/index.vue'
import DeviceStatus from '@/views/device-status/index.vue'
import DeviceRunStatus from '@/views/device-run-status/index.vue'

const currentTab = ref('BusinessOperation')

const tabs = {
  BusinessOperation,
  DeviceStatus,
  DeviceRunStatus,
}
</script>

<template>
  <div style="width: 100%; position: absolute; top: 90px; left: 0">
    <div class="map">
      <div class="map1"></div>
      <div class="map2"></div>
      <div class="map3"></div>
    </div>
  </div>
  <div class="main">
    <!-- 头部的盒子 -->
    <Header-component @selectTab="currentTab = $event" />

    <!-- 页面主体部分 -->
    <section class="mainbox">
      <component :is="tabs[currentTab]"></component>
    </section>
    <!-- 地图模块 -->
  </div>
</template>

<style scoped>
@import './css/index.scss';
</style>
