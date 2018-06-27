const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts",(req, res, next) => {
   const post = req.body;
   console.log(post);
   res.status(200).json({
     message: 'Post added successfully'
   })
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "서버 사이드 포스트 첫번째",
      content: "서버에서 보내온 것입니다."
    },
    {
      id: "ksajflaj132",
      title: "서버 사이드 포스트 두번째",
      content: "서버에서 알려준 정보!"
    }
  ];
  res.status(200).json({
    message: "서버에서 데이타 가져오기 성공!",
    posts: posts
  });
});

module.exports = app;
