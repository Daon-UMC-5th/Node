const multer = require("multer");
const { errResponse2 } = require("./response.js");

exports.multerErrorHandler = (error, req, res, next) => {
  let errorMessage = "";
  let errorCode = 400; // HTTP 상태 코드 400으로 설정
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case "LIMIT_FILE_SIZE":
        errorMessage = "File is too large.";
        break;
      case "LIMIT_FILE_COUNT":
        errorMessage = "File limit reached.";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        errorMessage = "File must be an image or pdf.";
        break;
      default:
        errorMessage = "File upload error.";
        break;
    }

    // errResponse2 형식에 맞춰서 에러 응답 보내기
    return res.status(errorCode).json(
      errResponse2(
        {
          isSuccess: false,
          code: errorCode, // 여기서는 HTTP 상태 코드를 사용
          message: errorMessage,
        },
        {}
      )
    );
  } else if (error.message === "File is not of the correct type") {
    errorMessage = "Only image or PDF files are allowed.";
    return res.status(errorCode).json(
      errResponse2(
        {
          isSuccess: false,
          code: errorCode, // 여기서는 HTTP 상태 코드를 사용
          message: errorMessage,
        },
        {}
      )
    );
  } else {
    next(error); // Multer 에러가 아닌 경우, 다음 에러 처리기로 전달
  }
};
