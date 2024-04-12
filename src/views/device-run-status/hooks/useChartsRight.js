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
    },
  }
}

async function getData1(wsMsg) {
  const data = [
    {
      id: 1,
      name: '签名服务器',
      percent: 80,
    },
    {
      id: 2,
      name: '金融加密机',
      percent: 60.3,
    },
    {
      id: 3,
      name: '时间戳服务器',
      percent: 50,
    },
    {
      id: 4,
      name: '证书认证系统',
      percent: 10,
    },
    {
      id: 5,
      name: '动态口令服务器',
      percent: 20,
    },
  ]
  return data
}
async function init1(wsMsg) {
  const data = wsMsg ? wsMsg : await getData1()

  return data
}

async function getData2(wsMsg) {
  const data = [
    {
      id: 1,
      name: '签名服务器',
      percent: 76.6,
    },
    {
      id: 3,
      name: '时间戳服务器',
      percent: 10,
    },
    {
      id: 2,
      name: '金融加密机',
      percent: 60.3,
    },
    {
      id: 4,
      name: '证书认证系统',
      percent: 50,
    },
    {
      id: 5,
      name: '动态口令服务器',
      percent: 30,
    },
  ]
  return data
}
async function init2(wsMsg) {
  const data = wsMsg ? wsMsg : await getData2()

  return data
}

async function getData3(wsMsg) {
  const data = [
    {
      id: 2,
      name: '金融加密机',
      percent: 90.3,
    },
    {
      id: 4,
      name: '证书认证系统',
      percent: 40,
    },
    {
      id: 3,
      name: '时间戳服务器',
      percent: 60,
    },
    {
      id: 5,
      name: '动态口令服务器',
      percent: 20,
    },
    {
      id: 1,
      name: '签名服务器',
      percent: 43,
    },
  ]
  return data
}
async function init3(wsMsg) {
  const data = wsMsg ? wsMsg : await getData3()

  return data
}
