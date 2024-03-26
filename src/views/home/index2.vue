<script setup>
const newTime = ref('')
const seriesData = ref([])
const transTotalNum = ref(0)
const transSuccNum = ref(0)
const transFailNum = ref(0)
const hoursData = ref('')
const queryAppTransPerData = ref('')
const queryAppAvgTimeCurMinuteData = ref('')
const queryTsscServiceTransInfoTopFive = ref('')
const queryTsscServiceTransInfoLastWeekJSON = ref('')
const businessErrList = ref([])
const deviceStatusList = ref([])

window.addEventListener('DOMContentLoaded', function () {
  // 添加消息事件监听器
  window.addEventListener('message', function (event) {
    // 处理收到的消息
    console.log('Received message:', event.data)
  })
})
</script>

<template>
  <div>
    <div id="dataScreenApp">
      <div class="container" style="position: relative">
        <div id="clock">{{ newTime }}</div>
        <div id="fullScreen">
          <n-button type="text" icon="el-icon-full-screen" @click="openFullScreen">
            大屏展示
          </n-button>
        </div>
        <div class="mainTop">
          <div class="title">综合安全态势平台</div>
        </div>
        <main>
          <div class="mainLeft">
            <div class="box boxLeft1">
              <div class="box-title">
                <span class="text">服务趋势</span>
                <span>
                  <dv-decoration-6 style="width: 100px; height: 20px" />
                </span>
              </div>
              <div class="chartsBox">
                <div id="leftChart1" style="width: 90%; height: 75%"></div>
              </div>
            </div>
            <div class="box boxLeft2">
              <div class="box-title">
                <span class="text">应用访问TOP</span>
                <span>
                  <dv-decoration-6 style="width: 100px; height: 20px" />
                </span>
              </div>
              <div class="chartsBox">
                <div id="leftChart2" style="width: 100%; height: 100%"></div>
              </div>
            </div>
            <div class="box boxLeft3">
              <div class="box-title">
                <span class="text">算法调用TOP</span>
                <span>
                  <dv-decoration-6 style="width: 100px; height: 20px" />
                </span>
              </div>
              <div class="chartsBox">
                <div id="leftChart3" style="width: 100%; height: 80%"></div>
              </div>
            </div>
          </div>
          <div class="mainCenter">
            <div class="centerTop">
              <div class="count">
                <img src="./img/服务笔数.png" alt="" />
                <div class="text">
                  <p>服务笔数</p>
                  <p style="color: #009cff; font-size: 30px">{{ transTotalNum }}</p>
                </div>
              </div>
              <div class="count">
                <img src="./img/成功笔数.png" alt="" />
                <div class="text">
                  <p>成功笔数</p>
                  <p style="color: chartreuse; font-size: 30px">{{ transSuccNum }}</p>
                </div>
              </div>
              <div class="count">
                <img src="./img/失败笔数.png" alt="" />
                <div class="text">
                  <p>失败笔数</p>
                  <p style="color: #ff0000; font-size: 30px">{{ transFailNum }}</p>
                </div>
              </div>
            </div>
            <div id="centerMap">
              <div style="display: flex; justify-content: space-around">
                <div class="transactionDetails">
                  <div class="centerTitle">交易详情</div>
                  <div
                    id="centerChart1"
                    style="width: 100%; height: 80%; padding: 0px 1.5rem"
                  ></div>
                </div>
                <div class="transactionShare">
                  <div class="centerTitle">交易占比</div>
                  <div id="centerChart2" style="width: 90%; height: 75%"></div>
                </div>
              </div>
              <div class="businessErrorMessages">
                <div class="centerTitle">业务错误信息</div>
                <div id="centerChart3" style="width: 100%; height: 100%">
                  <div class="tableBox">
                    <table class="table7_12">
                      <!-- <thead style="position: sticky; top: 0;"> -->
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
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="centerButtom">
              <div class="alarm">
                <div class="alarmBg1"></div>
                <div class="text" style="color: #349be9">
                  <p>正常</p>
                  <p>250</p>
                </div>
              </div>
              <div class="alarm">
                <div class="alarmBg2"></div>
                <div class="text" style="color: #f2b73f">
                  <p>一般警告</p>
                  <p>250</p>
                </div>
              </div>
              <div class="alarm">
                <div class="alarmBg3"></div>
                <div class="text" style="color: #ff0000">
                  <p>严重警告</p>
                  <p>250</p>
                </div>
              </div>
            </div> -->
          </div>
          <div class="mainRight">
            <div class="box boxRight1">
              <div class="box-title">
                <span class="text">业务健康信息</span>
                <span>
                  <dv-decoration-6 style="width: 100px; height: 20px" />
                </span>
              </div>
              <div class="chartsBox">
                <div id="rightChart1" style="width: 85%; height: 100%"></div>
              </div>
            </div>
            <div class="box boxRight2">
              <div class="box-title">
                <span class="text">业务平均响应时间</span>
                <span>
                  <dv-decoration-6 style="width: 100px; height: 20px" />
                </span>
              </div>
              <!-- <div class="chartsBox">
                <div id="rightChart2" style="width: 85%; height: 100%; margin-top: -2rem"></div>
              </div> -->
              <div class="responseTime">
                <!-- <div class="responseTimeTitle">
                  <span style="margin-right: 5px">
                    <span class="end"></span>
                    已安装/已连接
                  </span>
                  <span>
                    <span class="not"></span>
                    未安装/未连接
                  </span>
                </div> -->
                <div class="responseTimeAll">
                  <div v-for="item in queryAppAvgTimeCurMinuteData">
                    <div
                      :class="['responseTimeBox', item.status === '1' ? 'responseTimeBox2' : '']"
                    >
                      <span class="picon" v-if="item.status !== '1'"></span>
                      <p>{{ item.appName }}</p>
                      <p>
                        <span class="responseTimeNum">{{ item.avaUsedTime }}</span>
                        <span class="responseTimeMs">ms</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div class="box boxRight3">
              <div class="box-title">
                <span class="text">总体资源指标</span>
                <span>
                  <dv-decoration-6 style="width: 100px; height: 20px" />
                </span>
              </div>
              <div class="chartsBox chartsBoxRight3">
                <div id="rightChart3" style="width: 100%; height: 100%"></div>
                <div class="legendText">
                  <span v-for="item in seriesData">{{ item.value }}</span>
                </div>
              </div>
            </div>
            <div class="box boxRight4">
              <div class="box-title">
                <span class="text">设备状态</span>
                <span>
                  <dv-decoration-6 style="width: 100px; height: 20px" />
                </span>
              </div>
              <div class="statusBoxAll">
                <div class="statusBox" v-for="(item, index, i) in deviceStatusList">
                  <!-- 正常状态 -->
                  <div class="img1" v-if="item.status == '启用'"></div>
                  <div class="img4" v-if="item.status == '设计'"></div>
                  <div class=""></div>
                  <div class="facilityName">{{ item.arrName }}</div>
                </div>
              </div>
              <!-- <div class="chartsBox">
                <div id="rightChart4" style="width: 85%; height: 100%"></div>
              </div> -->
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 100% !important;
}
/* * {
  margin: 0;
  padding: 0;
} */
/* // 滚动条的宽度 */
#dataScreenApp .statusBoxAll::-webkit-scrollbar {
  /* // 横向滚动条 */
  width: 8px;
  /* // 纵向滚动条 必写 */
  height: 10px;
}
#dataScreenApp .statusBoxAll::-webkit-scrollbar-track-piece {
  /* //滚动条凹槽的颜色，还可以设置边框属性 */
  background-color: transparent;
}
/* // 滚动条的滑块 */
#dataScreenApp .statusBoxAll::-webkit-scrollbar-thumb {
  background-color: #2e3664;
  /* //滚动条的设置 */
  /* // background-color: #c1c1c1; */
  background-clip: padding-box;
  border-radius: 3px;
}
#dataScreenApp .statusBoxAll::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
/* // 滚动条的宽度 */
#dataScreenApp .tableBox::-webkit-scrollbar {
  /* // 横向滚动条 */
  width: 8px;
  /* // 纵向滚动条 必写 */
  height: 10px;
}
#dataScreenApp .tableBox::-webkit-scrollbar-track-piece {
  /* //滚动条凹槽的颜色，还可以设置边框属性 */
  background-color: transparent;
}
/* // 滚动条的滑块 */
#dataScreenApp .tableBox::-webkit-scrollbar-thumb {
  background-color: #2e3664;
  /* //滚动条的设置 */
  /* // background-color: #c1c1c1; */
  background-clip: padding-box;
  border-radius: 3px;
}
#dataScreenApp .tableBox::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
#dataScreenApp {
  height: 100%;
  overflow-y: auto;
  background: url(./img/bg.png) no-repeat 50%;
  /* background-size: 90%; */
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
}
#dataScreenApp .mainTop {
  width: 100%;
  height: 10vh;
  transform: scale(1);
  background: url(./img/top.png) no-repeat 50%;
  background-size: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#dataScreenApp .mainTop .title {
  color: white;
  font-size: x-large;
  font-weight: 600;
  margin-top: -1rem;
}
#dataScreenApp main {
  display: flex;
  justify-content: center;
  align-items: center;
}
#dataScreenApp main .mainLeft,
#dataScreenApp .mainRight {
  width: 25%;
  height: 100%;
  margin-left: 1rem;
}
#dataScreenApp main .mainCenter {
  width: 47%;
  height: 100%;
}
#dataScreenApp main .mainLeft .box {
  width: 100%;
  height: 29vh;
  margin-bottom: 0.5rem;
  background-size: cover;
  background-position: center 0;
}
#dataScreenApp .mainLeft .boxLeft1 {
  background: url(./img/border2.png) no-repeat 50%;
}
#dataScreenApp .mainLeft .boxLeft2 {
  background: url(./img/border2.png) no-repeat 50%;
}
#dataScreenApp .mainLeft .boxLeft3 {
  background: url(./img/border2.png) no-repeat 50%;
}
#dataScreenApp main .mainRight {
  margin-right: 1rem;
}
#dataScreenApp main .mainRight .box {
  width: 100%;
  height: 22vh;
  margin-bottom: 0.5rem;
  background-size: cover;
  background-position: center 0;
}
#dataScreenApp .mainRight .boxRight1 {
  background: url(./img/border2.png) no-repeat 50%;
}
#dataScreenApp .mainRight .boxRight2 {
  background: url(./img/border2.png) no-repeat 50%;
}
#dataScreenApp .mainRight .boxRight3 {
  background: url(./img/border2.png) no-repeat 50%;
}
#dataScreenApp .mainRight .boxRight4 {
  background: url(./img/border2.png) no-repeat 50%;
}
#dataScreenApp .chartsBoxRight3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#dataScreenApp .chartsBoxRight3 .legendText {
  width: 5%;
  height: 100%;
  color: white;
  font-size: 14px;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#dataScreenApp .chartsBoxRight3 .legendText span {
  margin-top: 2px;
  margin-bottom: 6px;
}
#dataScreenApp .box .box-title {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#dataScreenApp .box .box-title span {
  padding-top: 1rem;
}
#dataScreenApp .box .box-title .text {
  color: white;
  padding: 1rem 0 0;
  font-size: larger;
  font-weight: 700;
  display: flex;
  align-items: center;
}
#dataScreenApp .box .box-title .text:before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 30px;
  margin-right: 10px;
  border-radius: 1px;
  background-color: #009cff;
}
#dataScreenApp .chartsBox {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#dataScreenApp .mainCenter .centerTop {
  width: 100%;
  height: 10vh;
  display: flex;
  color: white;
  justify-content: space-around;
}
#dataScreenApp #clock {
  position: absolute;
  color: white;
  width: 300px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: larger;
}
#dataScreenApp #fullScreen {
  position: absolute;
  right: 20px;
  color: white;
  /* width: 300px; */
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: larger;
  z-index: 1000;
}
#dataScreenApp .weather {
  position: fixed;
  color: white;
  width: 120px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: larger;
  right: 2rem;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#dataScreenApp .weatherImg {
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#dataScreenApp .weatherImg .duoyun {
  width: 30px;
  height: 25px;
  background: url(./img/多云.png);
  background-size: cover;
}
#dataScreenApp .centerTop .count {
  width: 30%;
  height: 90px;
  background: url(./img/border1.png) no-repeat 50%;
  background-size: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#dataScreenApp .count img {
  transform: scale(0.7);
  margin-right: 1rem;
  /* background-size: 50%; */
}
#dataScreenApp .count .text p:nth-child(1) {
  font-size: 14px;
}
#dataScreenApp .count .text p:nth-child(2) {
  font-size: 20px;
}
#dataScreenApp #centerMap {
  width: 100%;
  height: 80vh;
  margin-left: 0.5rem;
}
#dataScreenApp #centerMap .centerTitle {
  font-size: 16px;
  padding: 1.5rem 1.5rem 0;
  color: white;
  font-weight: 600;
}
#dataScreenApp #centerMap .tableBox {
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
#dataScreenApp .mainCenter {
  width: 100%;
  height: 80vh;
  /* background: url(./img/map.png) no-repeat 50%;
  background-size: 80%; */
}

