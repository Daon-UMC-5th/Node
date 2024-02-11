const userDAO = require("./../models/userDAO");
const crypto = require("crypto");
// const jwtsecret = require("../config/secret.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(cookieParser);
const jwtMiddleware = require("./../config/jwtMiddleware.js");

const dotenv = require("dotenv");
// const path = require("path");

// 루트에서 환경변수 불러옴
dotenv.config({ path: "./config.env" });
const jwtsecret = process.env.JWT_SECRET;

class userService {
  // 회원가입
  static async signup(body) {
    // 현재 날짜 시간
    let date = new Date();
    // 비밀번호 암호화
    const hashedPassword = await crypto
      .createHash("sha256")
      .update(body.password)
      .digest("hex");
    console.log("비밀번호 암호화" + hashedPassword);
    try {
      const joinUserData = await userDAO.addUser({
        user_name: body.user_name,
        email: body.email,
        password: hashedPassword,
        phone_number: body.phone_number,
        birth_date: body.birth_date,
        gender: body.gender,
        user_nickname: body.user_nickname,
        introduction: body.introduction,
        role: body.role,
        created_at: date,
        updated_at: date,
        agree: body.agree,
      });
      return joinUserData;
    } catch (error) {
      throw error;
    }
  }
  // 비밀번호 변경
  static async findpw(body) {
    // 현재 날짜 시간
    let date = new Date();
    // 비밀번호 암호화
    const hashedPassword = await crypto
      .createHash("sha256")
      .update(body.password)
      .digest("hex");
    try {
      const result = await userDAO.modPw({
        email: body.email,
        updated_at: date,
        password: hashedPassword,
      });
      console.log("비밀번호변경 요청" + JSON.stringify(result));
      return result;
    } catch (error) {
      throw error;
    }
  }
  // 로그인 인증 방법 (jwt)
  static async signIn(user_id, body, res) {
    try {
      //토큰 생성 Service
      let token = await jwt.sign(
        {
          user_id: user_id,
        }, // 토큰의 내용(payload)
        jwtsecret, // 비밀키
        {
          expiresIn: "1d",
          subject: "userInfo",
        } // 유효 기간 365일
      );

      console.log("jwt:", token);
      return token;
    } catch (error) {
      throw error;
    }
  }
  // 회원 탈퇴
  static async deleteUser(user_id) {
    try {
      const result = await userDAO.userDelete(user_id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userService;
