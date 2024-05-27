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
  }
}

async function getData1(wsMsg) {
  let xdata = ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07', '04/08']
  let data = [
    {
      name: '银行001',
      list: [70, 30, 30, 40, 48, 80, 46, 40],
    },
    {
      name: '银行002',
      list: [20, 30, 50, 24, 43, 50, 70, 30],
    },
    {
      name: '银行003',
      list: [80, 40, 50, 60, 45, 60, 77, 40],
    },
    {
      name: '银行004',
      list: [40, 50, 60, 74, 50, 70, 60, 50],
    },
    {
      name: '银行005',
      list: [60, 60, 70, 80, 90, 40, 70, 60],
    },
    {
      name: '银行006',
      list: [70, 70, 30, 90, 70, 40, 20, 70],
    },
  ]
  if(wsMsg){
    data = wsMsg.data
    xdata = wsMsg.xdata
    store.SET_BO_RIGHT_DATA_01([{xdata, data}])
  }else if(store.BO_RIGHT_DATA_01.length > 0){
    data = store.BO_RIGHT_DATA_01[0].data
    xdata = store.BO_RIGHT_DATA_01[0].xdata
  }

  return { xdata, data }
}
async function init1(wsMsg, dom) {
  var myChart = echarts.init(dom)
  const { xdata, data } = await getData1(wsMsg)
  let seriesLst = []
  let legendData = []
  let colorList = ['#1a9bfc', '#99da69', '#e32f46', '#7049f0', '#fa704d', '#01babc']
  data.forEach((item, index) => {
    legendData.push(item.name)
    seriesLst.push({
      name: item.name,
      type: 'line',
      yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
      smooth: true, //平滑曲线显示
      showAllSymbol: true, //显示所有图形。
      symbol: 'circle', //标记的图形为实心圆
      symbolSize: 0, //标记的大小
      itemStyle: {
        //折线拐点标志的样式
        color: colorList[index % colorList.length],
      },
      lineStyle: {
        color: colorList[index % colorList.length], //折线颜色
      },
      // areaStyle: {
      //   color: 'rgba(5,140,255, 0.2)',
      // },
      data: item.list,
    })
  })
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
      data: legendData,
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
        fontSize: 14,
        // textStyle: {
          color: '#fff', //X轴文字颜色
        // },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '(ms)',
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
        // name: '百分比(%)',
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
          show: false,
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
    series: seriesLst,
  }

  option && myChart.setOption(option)
  // 图表自适应宽度
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

async function getData2(wsMsg) {
  let xdata = [
    'APP01',
    'APP02',
    'APP03',
    'APP04',
    'APP05',
  ]
  let data = [80, 70, 30, 85, 25]
  if(wsMsg){
    data = wsMsg.data
    xdata = wsMsg.xdata
    store.SET_BO_RIGHT_DATA_02([{xdata, data}])
  }else if(store.BO_RIGHT_DATA_02.length > 0){
    data = store.BO_RIGHT_DATA_02[0].data
    xdata = store.BO_RIGHT_DATA_02[0].xdata
  }

  return { xdata, data }
}
async function init2(wsMsg, dom) {
  var myChart = echarts.init(dom)
  const { xdata, data } = await getData2(wsMsg)
  if (xdata.length < 1 && data.length < 1) {
    return
  }
  var option
  // var data = [80, 70, 30, 85, 25]
  var indicatorname = xdata
  // var maxdata = [100, 100, 100, 100, 100]

  function contains(arrays, obj) {
    var i = arrays.length
    while (i--) {
      if (arrays[i] === obj) {
        return i
      }
    }
    return false
  }

  var indicator = []
  for (var i = 0; i < indicatorname.length; i++) {
    indicator.push({
      name: indicatorname[i],
      // max: maxdata[i],
    })
  }

  function innerdata(i) {
    var innerdata = []
    for (let j = 0; j < data.length; j++) {
      innerdata.push(100 - 20 * i)
    }
    return innerdata
  }

  let optionData = getData(data)

  function getData(data) {
    var res = {
      series: [
        {
          type: 'radar',
          symbolSize: 5,
          symbol: 'circle',
          areaStyle: {
            color: '#39B2FF',
            opacity: 0.3,
          },
          lineStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#00A2FF',
                },
                {
                  offset: 1,
                  color: '#0060FF',
                },
              ],
              false
            ),
            width: 3,
          },
          itemStyle: {
            color: '#fff ',
            borderColor: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#00DEFF',
                },
                {
                  offset: 1,
                  color: '#1598FF',
                },
              ],
              false
            ),
            borderWidth: 2,
            opacity: 1,
          },
          label: {
            show: false,
          },
          data: [
            {
              value: data,
            },
          ],
          z: 100,
        },
      ],
    }
    for (let i = 0; i < data.length; i++) {
      res.series.push({
        type: 'radar',
        data: [
          {
            value: innerdata(i),
          },
        ],
        symbol: 'none',
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          color: '#fff',
        },
        areaStyle: {
          color: 'rgba(47, 131, 209, 0.2)',
          shadowColor: 'rgba(47, 131, 209, 0.15)',
          shadowBlur: 30,
          shadowOffsetY: 20,
        },
      })
    }
    return res
  }

  option = {
    // backgroundColor: '#fff',
    grid: {
      top: '35%',
    },
    tooltip: {
      formatter: function () {
        var html = ''
        for (var i = 0; i < data.length; i++) {
          html += indicatorname[i] + ' : ' + data[i] + '%<br>'
        }
        return html
      },
    },
    radar: {
      indicator: indicator,
      center: ['50%', '60%'], // 雷达图的位置
      radius: 70, //雷达图的半径
      splitArea: {
        show: true,
        areaStyle: {
          color: 'rgba(14,122,191,0.2)',
          shadowColor: 'rgba(14,122,191,0.05)',
          shadowBlur: 30,
          shadowOffsetY: 20,
        },
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisName: {
        // textStyle: {
          rich: {
            a: {
              fontSize: '14',
              color: '#007197',
              align: 'left',
              lineHeight: '30',
              fontWeight: 'bold',
            },
            b: {
              fontSize: '16',
              color: '#00CAE6',
              align: 'left',
            },
          },
        // },

        formatter: function (params, index) {
          var i = contains(indicatorname, params)
          // var percent = (data[i] / 100) * 100
          // return '{a|' + percent + '%}\n' + '{b|' + params + '}'
          return '{a|' + data[i] + '}\n' + '{b|' + params + '}'
        },
      },
    },
    series: optionData.series,
  }

  option && myChart.setOption(option)
  // 图表自适应宽度
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

function getData3(wsMsg) {
  let data = [
    {
      appName: 'APP01',
      time: 500,
    },
    {
      appName: 'APP02',
      time: 1000,
    },
    {
      appName: 'APP03',
      time: 700,
      status: '1',
    },
    {
      appName: 'APP04',
      time: 100,
    },
    {
      appName: 'APP05',
      time: 500,
    },
    {
      appName: 'APP06',
      time: 1000,
      status: '1',
    },

  ]
  if(wsMsg){
    data = wsMsg
    store.SET_BO_RIGHT_DATA_03(data)
  }else if(store.BO_RIGHT_DATA_03.length > 0){
    data = store.BO_RIGHT_DATA_03
  }
  return data
}
function init3(wsMsg) {
  const data = getData3(wsMsg)
  return data
}
