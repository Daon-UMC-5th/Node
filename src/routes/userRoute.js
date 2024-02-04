const express = require("express");
// const asyncHandler = require("express-async-handler");
const userRouter = express.Router();

const userController = require("./../controllers/userController");
const jwtMiddleware = require("./../config/jwtMiddleware.js");

// 모든 유저 조회
userRouter.get("/users", jwtMiddleware, userController.alluser);
// 회원가입
userRouter.post("/sign-up", userController.signUp);
// 아이디 찾기
userRouter.post("/find-id", userController.findId);
// 비밀번호 변경
userRouter.put("/find-pw", userController.findPw);
// 닉네임 중복 확인
userRouter.post("/overlap-nickname", userController.overlapNickname);
// 로그인 - jwt token 발급
userRouter.post("/login", userController.login);
// email 중복 확인
userRouter.post("/email-check", userController.emailCheck);
// phone_num 중복확인
userRouter.post("/phone-num-check", userController.phoneNumCheck);

module.exports = userRouter;
