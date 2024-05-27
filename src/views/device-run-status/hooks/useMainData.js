import api from '@/api'
import * as echarts from 'echarts'
import { useMonitorStore } from '@/store'

const store = useMonitorStore()

export function useMainData() {
  return {
    centerChart: {
      getData1,
      init1,
      getData2,
      init2,
      getData3,
      init3,
    },
    deviceCount,
  }
}
const deviceCount = ref({
  online: 0,
  offline: 0,
})

const getData1 = async (wsMsg) => {
  // const { data } = await api.device.getDeviceCount()
  deviceCount.value = {
    online: 3790,
    offline: 259,
  }
  if (wsMsg) {
    deviceCount.value = {
      online: Number(wsMsg.online),
      offline: Number(wsMsg.offline),
    }
    store.SET_DRS_MIDDLE_DATA_01([deviceCount.value])
  }else if (store.DRS_MIDDLE_DATA_01.length > 0) {
    deviceCount.value = {
      online: store.DRS_MIDDLE_DATA_01[0].online,
      offline: store.DRS_MIDDLE_DATA_01[0].offline,
    }
  }

  return deviceCount.value
}
const init1 = (wsMsg) => {
  const { data, header } = getData1(wsMsg)
  return { data, header }
}

async function getData2(wsMsg) {
  let data = [1.55, 2.5, 1.5, 1.0, 1.25, 3, 2.5]
  let xdata = [
    '签名服务器',
    '金融加密机',
    '时间戳',
    '证书认证系统',
    '网关服务器',
    '动态口令',
    '生物认证',
  ]
  if (wsMsg) {
    data = wsMsg.data
    xdata = wsMsg.xdata
    store.SET_DRS_MIDDLE_DATA_02([{data, xdata}])
  }else if (store.DRS_MIDDLE_DATA_02.length > 0) {
    data = store.DRS_MIDDLE_DATA_02[0].data
    xdata = store.DRS_MIDDLE_DATA_02[0].xdata
  }
  return { data, xdata }
}
async function init2(wsMsg, dom) {
  var myChart = echarts.init(dom)
  const { xdata, data } = await getData2(wsMsg)

  var option
  // const data = [1.55, 2.5, 1.5, 1.0, 1.25, 3, 2.5]
  // const xdata = [
  //   '签名服务器',
  //   '金融加密机',
  //   '时间戳',
  //   '证书认证系统',
  //   '网关服务器',
  //   '动态口令',
  //   '生物认证',
  // ]
  option = {
    // backgroundColor: '#00265f',
    // "title": {
    //     text: "政策补贴额度1",
    //     x: "center",
    //     y:"4%",
    //     textStyle: {
    //         color: '#fff',
    //         fontSize: '22'
    //     },
    //     subtextStyle: {
    //         color: '#90979c',
    //         fontSize: '16',

    //     },
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: '30%',
      right: '5%',
      left: '10%',
      bottom: '12%',
    },
    xAxis: [
      {
        type: 'category',
        data: xdata,
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.12)',
          },
        },
        axisLabel: {
          margin: 10,
          color: '#e2e9ff',
          fontSize: 14,
        },
      },
    ],
    yAxis: [
      {
        name: '（运行时长：年）',
        axisLabel: {
          formatter: '{value}',
          color: '#e2e9ff',
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,1)',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.12)',
          },
        },
      },
    ],
    series: [
      {
        type: 'bar',
        data: data,
        barWidth: '20px',
        itemStyle: {
          // normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#008CFF', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#008CFF', // 100% 处的颜色
                },
              ],
              false
            ),
            borderRadius: [30, 30, 0, 0],
            shadowColor: 'rgba(0,160,221,1)',
            shadowBlur: 1,
          // },
        },
        label: {
          // normal: {
            show: true,
            lineHeight: 30,
            width: 80,
            height: 30,
            backgroundColor: 'rgba(0,160,221,0.1)',
            borderRadius: 200,
            position: ['-8', '-50'],
            distance: 1,
            formatter: ['    {d|●}', ' {a|{c}}     \n', '    {b|}'].join(','),
            rich: {
              d: {
                color: '#3CDDCF',
              },
              a: {
                color: '#fff',
                align: 'center',
              },
              b: {
                width: 1,
                height: 15,
                borderWidth: 0,
                borderColor: '#234e6c',
                align: 'left',
              },
            },
          // },
        },
      },
    ],
  }

  option && myChart.setOption(option)
  // 图表自适应宽度
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

const getData3 = (wsMsg) => {
  let data = [
    {
      deviceName: '签名服务器',
      total: 100,
      onlineNum: 80,
      offlineNum: 20,
    },
    {
      deviceName: '金融加密机',
      total: 100,
      onlineNum: 80,
      offlineNum: 20,
    },
    {
      deviceName: '时间戳',
      total: 100,
      onlineNum: 80,
      offlineNum: 20,
    },
    {
      deviceName: '证书认证系统',
      total: 100,
      onlineNum: 80,
      offlineNum: 20,
    },
    {
      deviceName: '网关服务器',
      total: 100,
      onlineNum: 80,
      offlineNum: 20,
    },
    {
      deviceName: '动态口令',
      total: 100,
      onlineNum: 80,
      offlineNum: 20,
    },
    {
      deviceName: '生物认证',
      total: 100,
      onlineNum: 80,
      offlineNum: 20,
    },
  ]
  let header = [
    // { name: '告警级别', param: 'alarmLevel', width: 10 },
    { name: '设备名称', param: 'deviceName' },
    { name: '设备总数量', param: 'total' },
    { name: '在线数量', param: 'onlineNum' },
    { name: '离线数量', param: 'offlineNum' },
  ]
  if (wsMsg) {
    data = wsMsg.data
    header = wsMsg.header
    store.SET_DRS_MIDDLE_DATA_03([{data, header}])
  }else if (store.DRS_MIDDLE_DATA_03.length > 0) {
    data = store.DRS_MIDDLE_DATA_03[0].data
    header = store.DRS_MIDDLE_DATA_03[0].header
  }
  return { data, header }
}
const init3 = (wsMsg) => {
  const { data, header } = getData3(wsMsg)
  return { data, header }
}
