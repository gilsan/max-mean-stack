const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const url=  req.protocol + '://' + req.get('host') ;
  const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + '/images/' + req.file.filename,
      creator: req.userData.userId
    });
    post.save().then( (createdPost) => {
    // console.log('데이터 저장: ',createdPost);
     res.status(200).json({
       message: 'Post added successfully',
      // postId: createdPost._id
      post : {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath
      }
     });
    }).catch( error => {
       res.status(500).json({ message: "계정추가 하지 못했습니다..."})
    });
};

exports.updatePost = (req,res, next) => {

  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  console.log(req.userData);

  const post = new Post({
      _id: req.body.id,
       title: req.body.title,
       content: req.body.content,
       imagePath: imagePath,
       creator: req.userData.userId
    });
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post)
    .then( result => {
        if (result.nModified > 0) {
          res.status(200).json({message:' 데이타 갱신 완료..'});
        } else {
          res.status(401).json({message:' 갱신권한 없음..'});
        }

    }).catch( error => {
      res.status(500).json( { message: '데이타 갱신 실패....'});
    });

   };

exports.fetchData =  (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
   postQuery
       .skip(pageSize * (currentPage - 1))
       .limit(pageSize);
  }

  postQuery
  .then( document => {
     fetchedPosts = document;
     return Post.count()
   })
   .then ( count => {
        res.status(200).json({
              message: "서버에서 데이타 가져오기 성공!",
              posts: fetchedPosts,
             maxPosts: count
         });
    });
};

exports.fetchId =  (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: '자료가 없습니다.'})
    }
  }).catch( error => {
    res.status(500).json( { message: '자료가 없습니다....'});
  });
};

exports.delete = (req,res,next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
   if (result.n  > 0) {
     res.status(200).json({message:' 데이타 갱신 완료..'});
   } else {
     res.status(401).json({message:' 갱신권한 없음..'});
   }
  }).catch( error => {
    res.status(500).json({ message: '자료를 삭제하지 못했습니다.....'});
  });
 };

