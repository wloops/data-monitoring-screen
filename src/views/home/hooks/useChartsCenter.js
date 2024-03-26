import * as echarts from 'echarts'

export const useChartsCenter = () => {
  return {
    centerChart: {
      getData1,
      init1,
      getData2,
      init2,
      getData3,
      init3,
    },
  }
}

const getData1 = () => {
  const data = [
    {
      transDate: '2022-01-01',
      transSuccNum: 100,
      transFailNum: 40,
      transTotalNum: 140,
      succPercent: '71.43%',
    },
    {
      transDate: '2022-01-02',
      transSuccNum: 200,
      transFailNum: 50,
      transTotalNum: 250,
      succPercent: '79.92%',
    },
    {
      transDate: '2022-01-03',
      transSuccNum: 150,
      transFailNum: 10,
      transTotalNum: 160,
      succPercent: '93.75%',
    },
    {
      transDate: '2022-01-04',
      transSuccNum: 100,
      transFailNum: 20,
      transTotalNum: 120,
      succPercent: '83.33%',
    },
    {
      transDate: '2022-01-05',
      transSuccNum: 100,
      transFailNum: 30,
      transTotalNum: 130,
      succPercent: '76.92%',
    },
  ]

  return data
}
const init1 = (dom, wsMsg) => {
  const data = wsMsg ? wsMsg : getData1()
  // var data = this.queryTsscServiceTransInfoLastWeekJSON
  var myChart = echarts.init(dom)
  var option
  var xData = []
  var yData1 = []
  var yData2 = []
  var yData3 = []
  for (var i = 0; i < data.length; i++) {
    xData.push(data[i].transDate)
    yData1.push(data[i].transSuccNum)
    yData2.push(data[i].transFailNum)
    var succPercent = data[i].succPercent
    succPercent = succPercent.substring(0, succPercent.length - 1)
    yData3.push(succPercent)
  }
  // yData4 = [90, 56, 36, -6, -50, -70],
  let borderData = []
  let legend = ['成功笔数', '失败笔数', '成功趋势']
  let colorArr = [
    {
      start: 'rgba(155, 101, 229,',
      end: 'rgba(18, 58, 86,0.5)',
    },
    {
      start: 'rgba(255, 117, 14,',
      end: 'rgba(18, 58, 86,0.5)',
    },
    // {
    //   start: "rgba(82, 249, 107,",
    //   end: "rgba(18, 58, 86,0.5)"
    // },
    {
      color: '#00EAFF',
    },
  ]
  var normalColor = 'rgba(255,255,255,0.5)'
  //   var fontSize = 20;
  let seriesData = []
  var borderHeight = 4
  xData.forEach((element) => {
    borderData.push(borderHeight)
  })
  ;[yData1, yData2, yData3].forEach((item, index) => {
    var obj1 = {}
    var obj2 = {}
    if (index < 2) {
      obj1 = {
        name: legend[index],
        type: 'bar',
        stack: legend[index],
        data: item,
        barWidth: '15%',
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: colorArr[index].start + '0.7)',
                },
                {
                  offset: 0.5,
                  color: colorArr[index].start + '0.3)',
                },
                {
                  offset: 1,
                  color: colorArr[index].end,
                },
              ],
              globalCoord: false,
            },
          },
        },
      }
      obj2 = {
        name: '',
        type: 'bar',
        stack: legend[index],
        itemStyle: {
          normal: {
            color: colorArr[index].start + '1)',
          },
        },
        data: borderData,
      }
      seriesData.push(obj1)
      seriesData.push(obj2)
    } else {
      var obj3 = {
        name: legend[index],
        type: 'line',
        yAxisIndex: 1,
        smooth: false,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: {
          normal: {
            width: 2,
          },
        },
        itemStyle: {
          normal: {
            color: colorArr[index].color,
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
        data: item,
        label: {
          normal: {
            show: false,
          },
        },
      }
      seriesData.push(obj3)
    }
  })
  option = {
    // backgroundColor: "#000",
    grid: {
      left: '3%',
      top: '17%',
      right: '3%',
      bottom: '0%',
      containLabel: true,
    },
    legend: {
      show: true,
      icon: 'rect',
      itemWidth: 20,
      itemHeight: 3,
      right: '0%',
      top: '0%',
      textStyle: {
        color: '#fff',
      },
      data: legend,
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        var str = ''
        for (var i = 0; i < params.length; i++) {
          if (params[i].seriesName !== '') {
            str += params[i].name + ':' + params[i].seriesName + params[i].value + '<br/>'
          }
        }
        return str
      },
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: {
          textStyle: {
            color: normalColor,
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: normalColor,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '百万次',
        nameTextStyle: {
          color: normalColor,
          fontSize: 12,
        },
        // "min": 0,
        // "max": 50,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: normalColor,
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: normalColor,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
            color: normalColor,
          },
        },
      },
      {
        type: 'value',
        name: '%',
        nameTextStyle: {
          color: normalColor,
          fontSize: 12,
        },
        min: -100,
        max: 100,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: normalColor,
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: normalColor,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255,255,255,0.2)',
          },
        },
      },
    ],
    series: seriesData,
  }

  option && myChart.setOption(option)
  // 图表自适应宽度
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

