const jwt = require("jsonwebtoken");
// const secret_config = require("./secret");
const { response, errResponse } = require("./response");
const baseResponse = require("./responseStatus");

// cookie
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// cookie-parser 미들웨어를 사용
app.use(cookieParser());

// env
const dotenv = require("dotenv");
// const path = require("path");

// 루트에서 환경변수 불러옴
dotenv.config({ path: "./config.env" });
const jwtsecret = process.env.JWT_SECRET;
const blacklistedTokens = new Set();

const jwtMiddleware = (req, res, next) => {
  // read the token from header or url
  // const token = req.headers["x-access-token"] || req.query.token;
  const token = req.headers["api_key"] || req.query.token;
  console.log("token:", token);

  // token does not exist
  if (token == undefined) {
    return res.send(errResponse(baseResponse.TOKEN_EMPTY));
  }

  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, jwtsecret, (err, verifiedToken) => {
      if (err) reject(err);
      resolve(verifiedToken);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    console.error("JWT Verification Error:", error);

    return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
  };
  // process the promise
  p.then((verifiedToken) => {
    //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
    req.verifiedToken = verifiedToken;
    next();
  }).catch(onError);
  // cookie?
  const { accessToken } = req.cookies;
  console.log("accessToken: ", accessToken);
  console.log("blacklist:", blacklistedTokens.has(accessToken));
  console.log("blacklist:", blacklistedTokens);
  // if (accessToken && blacklistedTokens.has(accessToken)) {
  if (blacklistedTokens.has(accessToken)) {
    // 블랙리스트에 있는 토큰이면 로그인하지 않은 것으로 처리
    console.log("로그인이 필요합니다.");
    // return res.status(401).send("로그인이 필요합니다.");
    return res.send(status.TOKEN_VERIFICATION_FAILURE);

    // res.redirect("/");
  } else {
    console.log("accessToken none");
    // 블랙리스트에 없거나 토큰이 없으면 다음 미들웨어로 진행
    // next();
    // res.redirect("/");
  }
};

module.exports = jwtMiddleware;
