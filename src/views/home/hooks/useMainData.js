import api from '@/api'

const topCenterData = ref({
  total: 0,
  success: 0,
  fail: 0,
})
async function getServiceFlow(wsMsg) {
  let apiData = {
    resId: 625,
    operationID: 118,
    mouldID: '系统当前运行状态指标',
    itemname: '业务系统服务流水',
  }
  const res = await api.largeScreen(apiData)
  console.log('业务系统服务流水 res', res)
  topCenterData.value = {
    total: Number(res[0].totalTransNums),
    fail: Number(res[0].failNum),
    success: Number(res[0].totalTransNums) - Number(res[0].failNum),
  }
}

export default function useMainData() {
  return {
    getServiceFlow,
    topCenterData,
  }
}
