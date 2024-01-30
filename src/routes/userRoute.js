const express = require("express");
// const asyncHandler = require("express-async-handler");
const userRouter = express.Router();

const userController = require("./../controllers/userController");

// // 모든 유저 조회
// userRouter.get("/getAllUser", userRouter.alluser);
// // 회원가입
// userRouter.post("/signUp", userRouter.signUp);
// // 아이디 찾기
// userRouter.get("/findId", userRouter.findId);
// // 비밀번호 변경
// userRouter.put("/findPw", userRouter.findPw);
// // 닉네임 중복 확인
// userRouter.get("/overlapNickname", userRouter.overlapNickname);
// // 로그인
// userRouter.post("/login", userRouter.login);

module.exports = userRouter;
