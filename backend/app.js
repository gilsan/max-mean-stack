const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/post');

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

mongoose.connect('mongodb://localhost/mean-stack')
  .then(  () => { console.log('접속 성공......'); })
  .catch( () => { console.log('접속 실패....'); })

app.post("/api/posts",(req, res, next) => {
   const post = new Post({
     title: req.body.title,
     content: req.body.content
   });
   post.save().then( (createdPost) => {
    console.log('데이터 저장: ',createdPost);
    res.status(200).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
   })

});

app.get("/api/posts", (req, res, next) => {
  Post.find().then( document => {
    res.status(200).json({
      message: "서버에서 데이타 가져오기 성공!",
      posts: document
    });
  });
});

app.delete("/api/posts/:id", (req,res,next) => {
   console.log(req.params.id);
   Post.deleteOne({_id: req.params.id}).then(result => {
     console.log(result);
    res.status(200).json( { message: " 데이타가 삭제 되었습니다..."});
   })

});


module.exports = app;
