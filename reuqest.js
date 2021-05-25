const http = require("http");

// 发送请求（url，options，callback（可读流））
// 回调中res为可读流，使用data读取时直接返回的是响应体
const req = http.request(
  "http://yuanjin.tech:5005/api/movie",
  { method: "GET" },
  res => {
    // 设置返回数据流编码
    res.setEncoding("utf-8");

    // headers查看响应头
    // console.log(res.headers);

    // 读取记录响应体
    let request = "";
    res.on("data", chunk => {
      request += chunk;
    });

    // 读取结束后打印
    res.on("end", () => {
      console.log(request);
    });
  }
);

// 结束请求必须调用否则请求不触发
req.end();

// 使用配置和上面一样
// const req2 = http.request(
//   {
//     host: "yuanjin.tech",
//     path: "/api/movie",
//     port: "5005",
//     method: "GET"
//   },
//   res => {
//     res.setEncoding("utf-8");

//     res.on("data", chunk => {
//       console.log(chunk);
//     });
//   }
// );

// req2.end()