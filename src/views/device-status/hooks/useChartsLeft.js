import * as echarts from 'echarts'
import api from '@/api'
import { useMonitorStore } from '@/store'

const store = useMonitorStore()

export const useChartsLeft = () => {
  return {
    leftChart: {
      init1,
      getData1,
      init2,
      getData2,
      init301,
      init302,
      getData301,
      getData302,
    },
    deviceMessage,
  }
}

// 1

const deviceMessage = ref({})
async function getData1(wsMsg) {
  let deviceInfo = {
    name: '数字签名系统',
    unit: '北京信安世纪科技股份有限公司',
    id: '80,139,44',
    ip: '192.168.1.0.1',
    version: 'v1.0',
  }
  let deviceStatus = {
    host: {
      desc: '主机状态',
      status: '正常',
    },
    spare: {
      desc: '备机状态',
      status: '异常',
    },
    run: {
      desc: '运行状态',
      status: '正常',
    },
    license: {
      desc: 'license状态',
      status: '过期',
    },
  }
  if (wsMsg) {
    deviceInfo = wsMsg.deviceInfo
    deviceStatus = wsMsg.deviceStatus
    store.SET_DS_LEFT_DATA_01([{ deviceInfo, deviceStatus }])
  }else if (store.DS_LEFT_DATA_01.length > 0) {
    deviceInfo = store.DS_LEFT_DATA_01[0].deviceInfo
    deviceStatus = store.DS_LEFT_DATA_01[0].deviceStatus
  }
  return {
    deviceInfo,
    deviceStatus,
  }
}
async function init1(wsMsg) {
  const { deviceInfo, deviceStatus } = await getData1(wsMsg)
  deviceMessage.value = {
    deviceInfo,
    deviceStatus,
  }
}
function getData2(wsMsg) {
  let data = [
    {
      name: 'CPU使用率',
      value: 45,
    },
    {
      name: '内存使用率',
      value: 20,
    },
    {
      name: '网卡使用率',
      value: 80,
    },
  ]
  if (wsMsg) {
    data = wsMsg
    store.SET_DS_LEFT_DATA_02(data)
  }else if (store.DS_LEFT_DATA_02.length > 0) {
    data = store.DS_LEFT_DATA_02
  }

  return data
}
async function init2(wsMsg, dom) {
  const data = getData2(wsMsg)
  console.log('设备硬件状态', data, wsMsg)
  // 1. 实例化对象
  let myChart = echarts.init(dom)
  // 2.指定配置
  let option
  var highlight = '#072F70'

  var demoData = [
    { name: '仪表盘1', value: 10, unit: '%', pos: ['16.6%', '70%'], range: [0, 100] },
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
    demoData[index].name = item.name
    demoData[index].value = item.value
  })
  option = {
    // backgroundColor: '#222939',

    series: (function () {
      var result = []

      demoData.forEach(function (item) {
        result.push(
          // 外围刻度
          {
            type: 'gauge',
            center: item.pos,
            radius: '80.33%', // 1行3个
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
              // textStyle: {
                color: 'inherit',
                fontSize: '12',
                fontWeight: 'bold',
              // },
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
              // textStyle: {
                fontSize: 20,
                color: 'inherit',
              // },
              show: true,
              offsetCenter: [0, '45%'],
              formatter: ['{value} ' + (item.unit || ''), '{name|' + item.name + '}'].join('\n'),
              rich: {
                name: {
                  fontSize: 16,
                  lineHeight: 15,
                  color: '#ddd',
                },
              },
            },
            itemStyle: {
              // normal: {
                color: highlight,
              // },
            },
            data: [
              {
                value: item.value,
              },
            ],
          }
        )
      })

      return result
    })(),
  }

  // 3. 把配置给实例对象
  myChart.setOption(option)
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

