const express = require("express");
// const asyncHandler = require("express-async-handler");
const userRouter = express.Router();

const userController = require("./../controllers/userController");
const jwtMiddleware = require("./../config/jwtMiddleware.js");

// 모든 유저 조회
userRouter.get("/getAllUser", jwtMiddleware, userController.alluser);
// 회원가입
userRouter.post("/signUp", userController.signUp);
// 아이디 찾기
userRouter.get("/findId", jwtMiddleware, userController.findId);
// 비밀번호 변경
userRouter.put("/findPw", jwtMiddleware, userController.findPw);
// 닉네임 중복 확인
userRouter.get(
  "/overlapNickname",
  jwtMiddleware,
  userController.overlapNickname
);
// 로그인 - jwt token 발급
userRouter.post("/login", userController.login);
// email 중복 확인
userRouter.get("/emailCheck", jwtMiddleware, userController.emailCheck);
// phone_num 중복확인
userRouter.get("/phoneNumCheck", jwtMiddleware, userController.phoneNumCheck);

module.exports = userRouter;
