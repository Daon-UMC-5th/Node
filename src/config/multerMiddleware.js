const multer = require("multer");

const storage = multer.memoryStorage();

// image 파일 또는 특정 경로에서만 PDF 파일 허용
const fileFilter = (req, file, cb) => {
  // 이미지 파일 허용
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  }
  // 특정 경로에서만 PDF 파일 허용
  else if (
    req.path === "/doctor/initial" &&
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  }
  // 그 외의 경우 파일 타입 에러
  else {
    cb(new Error("File is not of the correct type"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000, files: 1 },
});

module.exports = upload;
