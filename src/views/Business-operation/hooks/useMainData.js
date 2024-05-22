import api from '@/api'
import * as echarts from 'echarts'
import { useMonitorStore } from '@/store'

const store = useMonitorStore()

export function useMainData() {
  return {
    centerChart: {
      getData1,
      init1,
      getData201,
      init201,
      getData202,
      init202,
      getData3,
      init3,
    },
    deviceCount,
  }
}
const deviceCount = ref({
  total: 0,
  offline: 0,
})

const getData1 = async (wsMsg) => {
  deviceCount.value = {
    total: 3790,
    offline: 259,
  }

  if (wsMsg) {
    deviceCount.value = {
      total: Number(wsMsg.total),
      offline: Number(wsMsg.offline),
    }
    store.SET_BO_MIDDLE_DATA_01([deviceCount.value])
  }else if (store.BO_MIDDLE_DATA_01.length > 0) {
    deviceCount.value = {
      total: store.BO_MIDDLE_DATA_01[0].total,
      offline: store.BO_MIDDLE_DATA_01[0].offline,
    }
  }

  return deviceCount.value
}

async function init1(wsMsg) {
  const data = await getData1(wsMsg)
  console.log('init1 wsMsg:', wsMsg, data)
}

const getData201 = async (wsMsg) => {
  let xdata = ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07', '04/08']
  let data1 = [6, 8, 5, 4, 5, 6, 7, 6]
  let data2 = [4, 2, 5, 6, 5, 4, 3, 4]
  let data3 = [60, 80, 50, 40, 50, 60, 70, 60]

  if (wsMsg) {
    xdata = wsMsg.xdata
    data1 = wsMsg.data1
    data2 = wsMsg.data2
    data3 = wsMsg.data3
    store.SET_BO_MIDDLE_DATA_02_1([{ xdata, data1, data2, data3 }])
  }else if (store.BO_MIDDLE_DATA_02_1.length > 0) {
    xdata = store.BO_MIDDLE_DATA_02_1[0].xdata
    data1 = store.BO_MIDDLE_DATA_02_1[0].data1
    data2 = store.BO_MIDDLE_DATA_02_1[0].data2
    data3 = store.BO_MIDDLE_DATA_02_1[0].data3
  }

  return { xdata, data1, data2, data3 }
}

