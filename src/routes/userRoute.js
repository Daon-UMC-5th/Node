const express = require("express");
// const asyncHandler = require("express-async-handler");
const userRouter = express.Router();

const userController = require("./../controllers/userController");

// 모든 유저 조회
userRouter.get("/getAllUser", userController.alluser);
// 회원가입
userRouter.post("/signUp", userController.signUp);
// 아이디 찾기
userRouter.get("/findId", userController.findId);
// 비밀번호 변경
userRouter.put("/findPw", userController.findPw);
// 닉네임 중복 확인
userRouter.get("/overlapNickname", userController.overlapNickname);
// 로그인
userRouter.post("/login", userController.login);
// email 중복 확인
userRouter.get("/emailCheck", userController.emailCheck);
// phone_num 중복확인
userRouter.get("/phoneNumCheck", userController.phoneNumCheck);

module.exports = userRouter;
