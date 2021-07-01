// const http = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");

// 手写代理
// module.exports = function (req, res) {
//   const proxyReq = http.request(
//     {
//       hostname: "yuanjin.tech",
//       path: `/api${req.url}`,
//       port: 5005,
//       method: req.method,
//       headers: req.headers
//     },
//     proxyRes => {
//       res.status(proxyRes.statusCode);
//       for (const key in proxyRes.headers) {
//         res.set(key, proxyRes.headers[key]);
//       }
//       proxyRes.pipe(res);
//     }
//   );
//   req.pipe(proxyReq);
//   proxyReq.end();
// };

module.exports = createProxyMiddleware({
  target: "http://yuanjin.tech:5005",
  //   changeOrigin:true, // 修改请求头中的host为目标源 yuanjin.tech:5005
  pathRewrite(path, req) {
    return path.replace("/data/api", "/api");
  }
});
