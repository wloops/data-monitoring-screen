<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>
</template>

<script setup>
import AppProvider from '@/components/common/AppProvider.vue'
// import autofit from 'autofit.js'

// onMounted(() => {
//   autofit.init({
//     dh: 1080,
//     dw: 1920,
//     el: 'body',
//     resize: true,
//   })
// })
</script>
