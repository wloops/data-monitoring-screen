<template>
  <div w-full h-full>
    <!--    <ul>-->
    <!--      <li v-for="(item, index) in msgList" :key="item.id">-->
    <!--        <p>-->
    <!--          <span>{{ item.user }}</span>-->
    <!--          <span>{{ new Date(item.dateTime) }}</span>-->
    <!--        </p>-->
    <!--        <p>消息：{{ item.msg }}</p>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--    <input type="text" placeholder="请输入消息" v-model="msg" />-->
    <!--    <button @click="sendMsg">发送消息</button>-->

    <div w-full h-full>
      <iframe
        ref="iframeContainer"
        :src="iframeSrc"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
//  进入事件
window.onload = function () {
  onloadIfram()
}
// 刷新ifram
function onloadIfram() {
  document.getElementById('#iframeContainer').contentWindow.location.reload()
}
import { onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useWebSocket } from '@/hooks'
export default {
  name: 'Home',
  setup() {
    // 父页面传递数据给子页面：--start
    const iframeSrc = ref('http://localhost:3100/')
    const iframeContainer = ref(null)
    let will_send_data = {}
    const sendMessageToIframe = () => {
      const iframe = iframeContainer.value

      // 要发送的数据
      will_send_data = {
        // 默认打开哪个tab,指定该值后会自动打开对应的tab,关闭切换其他tab的功能, 可选值 [BusinessOperation|DeviceStatus|DeviceRunStatus]
        defaultTabKey: 'BusinessOperation',
        // 更新时间戳
        updateTime: new Date().getTime(),
        upDate: [
          {
            moduleName: '今日交易笔数', // 模块名称
            moduleId: 'BO_MIDDLE_01', // 模块id  [BO|DS|DRS][LEFT|MIDDLE|RIGHT][01-09]
            data: [
              {
                total: 47569,
                offline: 152,
              },
            ], // 具体数据 ,参考数据结构,以及数据量限制
            dataVolumeLimit: 1, // 数据量限制 1 为一条数据, 2 为两条数据, 以此类推 -1 为无限制
          },
          {
            moduleName: '实时总交易趋势', // 模块名称
            moduleId: 'BO_LEFT_01', // 模块id  [BO|DS|DRS][LEFT|MIDDLE|RIGHT][01-09]
            data: [
              {
                label: ['07:30', '08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30'],
                value: ['1233', 2333, 2040, 1850, 1939, 2343, 210, 1850],
              },
            ], // 具体数据 ,参考数据结构,以及数据量限制
            dataVolumeLimit: 1, // 数据量限制 1 为一条数据, 2 为两条数据, 以此类推 -1 为无限制
          },
          {
            moduleName: '今日业务TOP5', // 模块名称
            moduleId: 'BO_LEFT_02', // 模块id  [BO|DS|DRS][LEFT|MIDDLE|RIGHT][01-09]
            data: [
              {
                name: '签名服务器',
                number: 402,
              },
              {
                name: '时间戳服务器',
                number: 503,
              },
              {
                name: '金融加密机',
                number: 460,
              },
              {
                name: '证书认证系统',
                number: 350,
              },
              {
                name: '动态口令服务器',
                number: 89,
              },
            ], // 具体数据 ,参考数据结构,以及数据量限制
            dataVolumeLimit: 5, // 数据量限制 1 为一条数据, 2 为两条数据, 以此类推 -1 为无限制
          },
          {
            moduleName: '今日交易统计', // 模块名称
            moduleId: 'BO_LEFT_03', // 模块id  [BO|DS|DRS][LEFT|MIDDLE|RIGHT][01-09]
            data: [
              {
                xdata: ['网上银行', '手机银行', '电话银行', '自助银行', 'POS', '银行卡业务'],
                data1: [16, 28, 35, 44, 55, 36],
                data2: [42, 32, 15, 46, 55, 74],
              },
            ], // 具体数据 ,参考数据结构,以及数据量限制
            dataVolumeLimit: 1, // 数据量限制 1 为一条数据, 2 为两条数据, 以此类推 -1 为无限制
          },
          {
            moduleName: '交易详情', // 模块名称
            moduleId: 'BO_MIDDLE_02_1', // 模块id  [BO|DS|DRS][LEFT|MIDDLE|RIGHT][01-09]
            data: [
              {
                xdata: ['05/01', '05/02', '05/03', '05/04', '05/05', '05/06', '05/07', '05/08'],
                data1: [6, 8, 5, 4, 5, 6, 7, 6],
                data2: [4, 2, 5, 6, 5, 4, 3, 4],
                data3: [60, 80, 50, 40, 50, 60, 70, 60],
              },
            ], // 具体数据 ,参考数据结构,以及数据量限制
            dataVolumeLimit: 1, // 数据量限制 1 为一条数据, 2 为两条数据, 以此类推 -1 为无限制
          },
          {
            moduleName: '交易占比', // 模块名称
            moduleId: 'BO_MIDDLE_02_2', // 模块id  [BO|DS|DRS][LEFT|MIDDLE|RIGHT][01-09]
            data: [
              {
                name: '成功',
                value: 88562,
              },
              {
                name: '失败',
                value: 20324,
              },
            ], // 具体数据 ,参考数据结构,以及数据量限制
            dataVolumeLimit: 2, // 数据量限制 1 为一条数据, 2 为两条数据, 以此类推 -1 为无限制
          },
          // {
          //   moduleName: '业务错误信息', // 模块名称
          //   moduleId: 'BO_MIDDLE_03', // 模块id  [BO|DS|DRS][LEFT|MIDDLE|RIGHT][01-09]
          //   data: [], // 具体数据 ,参考数据结构,以及数据量限制
          //   dataVolumeLimit: 2, // 数据量限制 1 为一条数据, 2 为两条数据, 以此类推 -1 为无限制
          // },
        ],
      }
      // 使用 postMessage 发送数据给 iframe
      iframe.contentWindow.postMessage(JSON.stringify(will_send_data), '*')
      window.parentData = will_send_data
    }
    // const doAction = () => {
    //   console.log('父页面的事件')
    //   let send = document.getElementById('iframeContainer').contentWindow
    //   send.postMessage('我是父页面发的数据', '*')
    // }
    // 父页面传递数据给子页面：--end
    onMounted(() => {
      sendMessageToIframe()
      setTimeout(() => {
        will_send_data.updateTime = new Date().getTime()
        will_send_data.upDate[0].data[0].total = 500000
        window.parentData = will_send_data
        console.log('刷新数据', window.parentData)
      }, 5000)
    })

    const router = useRouter()
    const ws = useWebSocket(handleMessage)
    const state = reactive({
      msg: '',
      msgList: [],
    })

    let username = ''

    const sendMsg = () => {
      const _msg = state.msg

      if (!_msg.trim().length) {
        return
      }

      // state.msgList.push()

      ws.send(
        JSON.stringify({
          id: new Date().getTime(),
          user: username,
          dateTime: new Date().getTime(),
          // msg: state.msg,
          msg: {
            spiedResType: '交易占比',
            transFailNum: 10,
            transSuccNum: 90,
          },
        })
      )

      state.msg = ''
    }

    function handleMessage(e) {
      const _msgData = JSON.parse(e.data)
      state.msgList.push(_msgData)
    }

    return {
      ...toRefs(state),
      sendMsg,
      iframeSrc,
      iframeContainer,
    }
  },
}
</script>

<style lang="scss" scoped></style>
