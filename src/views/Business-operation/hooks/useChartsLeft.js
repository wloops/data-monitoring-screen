import * as echarts from 'echarts'
import api from '@/api'

export const useChartsLeft = () => {
  return {
    leftChart: {
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
  const label = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
  const value = ['233', 233, 200, 180, 199, 233, 210, 180]
  return { label, value }
}
async function init1(wsMsg, dom) {
  var myChart = echarts.init(dom)
  var option
  const { label, value } = wsMsg ? wsMsg : await getData1(wsMsg)

  /**
   *
   * 作者: GhostCat
   * 博客: https://gcat.cc
   * 描述: 带点和渐变的折线图
   *
   */

  option = {
    // backgroundColor: '#101e44',
    grid: {
      top: 50,
      left: 20,
      bottom: 10,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255,255,255,0)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(255,255,255,1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255,255,255,0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          formatter: '{value}',
          fontSize: 14,
          margin: 20,
          textStyle: {
            color: '#7ec7ff',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#243753',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#243753',
          },
        },
        axisTick: {
          show: false,
        },
        data: label,
      },
    ],
    yAxis: [
      {
        boundaryGap: false,
        type: 'value',
        name: '(百万次)',
        axisLabel: {
          textStyle: {
            color: '#7ec7ff',
          },
        },
        nameTextStyle: {
          color: '#7ec7ff',
          fontSize: 12,
          lineHeight: 20,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#243753',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#283352',
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '',
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbolSize: 5,
        zlevel: 3,
        itemStyle: {
          color: '#19a3df',
          borderColor: '#a3c8d8',
        },
        lineStyle: {
          normal: {
            width: 3,
            color: '#19a3df',
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(88,255,255,0.2)',
                },
                {
                  offset: 0.8,
                  color: 'rgba(88,255,255,0)',
                },
              ],
              false
            ),
          },
        },
        data: value,
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
  let data = [
    {
      id: 1,
      name: '签名服务器',
      number: 1022,
    },
    {
      id: 3,
      name: '时间戳服务器',
      number: 103,
    },
    {
      id: 2,
      name: '金融加密机',
      number: 460.5,
    },
    {
      id: 4,
      name: '证书认证系统',
      number: 350,
    },
    {
      id: 5,
      name: '动态口令服务器',
      number: 430,
    },
  ]
  // 排序
  data.sort((a, b) => b.number - a.number)
  // 取前5个
  data = data.slice(0, 5)
  // 计算总数
  const total = data.reduce((acc, cur) => acc + cur.number, 0)
  // 计算百分比
  data.forEach((item) => {
    item.percent = (item.number / total) * 100
    // 不保留小数点
    item.percent = item.percent.toFixed(0)
  })
  return data
}
async function init2(wsMsg) {
  const data = wsMsg ? wsMsg : await getData2()

  return data
}

async function getData3(wsMsg) {
  const xdata = ['网上银行', '手机银行', '电话银行', '自助银行', 'POS', '银行卡业务']
  const data1 = [6, 8, 5, 4, 5, 6]
  const data2 = [4, 2, 5, 6, 5, 4]

  return { xdata, data1, data2 }
}
async function init3(wsMsg, dom) {
  var myChart = echarts.init(dom)
  const { xdata, data1, data2 } = wsMsg ? wsMsg : await getData3()

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
      data: ['交易成功', '交易失败'],
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
        fontSize: 10,
        textStyle: {
          color: '#fff', //X轴文字颜色
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: '(万次)',
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
          textStyle: {
            color: '#fff',
          },
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
        name: '交易成功',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 8,
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
          },
        },
        data: data1,
      },
      {
        name: '交易失败',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 8,
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
          },
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
