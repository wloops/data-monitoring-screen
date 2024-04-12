import * as echarts from 'echarts'
import api from '@/api'

export const useChartsLeft = () => {
  return {
    leftChart: {
      init,
      getData,
    },
  }
}

// 1

async function getData(wsMsg) {
  const data = [
    {
      id: 1,
      name: '电子签章服务器0086',
      ip: '192.168.1.0.1',
      port: '80',
      runTime: '132.5个小时',
      cpuUsage: '28',
      memoryUsage: '56',
      // diskUsage: '80%',
      networkUsage: '86',
      chartData: {
        name: '设备风险值',
        value: 96,
      },
    },
    {
      id: 2,
      name: '时间微股务器003',
      ip: '192.168.1.0.2',
      port: '80',
      runTime: '1632.5个小时',
      cpuUsage: '48',
      memoryUsage: '96',
      // diskUsage: '80%',
      networkUsage: '15',
      chartData: {
        name: '设备风险值',
        value: 66,
      },
    },
    {
      id: 3,
      name: '动志口令服务器0052',
      ip: '192.168.1.0.33',
      port: '80',
      runTime: '13244.5个小时',
      cpuUsage: '80',
      memoryUsage: '56',
      // diskUsage: '80%',
      networkUsage: '45',
      chartData: {
        name: '设备风险值',
        value: 26,
      },
    },
  ]

  return data
}
async function init(wsMsg, dom) {
  const data = wsMsg ? wsMsg : await getData(wsMsg)
  // 1. 实例化对象
  let myChart = echarts.init(dom)
  // 2.指定配置
  let option
  var highlight = '#072F70'

  var demoData = [
    { name: '仪表盘1', value: 10, unit: '%', pos: ['50%', '60%'], range: [0, 100] },
    { name: '仪表盘2', value: 20, unit: '%', pos: ['49.8%', '70%'], range: [0, 100] },
    {
      name: '仪表盘3',
      value: 30,
      unit: '%',
      pos: ['83%', '70%'],
      range: [0, 100],
      // splitNum: 9,
    },
  ]

  data.forEach((item, index) => {
    demoData[index].name = item.chartData.name
    demoData[index].value = item.chartData.value
  })
  const item = demoData[0]
  option = {
    // backgroundColor: '#222939',

    series: [
      // 外围刻度
      {
        type: 'gauge',
        center: item.pos,
        radius: '50.33%', // 1行3个
        splitNumber: item.splitNum || 10,
        min: item.range[0],
        max: item.range[1],
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            shadowBlur: 0,
            color: [
              [0.3, '#00CDA5'],
              [0.7, '#0085F4'],
              [1, '#FD760D'],
            ],
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: highlight,
            width: 1,
          },
          length: -5,
          splitNumber: 10,
        },
        splitLine: {
          show: true,
          length: -14,
          lineStyle: {
            color: highlight,
          },
        },
        axisLabel: {
          distance: -20,
          textStyle: {
            color: 'inherit',
            fontSize: '10',
            fontWeight: 'bold',
          },
        },
        pointer: {
          show: 0,
        },
        detail: {
          show: 0,
        },
      },

      // 内侧指针、数值显示
      {
        name: item.name,
        type: 'gauge',
        center: item.pos,
        radius: '83%',
        startAngle: 225,
        endAngle: -45,
        min: item.range[0],
        max: item.range[1],
        axisLine: {
          show: true,
          lineStyle: {
            width: 5,
            color: [
              [0.3, '#00CDA5'],
              [0.7, '#0085F4'],
              [1, '#FD760D'],
            ],
          },
        },
        pointer: {
          show: true,
          length: '80%',
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          show: 0,
        },
        splitLine: {
          show: 0,
        },
        axisLabel: {
          show: 0,
        },
        detail: {
          show: true,
          offsetCenter: [0, '65%'],
          textStyle: {
            fontSize: 16,
            color: 'inherit',
          },
          formatter: ['{value} ' + (item.unit || ''), '{name|' + item.name + '}'].join('\n'),
          rich: {
            name: {
              fontSize: 12,
              lineHeight: 15,
              color: '#ddd',
            },
          },
        },
        itemStyle: {
          normal: {
            color: highlight,
          },
        },
        data: [
          {
            value: item.value,
          },
        ],
      },
    ],
  }

  // 3. 把配置给实例对象
  myChart.setOption(option)
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}
