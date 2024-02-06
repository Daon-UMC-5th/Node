const StatusCodes = require("http-status-codes").StatusCodes;
const status = {
  //접근에 성공했을 때
  SUCCESS: {
    status: StatusCodes.OK,
    isSuccess: true,
    code: 200,
    message: "접근에 성공했습니다.",
  },

  //서버 측 에러
  INTERNAL_SERVER_ERROR: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    isSuccess: false,
    code: "COMMON000",
    message: "서버 에러, 관리자에게 문의 바랍니다.",
  },

  BAD_REQUEST: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: "COMMON001",
    message: "잘못된 요청입니다.",
  },

  UNAUTHORIZED: {
    status: StatusCodes.UNAUTHORIZED,
    isSuccess: false,
    code: "COMMON002",
    message: "권한이 잘못되었습니다.",
  },

  METHOD_NOT_ALLOWED: {
    status: StatusCodes.METHOD_NOT_ALLOWED,
    isSuccess: false,
    code: "COMMON003",
    message: "지원하지 않는 Http Method 입니다.",
  },

  FORBIDDEN: {
    status: StatusCodes.FORBIDDEN,
    isSuccess: false,
    code: "COMMON004",
    message: "금지된 요청입니다.",
  },

  NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: "COMMON005",
    message: "요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다.",
  },
  PARAMETER_IS_WRONG: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: "ARTICLE4001",
    message: "파라미터 오류",
  },

  //사용자 에러
  MEMBER_NOT_FOUND: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: "MEMBER4001",
    message: "사용자가 없습니다.",
  },

  NICKNAME_NOT_EXIST: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: "MEMBER4002",
    message: "닉네임은 필수입니다.",
  },

  ARTICLE_NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: "ARTICLE4001",
    message: "게시글이 없습니다.",
  },
  CODE_NOT_MATCH: {
    status: StatusCodes.NOT_ACCEPTABLE,
    isSuccess: false,
    code: "MAMBER4003",
    message: "인증코드가 일치하지 않습니다.",
  },
  NICKNAME_REPEAT: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 409,
    message: "닉네임 중복",
  },
  SIGNIN_USER_ID_ERROR: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "user_id null",
  },
  SIGNIN_PASSWORD_ERROR: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "password null",
  },
  NO_USER: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "일치하는 유저가 존재하지 않습니다.",
  },
  EXIST_EMAIL: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 409,
    message: "이미 존재하는 이메일입니다.",
  },
  EXIST_NUM: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 409,
    message: "이미 존재하는 전화번호입니다.",
  },
  EMAIL_NO_EXIST: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "존재하지 않는 email입니다.",
  },
  TOKEN_EMPTY: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "jwt token을 입력해주세요",
  },
  TOKEN_VERIFICATION_FAILURE: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "JWT 토큰 검증 실패",
  },
};
module.exports = status;