async function init201(wsMsg, dom) {
  var myChart = echarts.init(dom)
  const { xdata, data1, data2, data3 } = await getData201(wsMsg)

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
      data: ['成功笔数', '失败笔数', '成功趋势'],
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
        name: '(百万次)',
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
        name: '成功笔数',
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
        name: '失败笔数',
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
        name: '成功趋势',
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

const getData202 = async (wsMsg) => {
  let data = [
    {
      name: '成功',
      value: 18562,
    },
    {
      name: '失败',
      value: 4034,
    },
  ]
  if (wsMsg) {
    data[0].value = Number(wsMsg[0].value)
    data[1].value = Number(wsMsg[1].value)
    store.SET_BO_MIDDLE_DATA_02_2(data)
  }else if (store.BO_MIDDLE_DATA_02_2.length > 0) {
    data = store.BO_MIDDLE_DATA_02_2
  }
  return data
}

async function init202(wsMsg, dom) {
  var myChart = echarts.init(dom)
  const data = await getData202(wsMsg)

  let option
  let arrName = getArrayValue(data, 'name')
  let arrValue = getArrayValue(data, 'value')
  let sumValue = eval(arrValue.join('+'))
  let objData = array2obj(data, 'name')
  let optionData = getData(data)
  function getArrayValue(array, key) {
    var key = key || 'value'
    var res = []
    if (array) {
      array.forEach(function (t) {
        res.push(t[key])
      })
    }
    return res
  }

  function array2obj(array, key) {
    var resObj = {}
    for (var i = 0; i < array.length; i++) {
      resObj[array[i][key]] = array[i]
    }
    return resObj
  }

  function getData(data) {
    var res = {
      series: [],
      yAxis: [],
    }
    for (let i = 0; i < data.length; i++) {
      res.series.push({
        name: '交易占比',
        type: 'pie',
        clockwise: false, //顺时加载
        radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
        center: ['50%', '45%'],
        emphasis:{
          scale: false, //鼠标移入变大
        },
        label: {
          show: false,
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          borderWidth: 5,
        },
        data: [
          {
            value: data[i].value,
            name: data[i].name,
          },
          {
            value: sumValue - data[i].value,
            name: '',
            itemStyle: {
              color: 'rgba(0,0,0,0)',
              borderWidth: 0,
            },
            tooltip: {
              show: false,
            },
             emphasis: false,
          },
        ],
      })
      res.series.push({
        name: '',
        type: 'pie',
        silent: true,
        z: 1,
        clockwise: false, //顺时加载
        radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
        center: ['50%', '45%'],
        emphasis:{
          scale: false, //鼠标移入变大
        },
        label: {
          show: false,
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          borderWidth: 5,
        },
        data: [
          {
            value: 7.5,
            itemStyle: {
              color: '#E3F0FF',
              borderWidth: 0,
            },
            tooltip: {
              show: false,
            },
             emphasis: false,
          },
          {
            value: 2.5,
            name: '',
            itemStyle: {
              color: 'rgba(0,0,0,0)',
              borderWidth: 0,
            },
            tooltip: {
              show: false,
            },
             emphasis: false,
          },
        ],
      })
      res.yAxis.push(((data[i].value / sumValue) * 100).toFixed(0) + '%')
    }
    return res
  }

  option = {
    // backgroundColor: '#fff',
    legend: {
      show: true,
      // top: '80%',
      left: 'center',
      bottom: '5%',
      data: arrName,
      itemWidth: 10,
      itemHeight: 10,
      width: 20,
      padding: [0, 0],
      itemGap: 10,
      formatter: function (name) {
        return (
          '{title|' +
          name +
          '}  {' +
          `${name !== '成功' ? 'value2|' : 'value|'}` +
          ((objData[name].value / sumValue) * 100).toFixed(1) +
          '%}'
        )
      },
      textStyle: {
        rich: {
          title: {
            fontSize: 10,
            lineHeight: 10,
            color: '#CAD0DF',
          },
          value: {
            fontSize: 14,
            lineHeight: 18,
            color: '#009DFF',
          },
          value2: {
            fontSize: 14,
            lineHeight: 18,
            color: '#FF8700',
          },
        },
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{a}<br>{b}:{c}({d}%)',
    },
    color: ['#009DFF', '#FF8700', '#ffc300', '#00e473'],
    grid: {
      show: false,
      top: '15%',
      bottom: '68%',
      left: '-50%',
      containLabel: false,
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          inside: true,
          // textStyle: {
            color: '#CAD0DF',
            fontSize: 10,
          // },
          show: true,
        },
        data: optionData.yAxis,
      },
    ],
    xAxis: [
      {
        show: false,
      },
    ],
    series: optionData.series,
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
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '银行卡业务',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '银行卡业务',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '银行卡业务',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '银行卡业务',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
    {
      appName: '业务系统',
      userName: 'admin',
      errorInfo: '系统异常',
      time: '2021-04-01 10:00:00',
      errorSource: '业务系统',
    },
  ]
  let header = [
    // { name: '告警级别', param: 'alarmLevel', width: 10 },
    { name: '应用名称', param: 'appName' },
    { name: '用户名', param: 'userName' },
    { name: '错误信息', param: 'errorInfo' },
    { name: '时间', param: 'time' },
    { name: '错误来源', param: 'errorSource' },
  ]
  if (wsMsg) {
    data = wsMsg.data
    header = wsMsg.header
    store.SET_BO_MIDDLE_DATA_03([{data, header}])
  }else if (store.BO_MIDDLE_DATA_03.length > 0) {
    data = store.BO_MIDDLE_DATA_03[0].data
    header = store.BO_MIDDLE_DATA_03[0].header
  }

  return { data, header }
}
const init3 = (wsMsg) => {
  const { data, header } = getData3(wsMsg)
  return { data, header }
}
