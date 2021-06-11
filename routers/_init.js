const express = require("express");
const app = express();
const port = 9527;

// app.get("/news",(req,res) => {
//   console.log(req.headers)
//   console.log(req.method)
//   console.log(req.path)
//   console.log(req.params)
//   console.log(req.query)
// })

// app.get("/news/:id",(req,res) => {
//   console.log(req.headers)
//   console.log(req.method)
//   console.log(req.path)
//   console.log(req.params)
//   console.log(req.query)
// })

app.get("*", (req, res) => {
  // res.send("hellow word")
  // res.send("<h1>hellow word</h1>")
  // res.send({ a: 1, b: 2 });
  // res.send([1,2,3]);
  // res.status(400);
  // res.end();

  // res.status(400).send("hellow word")

  // res.setHeader("a", 1)
  // res.end()

  // 重定向
  // res.status(302).header("location", "https://www.baidu.com/").end();
  // res.status(302).location("https://www.baidu.com/").end();
  // res.redirect(302, "https://www.baidu.com/");
  // 默认301
  // res.redirect("https://www.baidu.com/");

  
});

app.listen(port, () => {
  console.log("serve listen 9527");
});
