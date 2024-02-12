const response = ({ isSuccess, code, message }, result) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    result: result,
  };
};
// 추가함
class BaseError extends Error {
  constructor(data) {
    super(data.message);
    this.data = data;
  }
}

class CustomError extends Error {
  constructor(code, message) {
    super(message); // 부모 클래스의 constructor 호출
    this.code = code;
    this.name = this.constructor.name; // 에러 이름 설정
    Error.captureStackTrace(this, this.constructor); // 스택 추적
  }
}

const errResponse = ({ isSuccess, code, message }) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
  };
};

const errResponse2 = ({ isSuccess, code, message }, result) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    result: result,
  };
};

module.exports = {
  response,
  BaseError,
  CustomError,
  errResponse,
  errResponse2,
};
