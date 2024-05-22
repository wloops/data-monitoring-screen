import * as echarts from 'echarts'
import api from '@/api'
import { useMonitorStore } from '@/store'

const store = useMonitorStore()

export const useChartsRight = () => {
  return {
    rightChart: {
      init1,
      getData1,
      init2,
      getData2,
      init3,
      getData3,
    },
    numberAnimation,
  }
}

const numberAnimation = ref({
  number1: 0,
  number2: 0,
})
async function getData1(wsMsg) {
  let xdata = ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07', '04/08']
  let data1 = [6, 8, 5, 4, 5, 6, 7, 6]
  let data2 = [4, 2, 5, 6, 5, 4, 3, 4]
  let data3 = [60, 80, 50, 40, 50, 60, 70, 60]

  // 数字动画
  let number1 = 994745202
  let number2 = 5266338
  
  if (wsMsg) {
    xdata = wsMsg.xdata
    data1 = wsMsg.data1
    data2 = wsMsg.data2
    data3 = wsMsg.data3
    number1 = wsMsg.number1
    number2 = wsMsg.number2
    store.SET_DS_RIGHT_DATA_01([{ xdata, data1, data2, data3, number1, number2 }])
  }else if (store.DS_RIGHT_DATA_01.length > 0) {
    xdata = store.DS_RIGHT_DATA_01[0].xdata
    data1 = store.DS_RIGHT_DATA_01[0].data1
    data2 = store.DS_RIGHT_DATA_01[0].data2
    data3 = store.DS_RIGHT_DATA_01[0].data3
    number1 = store.DS_RIGHT_DATA_01[0].number1
    number2 = store.DS_RIGHT_DATA_01[0].number2
  }

  return { xdata, data1, data2, data3, number1, number2 }
}
async function init1(wsMsg, dom) {
  var myChart = echarts.init(dom)
  const { xdata, data1, data2, data3, number1, number2 } = await getData1(wsMsg)

  // 数字动画
  numberAnimation.value = {
    number1,
    number2,
  }

  var option
  option = {
    // title: {
    //   show: true,
    //   text: '2019年销售水量和主营业务收入对比',
    //   textStyle: {
    //     align: 'center',
    //     color: '#fff',
    //     fontSize: 20,
    //   },
    //   top: '3%',
    //   left: '10%',
    // },
    // backgroundColor: '#0f375f',
    grid: {
      top: '35%',
      bottom: '10%', //也可设置left和right设置距离来控制图表的大小
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    legend: {
      data: ['已签发数', '已吊销数', '签发趋势'],
      top: '15%',
      itemGap: 10,
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        color: '#ffffff',
      },
    },
    xAxis: {
      data: xdata,
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: '#4DAAFF',
        },
      },
      axisTick: {
        show: true, //隐藏X轴刻度
      },
      axisLabel: {
        show: true,
        // textStyle: {
          color: '#fff', //X轴文字颜色
        // },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '百万张',
        nameTextStyle: {
          color: '#fff',
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#FFFFFF',
          },
        },
        axisLabel: {
          show: true,
          // textStyle: {
            color: '#fff',
          // },
        },
      },
      {
        type: 'value',
        name: '百分比(%)',
        nameTextStyle: {
          color: '#fff',
        },
        position: 'right',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          formatter: `{value}`, //右侧Y轴文字显示
          // textStyle: {
            color: '#fff',
          // },
        },
      },
      {
        type: 'value',
        gridIndex: 0,
        min: 50,
        max: 100,
        splitNumber: 8,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: {
          show: false,
          areaStyle: {
            color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'],
          },
        },
      },
    ],
    series: [
      {
        name: '已签发数',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          // normal: {
            borderRadius: 8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#008BFF',
              },
              {
                offset: 1,
                color: '#4693EC',
              },
            ]),
          // },
        },
        data: data1,
      },
      {
        name: '已吊销数',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          // normal: {
            borderRadius: 8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#FD740D',
              },
              {
                offset: 1,
                color: '#B78063',
              },
            ]),
          // },
        },
        data: data2,
      },
      {
        name: '签发趋势',
        type: 'line',
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: false, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: 'circle', //标记的图形为实心圆
        symbolSize: 8, //标记的大小
        itemStyle: {
          //折线拐点标志的样式
          color: '#009B8D',
        },
        lineStyle: {
          color: '#009B8D',
        },
        areaStyle: {
          color: 'rgba(5,140,255, 0.2)',
        },
        data: data3,
      },
    ],
  }

  option && myChart.setOption(option)
  // 图表自适应宽度
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

