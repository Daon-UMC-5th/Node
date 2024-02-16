const express = require("express");
const jwtMiddleware = require("./../config/jwtMiddleware.js");
const upload = require("../config/multerMiddleware.js");
const uploadController = require("../controllers/uploadController.js");

const router = express.Router();

// 서버 메모리에 사진 임시 저장
router.use(upload.array("file"));

// 신규 화원 업로드 route
router.route("/profile/initial").post(uploadController.uploadUserInitial);
router.route("/doctor/initial").post(uploadController.uploadDoctorInitial);

// jwt 토큰에서 user_id 가져오는 미들웨어
// router.use(jwtMiddleware, (req, res, next) => {
//   req.user_id = req.verifiedToken.user_id;
//   next();
// });

router.use((req, res, next) => {
  req.user_id = 5;
  next();
});

// 사진 업로드
router
  .route("/profile")
  .post(uploadController.uploadProfile)
  .delete(uploadController.deleteProfile)
  .put(uploadController.updateProfile);

router.route("/diary").post(uploadController.uploadDiary);

router
  .route("/diary/:diaryId")
  .delete(uploadController.deleteDiary)
  .put(uploadController.updateDiary);

router.route("/board").post(uploadController.uploadBoard);

router
  .route("/board/:boardId")
  .post(uploadController.uploadBoard)
  .delete(uploadController.deleteBoard)
  .put(uploadController.updateBoard);

module.exports = router;