const getData2 = () => {
  const transSuccNum = 100 // 成功交易数量
  const transFailNum = 50 // 失败交易数量
  return { transSuccNum, transFailNum }
}
const init2 = (dom, wsMsg) => {
  const { transSuccNum, transFailNum } = wsMsg ? wsMsg : getData2()
  var myChart = echarts.init(dom)
  var option

  let data = [
    {
      name: '成功',
      value: transSuccNum,
    },
    {
      name: '失败',
      value: transFailNum,
    },
  ]
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
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
        center: ['50%', '35%'],
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
            hoverAnimation: false,
          },
        ],
      })
      res.series.push({
        name: '',
        type: 'pie',
        silent: true,
        z: 1,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
        center: ['50%', '25%'],
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
              color: 'rgba(0,0,0,0)',
              borderWidth: 0,
            },
            tooltip: {
              show: false,
            },
            hoverAnimation: false,
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
            hoverAnimation: false,
          },
        ],
      })
      res.yAxis.push(((data[i].value / sumValue) * 100).toFixed(2) + '%')
    }
    return res
  }

  option = {
    // backgroundColor: '#fff',
    legend: {
      orient: 'horizontal',
      show: true,
      // top: "center",
      // left: '70%',
      bottom: 0,
      data: arrName,
      // itemWidth: 30,
      // itemHeight: 20,
      // width: 50,
      padding: [0, 15],
      // itemGap: 25,
      formatter: function (name) {
        // return "{title|" + name + "}\n{value|" + (objData[name].value) + "人}" data[i].value / sumValue * 100).toFixed(2)
        return (
          '{title|' +
          name +
          '}\n{value|' +
          ((objData[name].value / sumValue) * 100).toFixed(2) +
          '%}'
        )
      },
      textStyle: {
        rich: {
          title: {
            fontSize: 10,
            lineHeight: 10,
            color: '#ffffff',
          },
          value: {
            fontSize: 14,
            lineHeight: 18,
            color: '#ffffff',
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
      top: '2000%',
      bottom: '48%',
      left: '30%',
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
          textStyle: {
            color: '#000',
            fontSize: 10,
          },
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

const getData3 = () => {
  const data = [
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易统计',
      msgGenRuleID: '服务最慢响应太慢',
      alarmLevel: '1',
      passwordWrongTimes: '1',
      inputDate: '20230705',
      inputTime: '145441',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易统计',
      msgGenRuleID: '服务平均响应太慢',
      alarmLevel: '1',
      passwordWrongTimes: '1',
      inputDate: '20230625',
      inputTime: '163448',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易总量统计',
      msgGenRuleID: '服务平均响应太慢',
      alarmLevel: '1',
      passwordWrongTimes: '1',
      inputDate: '20230625',
      inputTime: '163448',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '伺服的应用',
      resName: '交易总量统计',
      msgGenRuleID: '交易失败笔数太多',
      alarmLevel: '1',
      passwordWrongTimes: '3',
      inputDate: '20230620',
      inputTime: '155715',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '伺服的应用',
      resName: '交易总量统计',
      msgGenRuleID: '服务平均响应太慢',
      alarmLevel: '1',
      passwordWrongTimes: '3',
      inputDate: '20230601',
      inputTime: '175028',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易统计',
      msgGenRuleID: '交易失败笔数太多',
      alarmLevel: '1',
      passwordWrongTimes: '1',
      inputDate: '20230529',
      inputTime: '111142',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易总量统计',
      msgGenRuleID: '交易失败笔数太多',
      alarmLevel: '1',
      passwordWrongTimes: '4',
      inputDate: '20230529',
      inputTime: '111142',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易统计',
      msgGenRuleID: '服务最慢响应太慢',
      alarmLevel: '1',
      passwordWrongTimes: '1',
      inputDate: '20230705',
      inputTime: '145441',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易统计',
      msgGenRuleID: '服务平均响应太慢',
      alarmLevel: '1',
      passwordWrongTimes: '1',
      inputDate: '20230625',
      inputTime: '163448',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易总量统计',
      msgGenRuleID: '服务平均响应太慢',
      alarmLevel: '1',
      passwordWrongTimes: '1',
      inputDate: '20230625',
      inputTime: '163448',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '伺服的应用',
      resName: '交易总量统计',
      msgGenRuleID: '交易失败笔数太多',
      alarmLevel: '1',
      passwordWrongTimes: '3',
      inputDate: '20230620',
      inputTime: '155715',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '伺服的应用',
      resName: '交易总量统计',
      msgGenRuleID: '服务平均响应太慢',
      alarmLevel: '1',
      passwordWrongTimes: '3',
      inputDate: '20230601',
      inputTime: '175028',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易统计',
      msgGenRuleID: '交易失败笔数太多',
      alarmLevel: '1',
      passwordWrongTimes: '1',
      inputDate: '20230529',
      inputTime: '111142',
    },
    {
      srlID: 'Splenwise密码服务中间件',
      arrIndex: 'TSSC-02',
      compName: '江南天安密码服务接口',
      resName: '交易总量统计',
      msgGenRuleID: '交易失败笔数太多',
      alarmLevel: '1',
      passwordWrongTimes: '4',
      inputDate: '20230529',
      inputTime: '111142',
    },
  ]

  return data
}
const init3 = (dom, wsMsg) => {
  const data = wsMsg ? wsMsg : getData3()
  return data
}
