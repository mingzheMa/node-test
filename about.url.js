// url
const url = require("url");

// URL类
const myUrl = new url.URL(
  "https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash"
);
// console.log(myUrl);

// URLSearchParams 类
// 读取参数
// console.log(myUrl.searchParams.get("query"));

// 设置/添加参数
// console.log(myUrl.searchParams.set("query", "1"));
// console.log(myUrl.searchParams.set("a", "1"));
// console.log(myUrl)

// 删除参数
// console.log(myUrl.searchParams.delete("a"));
// console.log(myUrl)