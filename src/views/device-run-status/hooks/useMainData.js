import api from '@/api'
import * as echarts from 'echarts'

export function useMainData() {
  return {
    centerChart: {
      getData1,
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
}

async function getData2(wsMsg) {
  const xdata = ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07', '04/08']
  const data1 = [6, 8, 5, 4, 5, 6, 7, 6]
  const data2 = [4, 2, 5, 6, 5, 4, 3, 4]

  return { xdata, data1, data2 }
}
async function init2(wsMsg, dom) {
  var myChart = echarts.init(dom)
  // const { xdata, data1, data2 } = wsMsg ? wsMsg : await getData2()

  var option
  const data = [1.55, 2.5, 1.5, 1.0, 1.25, 3, 2.5]
  const xdata = [
    '签名服务器',
    '金融加密机',
    '时间戳',
    '证书认证系统',
    '网关服务器',
    '动态口令',
    '生物认证',
  ]
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
          textStyle: {
            fontSize: 10,
          },
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
        barWidth: '8px',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,244,255,0.7)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0,77,167,1)', // 100% 处的颜色
                },
              ],
              false
            ),
            barBorderRadius: [30, 30, 30, 30],
            shadowColor: 'rgba(0,160,221,1)',
            shadowBlur: 2,
          },
        },
        label: {
          normal: {
            show: true,
            lineHeight: 30,
            width: 80,
            height: 30,
            backgroundColor: 'rgba(0,160,221,0.1)',
            borderRadius: 200,
            position: ['-13', '-60'],
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
                height: 20,
                borderWidth: 1,
                borderColor: '#234e6c',
                align: 'left',
              },
            },
          },
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

const getData3 = () => {
  const data = [
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
  const header = ref([
    // { name: '告警级别', param: 'alarmLevel', width: 10 },
    { name: '设备名称', param: 'deviceName' },
    { name: '设备总数量', param: 'total' },
    { name: '在线数量', param: 'onlineNum' },
    { name: '离线数量', param: 'offlineNum' },
  ])

  return { data, header }
}
const init3 = (wsMsg) => {
  const { data, header } = wsMsg ? wsMsg : getData3()
  return { data, header }
}