#dataScreenApp .mainCenter .transactionDetails {
  width: 60%;
  height: 36vh;
  margin: 2rem 1rem;
  background: url(./img/border2.png) no-repeat 100%;
  background-size: 100% 100%;
}
#dataScreenApp .mainCenter .transactionShare {
  width: 40%;
  height: 36vh;
  margin: 2rem 1rem;
  background: url(./img/border2.png) no-repeat 100%;
  background-size: 100% 100%;
}
#dataScreenApp .mainCenter .businessErrorMessages {
  width: 97%;
  height: 40vh;
  margin: -1rem 1rem 0;
  background: url(./img/border2.png) no-repeat 100%;
  background-size: 100% 100%;
}
#dataScreenApp .mainCenter .centerButtom {
  width: 100%;
  height: 10vh;
  margin-top: 0.5rem;
  background: url(./img/border2.png) no-repeat 50%;
  background-size: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-right: 2rem;
}
#dataScreenApp .centerButtom .alarm {
  /* text-align: right; */
  width: 25%;
  height: 10vh;
  margin-right: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#dataScreenApp .centerButtom .alarmBg1 {
  width: 40%;
  height: 10vh;
  background: url(./img/正常.png) no-repeat 50%;
  background-size: 100%;
  margin-right: 1rem;
}
#dataScreenApp .centerButtom .alarmBg2 {
  width: 40%;
  height: 10vh;
  background: url(./img/告警.png) no-repeat 50%;
  background-size: 100%;
  margin-right: 1rem;
}
#dataScreenApp .centerButtom .alarmBg3 {
  width: 40%;
  height: 10vh;
  background: url(./img/严重.png) no-repeat 50%;
  background-size: 100%;
  margin-right: 1rem;
}
#dataScreenApp .centerButtom .text p:nth-child(1) {
  font-size: small;
}
#dataScreenApp .statusBoxAll {
  /* width: 90%; */
  margin-top: 2rem;
  height: 60%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-left: 1rem;
  display: flex;
  justify-content: space-around;
}
#dataScreenApp .statusBox {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 20%;
}
#dataScreenApp .statusBox .img1 {
  width: 100%;
  height: 12vh;
  background: url(./img/状态-正常.png) no-repeat 50%;
  background-size: 100%;
  margin: 0.2rem 0;
}
#dataScreenApp .statusBox .img2 {
  width: 100%;
  height: 12vh;
  background: url(./img/状态-故障.png) no-repeat 50%;
  background-size: 100%;
  margin: 0.2rem 0;
}
#dataScreenApp .statusBox .img3 {
  width: 100%;
  height: 12vh;
  background: url(./img/状态-离线.png) no-repeat 50%;
  background-size: 100%;
  margin: 0.2rem 0;
}
#dataScreenApp .statusBox .img4 {
  width: 100%;
  height: 12vh;
  background: url(./img/状态-维修中.png) no-repeat 50%;
  background-size: 100%;
  margin: 0.2rem 0;
}
#dataScreenApp .responseTime {
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
}
#dataScreenApp .responseTimeTitle {
  width: 90%;
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* margin-top: 10px; */
  /* margin-right: 20px; */
  color: white;
  font-size: 12px;
}
#dataScreenApp .responseTimeTitle .end {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #007197;
}
#dataScreenApp .responseTimeTitle .not {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #012054;
  border: 1px solid #0063bd;
}
#dataScreenApp .responseTimeAll {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  justify-items: center;
  /* margin-top: 40px; */
  margin-right: 10px;
}
#dataScreenApp .responseTimeBox {
  width: 65px;
  height: 40px;
  background-color: #002158;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  border: 1px solid #0063bd;
  border-radius: 3px;
  position: relative;
  margin: 5px;
}
#dataScreenApp .responseTimeBox2 {
  background-color: #007197;
  border: 1px solid #007197;
}
#dataScreenApp .responseTimeBox .picon {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 10px solid #008dff;
  border-right: 10px solid transparent;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 3px;
}
#dataScreenApp .responseTimeBox .responseTimeNum {
  font-size: 16px;
  font-weight: 700;
  padding-right: 5px;
}
#dataScreenApp .responseTimeBox .responseTimeMs {
  font-size: small;
}
</style>