async function getData2(wsMsg) {
  let xdata = ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07', '04/08']
  let data1 = [6, 8, 5, 4, 5, 6, 7, 6]
  let data2 = [4, 2, 5, 6, 5, 4, 3, 4]
  if (wsMsg) {
    xdata = wsMsg.xdata
    data1 = wsMsg.data1
    data2 = wsMsg.data2
    store.SET_DS_RIGHT_DATA_02([{ xdata, data1, data2 }])
  }else if (store.DS_RIGHT_DATA_02.length > 0) {
    xdata = store.DS_RIGHT_DATA_02[0].xdata
    data1 = store.DS_RIGHT_DATA_02[0].data1
    data2 = store.DS_RIGHT_DATA_02[0].data2
  }
  return { xdata, data1, data2 }
}
async function init2(wsMsg, dom) {
  var myChart = echarts.init(dom)
  const { xdata, data1, data2 } = await getData2(wsMsg)

  var option
  option = {
    // title: {
    //   show: true,
    //   text: '2019年销售水量和主营业务收入对比',
    //   textStyle: {
    //     align: 'center',
    //     color: '#fff',
    //     fontSize: 20,
    //   },
    //   top: '3%',
    //   left: '10%',
    // },
    // backgroundColor: '#0f375f',
    grid: {
      top: '35%',
      bottom: '10%', //也可设置left和right设置距离来控制图表的大小
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    legend: {
      data: ['签发成功', '签发失败'],
      top: '15%',
      right: '10%',
      itemGap: 10,
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        color: '#ffffff',
      },
    },
    xAxis: {
      data: xdata,
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: '#4DAAFF',
        },
      },
      axisTick: {
        show: true, //隐藏X轴刻度
      },
      axisLabel: {
        show: true,
        // textStyle: {
          color: '#fff', //X轴文字颜色
        // },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '百万张',
        nameTextStyle: {
          color: '#fff',
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#FFFFFF',
          },
        },
        axisLabel: {
          show: true,
          // textStyle: {
            color: '#fff',
          // },
        },
      },
      {
        type: 'value',
        gridIndex: 0,
        min: 50,
        max: 100,
        splitNumber: 8,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: {
          show: false,
          areaStyle: {
            color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'],
          },
        },
      },
    ],
    series: [
      {
        name: '签发成功',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          // normal: {
            borderRadius: 8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#008BFF',
              },
              {
                offset: 1,
                color: '#4693EC',
              },
            ]),
          // },
        },
        data: data1,
      },
      {
        name: '签发失败',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          // normal: {
            borderRadius: 8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#FD740D',
              },
              {
                offset: 1,
                color: '#B78063',
              },
            ]),
          // },
        },
        data: data2,
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
  const data = [
    {
      alarmLevel: '紧急|2',
      message: '此处是告警内容文字占位',
      inputDate: '2023-07-05',
    },
    {
      alarmLevel: '重要|1',
      message: '此处是告警内容文字占位',
      inputDate: '2023-07-05',
    },
    {
      alarmLevel: '重要|1',
      message: '此处是告警内容文字占位',
      inputDate: '2023-07-05',
    },
    {
      alarmLevel: '提示|0',
      message: '此处是告警内容文字占位',
      inputDate: '2023-07-05',
    },
  ]
  const header = [
    { name: '告警级别', param: 'alarmLevel', width: 10 },
    { name: '告警内容', param: 'message', width: 60 },
    { name: '时间', param: 'inputDate', width: 30 },
  ]

  return { data, header }
}
const init3 = (wsMsg, dom) => {
  const { data, header } = getData3(wsMsg)
  return { data, header }
}
