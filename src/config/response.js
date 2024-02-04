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
const errResponse = ({ isSuccess, code, message }) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
  };
};

module.exports = { response, BaseError, errResponse };
