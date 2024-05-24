// gms.config.js
// document.write("<script src='./formValidator.js'></script>");

// 请在此处修改配置 ↓↓↓
const envConfig = { // 部署环境配置项
  "BASE_API": "http://work.paytunnel.cn:18080/secretassessment", // api请求base基础路径
}
// 请在此处修改配置 ↑↑↑

const envDevConfig = { // 本地开发环境配置项
  "BASE_API": "/api",
}

let envName = window.location.pathname === '/' ? 'development' : 'production' // 通过URL来判断环境
console.log('当前环境：', envName)
function envUse(name) {
  let used = envName === 'development' ? envDevConfig : envConfig
  return used[name]
}

if (envUse(null, 'CLEAR_CONSOLE') === 'true') {
  // 清空控制台打印日志
  console.log = function () { }
}


