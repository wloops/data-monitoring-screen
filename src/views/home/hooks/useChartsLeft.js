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

// 1
async function getData1(wsMsg) {
  let data = [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
  let ydata = [
    '1月18日 14:00',
    '1月18日 15:00',
    '1月18日 16:00',
    '1月18日 17:00',
    '1月18日 18:00',
    '1月18日 19:00',
    '1月18日 20:00',
  ]
  if (wsMsg && wsMsg.length > 0) {
    data = wsMsg.map((v) => v.transTime.slice(0, -2).replace(/(?=(\B)(\d{2})+$)/g, ':'))
    ydata = wsMsg.map((v) => v.totalTransNums)

    return {
      data,
      ydata,
    }
  } else {
    // 请求接口
    let apiData = {
      resId: 625,
      operationID: 118,
      mouldID: '交易趋势',
      itemname: '业务系统服务流水',
    }
    const res = await api.largeScreen(apiData)
    console.log('getData1', res)
    // const { data, ydata } = res
    data = res.map((v) => v.totalTransNums)
    ydata = res.map((v) => v.transTime.slice(0, -2).replace(/(?=(\B)(\d{2})+$)/g, ':'))
    return {
      data,
      ydata,
    }
  }
}
async function init1(dom, wsMsg) {
  const { data, ydata } = wsMsg ? wsMsg : await getData1(wsMsg)

  // var yearData = [
  //   {
  //     year: '2020', // 年份
  //     data: [
  //       // 两个数组是因为有两条线
  //       [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
  //       // [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
  //     ],
  //   },
  //   {
  //     year: '2021', // 年份
  //     data: [
  //       // 两个数组是因为有两条线
  //       [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
  //       [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
  //     ],
  //   },
  // ]
  // 1. 实例化对象
  var myChart = echarts.init(dom)
  // 2.指定配置
  var option = {
    // 通过这个color修改两条线的颜色
    color: ['#00f2f1', '#ed3f35'],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // 如果series 对象有name 值，则 legend可以不用写data
      // 修改图例组件 文字颜色
      textStyle: {
        color: '#4c9bfd',
      },
      // 这个10% 必须加引号
      right: '10%',
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true, // 显示边框
      borderColor: '#012f4a', // 边框颜色
      containLabel: true, // 包含刻度文字在内
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ydata,
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        color: '#4c9bfd', // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        color: '#4c9bfd', // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a', // 分割线颜色
        },
      },
    },
    series: [
      {
        name: '笔数',
        type: 'line',
        // true 可以让我们的折线显示带有弧度
        smooth: true,
        data: data,
        // data: yearData[0].data[0],
      },
      // {
      //   name: '新增游客',
      //   type: 'line',
      //   smooth: true,
      //   data: yearData[0].data[1],
      // },
    ],
  }

  // 3. 把配置给实例对象
  myChart.setOption(option)
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