// 2
async function getData301(wsMsg) {
  let label = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
  let value = ['233', 233, 200, 180, 199, 233, 210, 180]
  if (wsMsg) {
    label = wsMsg.label
    value = wsMsg.value
    store.SET_DS_LEFT_DATA_03_1({ label, value })
  }else if (store.DS_LEFT_DATA_03_1.length > 0) {
    label = store.DS_LEFT_DATA_03_1[0].label
    value = store.DS_LEFT_DATA_03_1[0].value
  }
  return { label, value }
}
async function init301(wsMsg, dom) {
  var myChart = echarts.init(dom)
  var option
  const { label, value } = await getData301(wsMsg)

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
      bottom: 0,
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
          color: '#7ec7ff',
          fontSize: 16,
        },
        axisLine: {
          lineStyle: {
            color: '#243753',
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#22222',
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
        axisLabel: {
          // textStyle: {
            color: '#7ec7ff',
          // },
        },
        nameTextStyle: {
          color: '#fff',
          fontSize: 12,
          lineHeight: 40,
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
          // normal: {
            width: 3,
            color: '#19a3df',
          // },
        },
        areaStyle: {
          // normal: {
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
          // },
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
// 2 02
async function getData302(wsMsg) {
  let data = [70, 60, 50, 80, 30, 68, 40, 30]
  let xdata = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
  if (wsMsg) {
    data = wsMsg.data
    xdata = wsMsg.xdata
    store.SET_DS_LEFT_DATA_03_2({ data, xdata })
  }else if (store.DS_LEFT_DATA_03_2.length > 0) {
    data = store.DS_LEFT_DATA_03_2[0].data
    xdata = store.DS_LEFT_DATA_03_2[0].xdata
  }
  return {
    data,
    xdata,
  }
}
async function init302(wsMsg, dom) {
  var myChart = echarts.init(dom)
  var option
  const { data, xdata } = await getData302(wsMsg)

  /*
    最近本人发现了配置更简单，更容易理解，更容易修改，bug更少的写法
    
    所以更新了原图表，这里分享给大家
    
    不知道用以前写法的小伙伴有没有发现
    
    1.项目中如果数据为0的话，hover的时候用以前的写法文字会将圆点盖住...
    
    2.鼠标放上的时候，x轴Pointer文字可能会有些轻微的向上或向下的移动...
    
    3.文字下划线和文字见的距离过小，有的时候不是很符合需求...
    
    以下旧写法我都注释了哈，现在生效的是新写法，新写法我也解释说明了哦

*/

  /*

    这个注释建议看完代码再看哦
    
    1.如果axisLabel和axisPointer的margin相同，则padding[0]必须等于0
    
    2.实现效果axisLabel和AxisPointer的字体大小必须相同
    
    3.此配置实现效果axisLabel和axisPointer的margin必须相同
    
    其他配置同样可以实现效果，如lineHeight等
    
    这是我整理、删除多余相同配置项后总结出的，使用方便，便于封装复用
    
    适用于大多数图表的配置

    更复杂的样式还是要参考配置文档的哦???

*/
  const colorList = ['#5AF07E', '#F88452']
  var base = +new Date(2000, 9, 3)
  var oneDay = 24 * 3600 * 1000
  var date = []

  var data1 = []
  var data2 = []
  var data3 = []

  data1 = data
  date = xdata

  // for (var j = 1; j < 10; j++) {
  //   var now = new Date((base += oneDay))
  //   date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'))
  // }

  // for (var i = 1; i < 8; i++) {
  //   data1.push(Math.round(Math.random() * 100))
  //   // data2.push(Math.round(Math.random() * 20));
  //   // data3.push(Math.round(Math.random() * 20));
  // }

  option = {
    // backgroundColor: '#fff',
    grid: {
      top: 50,
      left: 20,
      bottom: 0,
      containLabel: true,
    },
    title: {
      text: '利润收支曲线',
      textStyle: {
        fontSize: 12,
        fontWeight: 400,
      },
      left: 'center',
      top: '5%',
      show: false,
    },
    legend: {
      x: 'center',
      y: 'top',
      show: true,
      top: '5%',
      right: '5%',
      left: '70%',
      itemWidth: 6,
      itemGap: 20,
      textStyle: {
        fontSize: 14,
        color: '#fff',
      },
      data: ['', '未及格'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          show: true,
          backgroundColor: '#fff',
          color: '#556677',
          borderColor: 'rgba(0,0,0,0)',
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetY: 0,
        },
        lineStyle: {
          width: 0,
        },
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c',
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)',
    },
    // dataZoom: [
    //     {
    //         type: 'inside',
    //         start: 0,
    //         end: 100,
    //     },
    //     {
    //         start: 0,
    //         end: 100,
    //     },
    // ],
    xAxis: [
      {
        type: 'category',
        data: date,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#BEC0CE',
          },
        },
        axisTick: {
          show: true,
        },
        axisLabel: {
          interval: 0,
          // textStyle: {
            color: '#7AC1FA',
          // },
          // 默认x轴字体大小
          fontSize: 16,
          // margin:文字到x轴的距离
          margin: 15,
        },
        axisPointer: {
          label: {
            // padding: [11, 5, 7],
            padding: [5, 5, 5, 5],
            /*
                    除了padding[0]建议必须是0之外，其他三项可随意设置

                    和CSSpadding相同，[上，右，下，左]

                    如果需要下边线超出文字，设左右padding即可，注：左右padding最好相同

                    padding[2]的10:

                    10 = 文字距下边线的距离 + 下边线的宽度

                    如：UI图中文字距下边线距离为7 下边线宽度为2

                    则padding: [0, 0, 9, 0]

                                */
            // 这里的margin和axisLabel的margin要一致!
            margin: 15,
            // 移入时的字体大小
            fontSize: 12,
            backgroundColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#fff', // 0% 处的颜色
                },
                {
                  // offset: 0.9,
                  offset: 0.86,
                  /*
                0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）

                                        */
                  color: '#fff', // 0% 处的颜色
                },
                {
                  offset: 0.86,
                  color: '#33c0cd', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#33c0cd', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
          },
        },
        boundaryGap: false,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '(分数)',
        nameTextStyle: {
          color: '#7AC1FA',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#DCE2E8',
          },
        },
        axisLabel: {
          // textStyle: {
            color: '#7AC1FA',
          // },
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
          },
        },
      },
    ],
    /*
     * 将折线分3端。绿色、灰色、红色
     */
    visualMap: {
      show: false,
      dimension: 1,
      pieces: [
        { gte: 0, lte: 60, color: '#F88452' },
        { gte: 60, lte: 100, color: '#5AF07E' },
      ],
    },
    series: [
      {
        name: '分数',
        type: 'line',
        data: data1,
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        emphasis: {
          focus: 'series',
        },
        lineStyle: {
          width: 3,
          // color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          //     {
          //         offset: 0,
          //         color: '#9effff',
          //     },
          //     {
          //         offset: 1,
          //         color: '#9E87FF',
          //     },
          // ]),
          // shadowColor: 'rgba(158,135,255, 0.3)',
          // shadowBlur: 10,
          // shadowOffsetY: 20,
        },
        itemStyle: {
          // normal: {
            color: colorList[0],
            borderColor: colorList[0],
          // },
        },
        // markPoint: {
        //     symbol: 'pin', //标记(气泡)的图形
        //     symbolSize: 50, //标记(气泡)的大小
        //     itemStyle: {
        //         // color: '#4587E7', //图形的颜色。
        //         borderColor: '#000', //图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
        //         borderWidth: 0, //描边线宽。为 0 时无描边。
        //         borderType: 'solid', //柱条的描边类型，默认为实线，支持 ‘solid’, ‘dashed’, ‘dotted’。
        //     },
        //     data: [
        //         { type: 'max', name: '最大值' },
        //         { type: 'min', name: '最小值' },
        //     ],
        // },
        markLine: {
          data: [
            {
              type: 'average',
              name: '及格线',
              yAxis: 60,
              lineStyle: { width: 1, color: '#7AC1FA' },
              label: { show: false },
            },
          ],
        },
      },
      {
        name: '未及格',
        type: 'line',
        data: null,
        symbolSize: 1,
        symbol: 'circle',
        smooth: true,
        yAxisIndex: 0,
        showSymbol: false,
        emphasis: {
          focus: 'series',
        },
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          // normal: {
            color: colorList[1],
            borderColor: colorList[1],
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
