import * as echarts from 'echarts'
import api from '@/api'
export const useChartsRight = () => {
  return {
    rightChart: {
      init1,
      getData1,
      init2,
      getData2,
      init3,
      getData3,
      getData4,
      init4,
    },
    appResponseTime,
    deviceStatusList,
  }
}

async function getData1(wsMsg) {
  let json = [
    {
      appName: 'NONE',
      transSuccNum: '60',
      transTotalNum: '100',
    },
    {
      appName: 'NONE1',
      transSuccNum: '30',
      transTotalNum: '100',
    },
    {
      appName: 'NONE2',
      transSuccNum: '76',
      transTotalNum: '100',
    },
  ]

  const data = [{ name: '私密性' }, { name: '完整性' }, { name: '真实性' }, { name: '不可否定性' }]

  let apiData = {
    resId: 625,
    operationID: 118,
    mouldID: '算法调用能力',
    itemname: '业务系统服务流水',
  }
  const res = await api.largeScreen(apiData)
  console.log('业务健康信息', res)
  let total = 0
  res.forEach((item) => {
    total += Number(item.num)
  })
  json = res.map((item, index) => {
    return {
      appName: data[index].name,
      transSuccNum: Number(item.num),
      transTotalNum: total,
    }
  })
  console.log('业务健康信息 after::', json)
  return { json }
}
async function init1(dom, wsMsg) {
  var myChart = echarts.init(dom)
  // var json = this.queryAppAvgTimeCurMinuteData
  const { json } = wsMsg ? wsMsg : await getData1()
  var dataValue = []
  var indicator = []
  for (var i = 0; i < json.length; i++) {
    var successRate = Number(json[i].transSuccNum) / Number(json[i].transTotalNum)
    successRate = successRate * 100
    var indicatorstr = {
      name: json[i].appName,
      max: '100',
    }
    indicator.push(indicatorstr)
    dataValue.push(successRate)
  }
  var option
  option = {
    // backgroundColor: '#031d33',
    tooltip: {
      textStyle: { fontSize: '14px' },
    },

    radar: {
      radius: '50%', //大小
      nameGap: 1, // 图中工艺等字距离图的距离
      center: ['50%', '35%'], // 图的位置
      name: {
        textStyle: {
          color: 'rgba(101, 213, 255, 1)',
          fontSize: 14,
        },
        formatter: function (name) {
          return name
        },
      },
      indicator: indicator,
      axisLine: {
        lineStyle: {
          color: 'rgba(153, 209, 246, 0.2)',
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: 'rgba(255,0,0,0)', // 图表背景的颜色
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(153, 209, 246, 0.2)', // 设置网格的颜色
        },
      },
    },

    series: [
      {
        name: '报警类型分析',
        type: 'radar',
        symbol: 'angle',
        itemStyle: {
          normal: {
            areaStyle: { type: 'default' },
          },
        },
        data: [
          {
            symbol: 'circle',
            symbolSize: 5,
            value: dataValue,
            areaStyle: { color: 'rgba(64, 205, 241, 0.2)' },
            itemStyle: {
              normal: {
                borderWidth: 1,
                color: 'RGBA(0, 34, 66, 1)',
                borderColor: 'rgba(146, 225, 255, 1)',
              },
            },
            lineStyle: {
              color: 'rgba(146, 225, 255, 1)',
              width: 1,
            },
          },
        ],
      },
    ],
  }
  option && myChart.setOption(option)
  // 图表自适应宽度
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

const appResponseTime = ref([])
async function getData2(wsMsg) {
  appResponseTime.value = [
    {
      appName: 'NONE',
      avaUsedTime: 500,
    },
    {
      appName: 'NONE2',
      avaUsedTime: 1000,
    },
    {
      appName: 'NONE3',
      avaUsedTime: 700,
    },
    {
      appName: 'NONE4',
      avaUsedTime: 100,
    },
  ]
  const data = await appResponseTime
  return { data }
}
async function init2(dom, wsMsg) {
  const { data } = wsMsg ? wsMsg : await getData2(wsMsg)
  return data
}

async function getData3(wsMsg) {
  const data = {
    rent: 15,
    busSystem: 45,
    keyNum: 26,
    hsm: 6,
  }
  let apiData = {
    resId: 625,
    operationID: 118,
    mouldID: '系统总体资产指标',
    itemname: '密钥档案',
  }
  const res = await api.largeScreen(apiData)
  console.log('总体资源指标', res)
  data.rent = Number(res[1]['rent'])
  data.busSystem = Number(res[2]['busSystem'])
  data.keyNum = Number(res[0]['keyNum'])
  data.hsm = Number(res[3]['hsm'])
  return data
}
async function init3(dom, wsMsg) {
  const data = wsMsg ? wsMsg : await getData3()
  var myChart = echarts.init(dom)
  var option

  var color = ['#0CD2E6', '#3751E6', '#FFC722', '#886EFF', '#008DEC', '#114C90', '#00BFA5']

  var title = '自定义legend、默认选中'
  var legend = ['租户', '业务系统', '密钥', '密码机']

  var seriesData = [
    { name: '租户', value: data.rent },
    { name: '业务系统', value: data.busSystem },
    { name: '密钥', value: data.keyNum },
    { name: '密码设备', value: data.hsm },
  ]
  // this.seriesData = seriesData

  var option = {
    // backgroundColor: '#050e31',
    color: color,
    // title: {
    //   top: 20,
    //   text: title,
    //   textStyle: {
    //     fontSize: 20,
    //     color: '#DDEEFF',
    //   },
    // },
    grid: {
      top: '0%',
      left: '20%',
      right: '1%',
      bottom: 0,
      containLabel: true,
    },
    legend: {
      orient: 'vertical',
      top: 'center',
      right: '12%',
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        align: 'left',
        verticalAlign: 'middle',
        color: '#fff',
        rich: {
          name: {
            color: '#fff',
            fontSize: 14,
          },
          value: {
            color: '#fff',
            fontSize: 14,
          },
          rate: {
            color: 'rgba(255,255,255,0.9)',
            fontSize: 14,
          },
        },
      },
      data: legend,
      formatter: (name) => {
        if (seriesData.length) {
          const item = seriesData.filter((item) => item.name === name)[0]
          // return `{name|${name}：}{value| ${item.value}} {rate| ${item.value}%}`
          // let label = name + ':' + item.value
          let label = name
          return label
          // return `{name|${name}:}{value| ${item.value}}`
        }
      },
    },
    series: [
      {
        name: '需求类型占比',
        type: 'pie',
        center: ['30%', '35%'],
        radius: ['45%', '65%'],
        label: {
          normal: {
            show: false,
            position: 'center',
            formatter: '{value|{c}}\n{label|{b}}',
            rich: {
              value: {
                padding: 5,
                align: 'center',
                verticalAlign: 'middle',
                fontSize: 24,
              },
              label: {
                align: 'center',
                verticalAlign: 'middle',
                fontSize: 10,
              },
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
              color: '#34d058',
            },
          },
        },
        labelLine: {
          show: false,
          length: 0,
          length2: 0,
        },
        data: seriesData,
      },
    ],
  }

  myChart.setOption(option)

  getDefaultSelected(myChart)

  function getDefaultSelected(myChart) {
    let index = 0
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 0,
    })
    myChart.on('mouseover', (e) => {
      if (e.dataIndex !== index) {
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index,
        })
      }
    })
    myChart.on('mouseout', (e) => {
      index = e.dataIndex
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      })
    })
  }

  // setInterval(function () {
  //   //用setInterval做动画感觉有问题
  //   draw()
  // }, 100)
  option && myChart.setOption(option)
  // 图表自适应宽度
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

const deviceStatusList = ref([])
async function getData4() {
  deviceStatusList.value = [
    {
      status: '启用',
      arrName: '设备1',
    },
    {
      status: '设计',
      arrName: '设备2',
    },
    {
      status: '设计',
      arrName: '设备3',
    },
    {
      status: '设计',
      arrName: '设备4',
    },
  ]
  let apiData = {
    resId: 625,
    operationID: 118,
    mouldID: '节点运行状态指标',
    itemname: 'CCSP节点管理',
  }
  const res = await api.largeScreen(apiData)
  console.log('设备状态 res', res)
  deviceStatusList.value = res.map((item) => {
    return {
      status: item.status,
      arrName: item.sysName,
    }
  })
  return deviceStatusList.value
}
async function init4(dom, wsMsg) {
  const data = wsMsg ? wsMsg : await getData4()
  return data
}
