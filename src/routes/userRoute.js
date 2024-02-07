const express = require("express");
// const asyncHandler = require("express-async-handler");
const userRouter = express.Router();

const userController = require("./../controllers/userController");
const jwtMiddleware = require("./../config/jwtMiddleware.js");
const status = require("../config/responseStatus.js");

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
// 로그아웃
userRouter.get("/logout", (req, res) => {
  const { accessToken } = req.cookies;
  const blacklistedTokens = new Set();

  // 토큰을 블랙리스트에 추가
  blacklistedTokens.add(accessToken);

  // 콘솔에 로그인이 필요한 메시지와 블랙리스트 출력
  console.log("로그인이 필요합니다.");
  console.log("블랙리스트:", blacklistedTokens);

  // 쿠키를 삭제
  res.clearCookie("accessToken");
  jwtMiddleware(req, res, () => {
    const { accessToken } = req.cookies;

    // if (accessToken && blacklistedTokens.has(accessToken)) {
    if (blacklistedTokens.has(accessToken)) {
      // 블랙리스트에 있는 토큰이면 로그인하지 않은 것으로 처리
      console.log("로그인이 필요합니다.");
      //   return res.status(401).send("로그인이 필요합니다.");
      return res.send(status.SUCCESS);
    } else {
      console.log("accessToken none");
      // 블랙리스트에 없거나 토큰이 없으면 다음 미들웨어로 진행
      next();
    }
  });
});

// 회원탈퇴
userRouter.delete("/user-delete", jwtMiddleware, userController.userDelete);

module.exports = userRouter;
