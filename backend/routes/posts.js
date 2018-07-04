const express = require("express");
// const Post = require("../models/post");
const posts = require("../controllers/posts");
const checkAuth = require('../middleware/check-auth');
const router = express.Router();
const extractFile = require('../middleware/file');
// const multer = require('multer');

router.post("", checkAuth, extractFile, posts.createPost);

router.put("/:id", checkAuth, extractFile, posts.updatePost);

router.get("", posts.fetchData);
router.get('/:id', posts.fetchId);
router.delete("/:id", checkAuth, posts.delete);

     module.exports = router;
