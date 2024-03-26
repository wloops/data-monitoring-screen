<script setup>
const tbData = [
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
const afterData = ref([])
afterData.value = tbData.forEach((item) => {
  let row = []
  row.push(item.compName)
  row.push(item.resName)
  row.push(item.msgGenRuleID)
  row.push(`${item.inputDate}-${item.inputTime}`)
  row.push(`${item.srlID}-${item.arrIndex}`)

  afterData.push(row)
})

const tbName = ref(['应用名称', '操作', '错误信息', '时间', '错误来源'])

const config = {
  header: tbName.value,
  data: afterData.value,
  index: true,
  columnWidth: [50],
  align: ['center'],
}
</script>

<template>
  <div>
    <dv-scroll-board :config="config" />
  </div>
</template>

<style scoped></style>
