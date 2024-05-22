export const useUpdateInline = () => {
  const updateInlineData = ref({})
  onMounted(() => {
    /**
     * 监听 父界面 传过来的数据
     */
    window.addEventListener('message', function (e) {
      console.log('监听到数据', e.data)
      // 这就是接收到的数据
      console.log('接收到的数据~~~~', JSON.parse(e.data))
      // 接收到之后，再进行其他的逻辑处理就可以了
      updateInlineData.value = JSON.parse(e.data)
      // 如果还想给 iframe 返回数据，请这样写
      //window.parent.postMessage(JSON.stringify(data), 'http://www.nealyang.cn');
    })
  })
  // const receivedData = getparentMessage()

  watch(updateInlineData, (newVal, oldVal) => {
    console.log('更新数据', newVal)
    // 这里可以根据需要，进行其他的逻辑处理
    // 这里可以给 iframe 返回数据
    // window.parent.postMessage(JSON.stringify(newVal), 'http://www.nealyang.cn');
  })

  const updateInlineDoms = (data) => {
    updateInlineData.value = data
  }
  return {
    updateInlineDoms,
    updateInlineData,
  }
}
