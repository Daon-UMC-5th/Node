const { response, BaseError } = require("../config/response.js");
const status = require("../config/responseStatus.js");
const crypto = require("crypto");
const userProvider = require("../providers/userProvider.js");
const userService = require("../services/userService.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// cookie
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// cookie-parser 미들웨어를 사용
app.use(cookieParser());

// 루트에서 환경변수 불러옴
dotenv.config({ path: "./config.env" });
const jwtsecret = process.env.JWT_SECRET;
const blacklistedTokens = new Set();

const userController = {
  // 데이터베이스에서 테이블 이름을 가져오는 메서드
  // 모든 유저 반환
  alluser: async (req, res) => {
    try {
      const userData = await userProvider.getUser();

      if (Object.keys(req.cookies).length === 0) {
        return res.send(response(status.TOKEN_VERIFICATION_FAILURE,{}));
      } else {
        return res.send(response(status.SUCCESS, userData));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
  // 회원가입
  signUp: async (req, res, next) => {
    try {
      // 이미지
      var img;
      if (req.file) {
        img = req.file.location;
      } else {
        img = null;
        return res.send(response(status.IMAGE_NULL));
      }
      console.log("profileImg:", img);

      // email 이미 존재할 경우
      const email = await userProvider.user_id_check(req.body);
      if (req.body.email == email) {
        return res.send(response(status.EXIST_EMAIL, email));
      }

      // 전화번호 이미 존재할 경우
      const phoneNum = await userProvider.numCheck(req.body);
      if (req.body.phone_number == phoneNum) {
        return res.send(response(status.EXIST_NUM, phoneNum));
      }

      // 닉네임 이미 존재할 경우
      const nickname = await userProvider.checkNickname(req.body);
      if (req.body.user_nickname == nickname) {
        return res.send(response(status.NICKNAME_REPEAT, nickname));
      }

      // 최종 회원가입
      else {
        const reulst = await userService.signup(req.body);
        // user_id 찾기
        const findInfo = await userProvider.userInfo(req.body);
        const img_result = await userService.profileUpload(
          img,
          findInfo.user_id
        );
        return res.send(response(status.SUCCESS,{}));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
  // 의료인 회원가입
  doctorAuth: async (req, res, next) => {
    try {
      // 이미지
      //이미지 파일 경로 -> 변수에 담음
      var images = [];
      for (i = 0; i < req.files.length; i++) {
        images[i] = req.files[i].location;
      }
      console.log("프로필 사진 url : ", images[0]); // 프로필 사진
      console.log("의료인 면허 url : ", images[1]); // 의료인 면허
      // image 없을 경우
      if (images[0] === undefined || images[1] === undefined) {
        return res.send(response(status.IMAGE_NULL));
      }
      // email 이미 존재할 경우
      const email = await userProvider.user_id_check(req.body);
      if (req.body.email == email) {
        return res.send(response(status.EXIST_EMAIL, email));
      }

      // 전화번호 이미 존재할 경우
      const phoneNum = await userProvider.numCheck(req.body);
      if (req.body.phone_number == phoneNum) {
        return res.send(response(status.EXIST_NUM, phoneNum));
      }

      // 최종 회원가입
      else {
        const reulst = await userService.signup(req.body);
        // user_id 찾기
        const findInfo = await userProvider.userInfo(req.body);
        // 프로필 사진
        const img_result = await userService.profileUpload(
          images[0],
          findInfo.user_id
        );
        // 의료인면허
        const doctor = await userService.doctorUpload(
          images[1],
          findInfo.user_id
        );

        return res.send(response(status.SUCCESS));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
  // 아이디 찾기
  findId: async (req, res, next) => {
    try {
      // 회원정보 없을 때
      const result = await userProvider.findid(req.body);
      if (result == undefined) {
        return res.send(response(status.NO_USER, result));
      } else {
        return res.send(response(status.SUCCESS, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
  // 비밀번호 변경
  findPw: async (req, res, next) => {
    try {
      // email 존재하지 않을 때
      const email = await userProvider.user_id_check(req.body);
      if (email == undefined) {
        return res.send(response(status.EMAIL_NO_EXIST, email));
      }
      // 최종 변경 가능
      return res.send(
        response(status.SUCCESS, await userService.findpw(req.body))
      );
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
  // 닉네임 중복 확인
  overlapNickname: async (req, res, next) => {
    try {
      const result = await userProvider.checkNickname(req.body);
      if (result != undefined) {
        return res.send(response(status.NICKNAME_REPEAT, result));
      } else {
        return res.send(response(status.SUCCESS, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
  // 로그인(jwt)
  login: async (req, res, next) => {
    try {
      const user_id = await userProvider.user_id_check(req.body);
      if (user_id == null)
        return res.send(response(status.SIGNIN_USER_ID_ERROR,{}));

      const selectUserId = user_id;

      // 비밀번호 확인
      const hashedPassword = await crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
      console.log(hashedPassword);
      const selectUserPasswordParams = [selectUserId, hashedPassword];
      const passwordRows = await userProvider.passwordCheck(
        selectUserPasswordParams
      );

      if (!passwordRows || passwordRows.password !== hashedPassword) {
        return res.send(response(status.SIGNIN_PASSWORD_ERROR,{}));
      }
      const token = await userService.signIn(passwordRows.user_id, req.body);
      res.cookie("accessToken", token, { httpOnly: true });
      console.log("token::", token);
      console.log("cookie:", req.cookies);
      return res.send(response(status.SUCCESS, token));
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },

  // 이메일 중복 확인
  emailCheck: async (req, res, next) => {
    try {
      const result = await userProvider.user_id_check(req.body);

      if (result == undefined) {
        return res.send(response(status.SUCCESS, result));
      } else {
        return res.send(response(status.EXIST_EMAIL, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
  // 전화번호 중복 확인
  phoneNumCheck: async (req, res, next) => {
    try {
      const result = await userProvider.numCheck(req.body);

      if (result == undefined) {
        return res.send(response(status.SUCCESS, result));
      } else {
        return res.send(response(status.EXIST_NUM, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
  // 회원 탈퇴
  userDelete: async (req, res, next) => {
    try {
      // user_id 가져오기

      if (Object.keys(req.cookies).length === 0) {
        return res.send(response(status.TOKEN_VERIFICATION_FAILURE));
      } else {
        const user_id = req.verifiedToken.user_id;
        console.log(user_id);
        const result = await userService.deleteUser(user_id);
        return res.send(response(status.SUCCESS, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
};

module.exports = userController;
