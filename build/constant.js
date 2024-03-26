export const OUTPUT_DIR = 'config-agile-exec'

export const PROXY_CONFIG = {
  /**
   * @desc    替换匹配值
   * @请求路径  http://localhost:3100/api/user
   * @转发路径  http://localhost:8080/user
   */
  '/secretassessment/api': {
    // target: 'http://work.paytunnel.cn:18080/secretassessment',
    target: 'http://172.17.13.40:9090/',
    changeOrigin: true,
    ws: true,
    rewrite: (path) => path.replace(new RegExp('^/secretassessment/api'), ''),
    onProxyReq: function (proxyReq, req, res, options) {
      if (req.body) {
        let bodyData = qs.stringify(req.body) // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/x-www-form-urlencoded')
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData)) // stream the content
        proxyReq.write(bodyData)
      }
    },
  },
  /**
   * @desc    不替换匹配值
   * @请求路径  http://localhost:3100/api/v2/user
   * @转发路径  http://localhost:8080/api/v2/user
   */
  '/api/v2': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
  /**
   * @desc    替换部分匹配值
   * @请求路径  http://localhost:3100/api/v3/user
   * @转发路径  http://localhost:8080/user
   */
  '/api/v3': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp('^/api'), ''),
  },
}
