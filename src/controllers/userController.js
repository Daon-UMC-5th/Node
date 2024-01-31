const response = require("../config/response.js");
const status = require("../config/responseStatus.js");
const BaseError = require("../config/response.js");
const crypto = require("crypto");
const userProvider = require("../providers/userProvider.js");
const userService = require("../services/userService.js");

const userController = {
  // 데이터베이스에서 테이블 이름을 가져오는 메서드
  // 모든 유저 반환
  alluser: async (req, res) => {
    try {
      console.log("controller 회원 정보 요청");
      return res.send(response(status.SUCCESS, await userProvider.getUser()));
    } catch (err) {
      //   res.status(500).json({ success: false, message: error.message });
      console.error("Error acquiring connection:", err);
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  },
  // 회원가입
  signUp: async (req, res, next) => {
    try {
      console.log("controller 회원가입요청");
      console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용
      // email 이미 존재할 경우
      const email = await userProvider.user_id_check(req.body);
      console.log("email확인!!", email, req.body.email);
      if (req.body.email == email) {
        return res.send(response(status.EXIST_EMAIL, email));
      }

      // 전화번호 이미 존재할 경우
      const phoneNum = await userProvider.numCheck(req.body);
      console.log("phonenum 확인!!", phoneNum, req.body.phone_number);
      if (req.body.phone_number == phoneNum) {
        return res.send(response(status.EXIST_NUM, phoneNum));
      }

      // 닉네임 이미 존재할 경우
      const nickname = await userProvider.checkNickname(req.body);
      console.log("nickname 확인!!", nickname, req.body.user_nickname);
      if (req.body.user_nickname == nickname) {
        return res.send(response(status.NICKNAME_REPEAT, nickname));
      }

      // 최종 회원가입
      return res.send(
        response(status.SUCCESS, await userService.signup(req.body))
      );
    } catch (err) {
      console.error("Error acquiring connection:", err);
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  },
  // 아이디 찾기
  findId: async (req, res, next) => {
    try {
      console.log("controller 아이디 찾기 요청");
      console.log("body:", req.query);

      // 회원정보 없을 때
      const result = await userProvider.findid(req.query);
      if (result == undefined) {
        return res.send(response(status.NO_USER, result));
      } else {
        return res.send(response(status.SUCCESS, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  },
  // 비밀번호 변경
  findPw: async (req, res, next) => {
    try {
      console.log("controller 비밀번호 찾기 요청");
      console.log("body:", req.body);
      // email 존재하지 않을 때
      const email = await userProvider.user_id_check(req.body);
      console.log("email확인!!", email, req.body.email);
      if (email == undefined) {
        return res.send(response(status.EMAIL_NO_EXIST, email));
      }
      // 최종 변경 가능
      return res.send(
        response(status.SUCCESS, await userService.findpw(req.body))
      );
    } catch (err) {
      console.error("Error acquiring connection:", err);
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  },
  // 닉네임 중복 확인
  overlapNickname: async (req, res, next) => {
    try {
      console.log("controller 비밀번호 찾기 요청");
      console.log("body:", req.query);
      const result = await userProvider.checkNickname(req.query);
      if (result != undefined) {
        return res.send(response(status.NICKNAME_REPEAT, result));
      } else {
        return res.send(response(status.SUCCESS, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  },
  // 로그인(jwt)
  login: async (req, res, next) => {
    try {
      console.log("로그인:", req.body);
      const user_id = await userProvider.user_id_check(req.body);
      if (user_id == null)
        return res.send(response(status.SIGNIN_USER_ID_ERROR));

      const selectUserId = user_id;
      console.log("selectUserId:", selectUserId);

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
      console.log("passwordRows:", passwordRows);

      if (!passwordRows || passwordRows.password !== hashedPassword) {
        return res.send(response(status.SIGNIN_PASSWORD_ERROR));
      }

      return res.send(
        response(
          status.SUCCESS,
          await userService.signIn(passwordRows.user_id, req.body)
        )
      );
    } catch (err) {
      console.error("Error acquiring connection:", err);
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  },
  // 이메일 중복 확인
  emailCheck: async (req, res, next) => {
    try {
      console.log("controller email 중복 확인");
      console.log("body:", req.query);
      const result = await userProvider.user_id_check(req.query);

      if (result == undefined) {
        return res.send(response(status.SUCCESS, result));
      } else {
        return res.send(response(status.EXIST_EMAIL, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  },
  // 전화번호 중복 확인
  phoneNumCheck: async (req, res, next) => {
    try {
      console.log("controller phonenum 중복 확인");
      console.log("body:", req.query);
      const result = await userProvider.numCheck(req.query);

      if (result == undefined) {
        return res.send(response(status.SUCCESS, result));
      } else {
        return res.send(response(status.EXIST_NUM, result));
      }
    } catch (err) {
      console.error("Error acquiring connection:", err);
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  },
};

module.exports = userController;
