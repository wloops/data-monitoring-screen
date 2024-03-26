<script setup>
const columns = [
  {
    title: '应用名称',
    key: 'compName',
  },
  {
    title: '操作',
    key: 'resName',
  },
  {
    title: '错误信息',
    key: 'msgGenRuleID',
  },
  {
    title: '时间',
    key: 'inputDate',
  },
  {
    title: '错误来源',
    key: 'arrIndex',
  },
]
const businessErrList = [
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

const pagination = false
</script>

<template>
  <div>
    <!-- <div class="tableBox">
      <table class="table7_12">
        <thead>
          <tr>
            <th>应用名称</th>
            <th>操作</th>
            <th>错误信息</th>
            <th>时间</th>
            <th>错误来源</th>
          </tr>
        </thead>
        <tr v-for="item in businessErrList">
          <td>{{ item.compName }}</td>
          <td>{{ item.resName }}</td>
          <td>{{ item.msgGenRuleID }}</td>
          <td>{{ item.inputDate }} {{ item.inputTime }}</td>
          <td>{{ item.srlID }} --{{ item.arrIndex }}</td>
        </tr>
      </table>
    </div> -->
    <n-data-table
      :columns="columns"
      :data="businessErrList"
      :pagination="pagination"
      :bordered="false"
    />
  </div>
</template>

<style scoped>
.tableBox {
  width: 100%;
  height: 32vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.table7_12 {
  width: 97%;
  height: 90%;
  margin: 1rem 1rem;
  color: #ffffff;
}
.table7_12 table {
  width: 100%;
  margin: 15px 0;
  border: 0;
}
.table7_12 th {
  background-color: #96a5ff;
  color: #ffffff;
}
.table7_12,
.table7_12 th,
.table7_12 td {
  font-size: 12px;
  text-align: center;
  padding: 4px;
  border-collapse: collapse;
}
.table7_12 th,
.table7_12 td {
  border: 1px solid #7387fe;
  border-width: 1px 0 1px 0;
  border: 5px outset #585a7938;
}
.table7_12 tr {
  border: 1px solid #ffffff;
}
.table7_12 tr:nth-child(odd) {
  background-color: #00174485;
}
.table7_12 tr:nth-child(even) {
  background-color: #00174485;
}
</style>