// 2
async function getData2(wsMsg) {
  let data = [81, 49, 39, 30, 29, 39]
  let ydata = ['NONE', 'NONENONE', 'NONENONNE', 'NONENONE', 'NONE']

  if (wsMsg && wsMsg.length > 0) {
    data = wsMsg[0]
    ydata = data.sort((a, b) => b.succNums - a.succNums)
    return {
      data,
      ydata,
    }
  } else {
    // 模拟从异步接口中获取数据
    let apiData = {
      resId: 625,
      operationID: 118,
      mouldID: '交易排名（按业务排名）',
      itemname: '交易服务流水',
    }
    const res = await api.largeScreen(apiData)
    console.log('应用访问 TOP res', res)
    ydata = res.map((item) => item.appName)
    data = res.map((item) => Number(item.succNums) - Number(item.succNums))
    console.log('data', data, ydata)
    return {
      data,
      ydata,
    }
  }
}
async function init2(dom, wsMsg) {
  var myChart = echarts.init(dom)
  var option2
  const { data, ydata } = wsMsg ? wsMsg : await getData2(wsMsg)

  var colors = ['#2f89cf', '#38f395', '#fff']

  option2 = {
    // backgroundColor: "#0f375f",
    grid: {
      left: '0%',
      top: '30px',
      right: '5%',
      bottom: '0%',
      containLabel: true,
    },
    barWidth: 45,
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.2)',
          type: 'dashed',
        },
      },
      axisTick: {
        show: false,
      },

      axisLabel: {
        //  改变x轴字体颜色和大小
        textStyle: {
          color: 'rgba(250,250,250,0.6)',
          fontSize: 16,
        },
      },
    },
    yAxis: {
      type: 'category',
      data: ydata,
      inverse: true,
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        //  改变y轴颜色
        lineStyle: {
          color: '#2c4054',
        },
      },
      axisLabel: {
        //  改变y轴字体颜色和大小
        //formatter: '{value} m³ ', //  给y轴添加单位
        textStyle: {
          color: 'rgba(250,250,250,0.6)',
          fontSize: 12,
        },
      },
    },
    series: [
      {
        type: 'bar',
        name: '产出',
        barWidth: 15,
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'insideRight', //在上方显示
              textStyle: {
                //数值样式
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 300,
              },
            },
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: 'rgba(24,144,255,1)',
              },
              {
                offset: 1,
                color: 'rgba(24,144,255,0)',
              },
            ]),
            barBorderRadius: 15,
          },
        },
        data,
      },
    ],
  }

  option2 && myChart.setOption(option2)
  // 图表自适应宽度
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}
// 3
async function getData3(wsMsg) {
  // 请求接口
  // const json = [
  //   { serviceAlias: '1', transTotalNum: 100 },
  //   { serviceAlias: '2', transTotalNum: 200 },
  //   { serviceAlias: '3', transTotalNum: 300 },
  //   { serviceAlias: '4', transTotalNum: 400 },
  //   { serviceAlias: '5', transTotalNum: 500 },
  // ]
  const data = ['加密数据', '解密数据', '完整性校验', '签名', '验签']
  let apiData = {
    resId: 625,
    operationID: 118,
    mouldID: '算法调用top',
    itemname: '业务系统服务流水',
  }
  const res = await api.largeScreen(apiData)
  console.log('算法调用 TOP res', res)
  const json = res.map((item, index) => {
    return {
      serviceAlias: data[index],
      transTotalNum: Number(item.num),
    }
  })
  console.log('算法调用 TOP json', json)
  return {
    json,
  }
}
async function init3(dom, wsMsg) {
  const { json } = wsMsg ? wsMsg : await getData3(wsMsg)

  // var json = this.queryTsscServiceTransInfoTopFive
  var data = []
  var numLeg = []
  for (var i = 0; i < json.length; i++) {
    data.push(json[i].serviceAlias)
    numLeg.push(json[i].transTotalNum)
  }
  var myChart = echarts.init(dom)
  var option
  option = {
    // backgroundColor: '#00265f',
    // title: {
    //   text: '政策补贴额度',
    //   x: 'center',
    //   y: '4%',
    //   textStyle: {
    //     color: '#fff',
    //     fontSize: '22',
    //   },
    //   subtextStyle: {
    //     color: '#90979c',
    //     fontSize: '16',
    //   },
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: '15%',
      right: '3%',
      left: '10%',
      bottom: '12%',
    },
    legend: {
      //图例组件，颜色和名字
      right: '30%',
      top: '30%',
      itemGap: 16,
      itemWidth: 18,
      itemHeight: 10,
      data: [
        {
          name: '笔数',
          //icon:'image://../wwwroot/js/url2.png', //路径
        },
      ],
      textStyle: {
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: '微软雅黑',
        fontSize: 12,
      },
    },
    xAxis: [
      {
        type: 'category',
        data: data,
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.12)',
          },
        },
        axisLabel: {
          margin: 10,
          color: '#e2e9ff',
          textStyle: {
            fontSize: 12,
          },
        },
      },
    ],
    yAxis: [
      {
        name: '单位：笔',
        nameTextStyle: {
          fontSize: 14,
          padding: [0, 0],
        },
        axisLabel: {
          margin: 5,
          formatter: '{value}',
          color: '#e2e9ff',
          textStyle: {
            fontSize: 10,
          },
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
        axisTick: { show: false },
      },
    ],
    series: [
      {
        type: 'bar',
        data: numLeg,
        barWidth: '15px',
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
                  color: 'rgba(0,244,255,1)', // 0% 处的颜色
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
            shadowBlur: 4,
          },
        },
        label: {
          normal: {
            show: false,
            lineHeight: 30,
            width: 80,
            height: 30,
            backgroundColor: 'rgba(0,160,221,0.1)',
            borderRadius: 200,
            position: ['-8', '-60'],
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
                height: 30,
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
