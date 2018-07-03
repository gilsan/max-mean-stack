const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/post');
const postRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));
app.use("/images", express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});

mongoose.connect('mongodb://localhost/mean-stack')
  .then(  () => { console.log('접속 성공......'); })
  .catch( () => { console.log('접속 실패....'); });

 app.use("/api/posts",postRouter);
 app.use("/api/users", usersRouter);

module.exports = app;
