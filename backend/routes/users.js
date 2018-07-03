const express = require("express");
const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");
const userRouter = express.Router();
const Users = require("../models/users");

userRouter.post("/signup", (req, res, next ) => {

   /*  사용자 암호화 */
   bcrypt.hash(req.body.password, 10)
     .then( hash => {
          const user = new Users({
            email : req.body.email,
            password : hash
          });
            console.log(user);
             /* 사용자 저장   */
           user.save().then((createUser) => {
               res.status(201).json({
                  message: '사용자 계정 생성되었습니다.',
                  result: createUser
               });
            });

     })
     .catch( err => {
        res.status(500).json({
          error: err
        })
     });

 });

 userRouter.post("/login", (req, res, next) => {
   let fetchedUser;
  Users.findOne({ email: req.body.email}).then( user => {

      if(!user) {
        return res.status(401).json({
           message: "존재하지 않는 이메일 입니다."
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
  }).then ( result => {

       if(!result) {
        return res.status(401).json({ message: "인증실패"});
       }
       /* JWT  */
       const token = jwt.sign(
         { email: fetchedUser.email, userId: fetchedUser._id},
         "secrete_this_should_be_longer",
         { expiresIn: "1h", }
       );

          res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
          });
  }).catch(
    error =>  { return res.status(401).json({ message: "인증실패"})}
  );
});


module.exports = userRouter;

