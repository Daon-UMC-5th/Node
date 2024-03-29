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
    code: 500,
    message: "서버 에러, 관리자에게 문의 바랍니다.",
  },

  BAD_REQUEST: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 400,
    message: "잘못된 요청입니다.",
  },

  UNAUTHORIZED: {
    status: StatusCodes.UNAUTHORIZED,
    isSuccess: false,
    code: 401,
    message: "권한이 잘못되었습니다.",
  },

  METHOD_NOT_ALLOWED: {
    status: StatusCodes.METHOD_NOT_ALLOWED,
    isSuccess: false,
    code: 405,
    message: "지원하지 않는 Http Method 입니다.",
  },

  FORBIDDEN: {
    status: StatusCodes.FORBIDDEN,
    isSuccess: false,
    code: 403,
    message: "금지된 요청입니다.",
  },

  NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다.",
  },
  PARAMETER_IS_WRONG: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "파라미터 오류",
  },

  //사용자 에러
  MEMBER_NOT_FOUND: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 400,
    message: "사용자가 없습니다.",
  },

  NICKNAME_NOT_EXIST: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 400,
    message: "닉네임은 필수입니다.",
  },

  ARTICLE_NOT_FOUND: {
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "게시글이 없습니다.",
  },
  CODE_NOT_MATCH: {
    status: StatusCodes.NOT_ACCEPTABLE,
    isSuccess: false,
    code: 406,
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
  ARTICLE_DUPLICATION: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 400,
    message: "요청한 게시글이 이미 존재합니다."
  },
  ID_EMPTY:{
    status: StatusCodes.NOT_FOUND,
    isSuccess: false,
    code: 404,
    message: "id를 입력하세요."
  },
  SEND_FIRST: {
    status: StatusCodes.BAD_REQUEST,
    isSuccess: false,
    code: 400,
    message: "인증 요청을 먼저 해주세요."
  },

};
module.exports = status;
