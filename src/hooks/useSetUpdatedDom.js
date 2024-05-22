export const useSetUpdatedDom = async (newData, setDoms, updateDataOrigin) => {
  const needKeys = []
  // await initDoms(needKeys, setDoms)
  if (updateDataOrigin !== 'not') {
    newData.upDate.forEach((item) => {
      const moduleId = item.moduleId
      needKeys.push(moduleId)
      const msg = item.dataVolumeLimit === 1 || item.data.length === 1 ? item.data[0] : item.data
      console.log(updateDataOrigin, moduleId, msg)
      if (moduleId && msg) {
        nextTick(() => {
          pushUpdateMessage(msg, moduleId, setDoms)
        })
      }
    })
  }
  initDoms(needKeys, setDoms)
}

const initDoms = (needKeys, setDoms) => {
  for (const key in setDoms) {
    if (Object.hasOwnProperty.call(setDoms, key)) {
      const fn = setDoms[key]
      if (needKeys && !needKeys.includes(key)) {
        fn()
      } else {
        fn()
      }
    }
  }
}

const pushUpdateMessage = (msg, key, setDoms) => {
  // 执行更新
  console.log('pushUpdateMessage', key, msg, setDoms)
  if (setDoms[key]) {
    setDoms[key](msg)
  }
}
