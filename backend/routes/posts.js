const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.post("",(req, res, next) => {
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

router.put("/:id", (req,res, next) => {
    const post = new Post({
      _id: req.body.id,
       title: req.body.title,
       content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post)
    .then( result => {
        console.log(result);
        res.status(200).json({message:' 데이타 갱신 완료..'})
    });
  
   });
  
  
   router.get("", (req, res, next) => {
    Post.find().then( document => {
      res.status(200).json({
        message: "서버에서 데이타 가져오기 성공!",
        posts: document
      });
    });
  });
  
  router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: '자료가 없습니다.'})
      }
    });
  });
  
  
  
  router.delete("/:id", (req,res,next) => {
     console.log(req.params.id);
     Post.deleteOne({_id: req.params.id}).then(result => {
       console.log(result);
      res.status(200).json( { message: " 데이타가 삭제 되었습니다..."});
     });
    });

     module.exports = router;
  