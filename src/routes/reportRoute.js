const express = require("express");
const reportController = require("./../controllers/reportController");
// const jwtMiddleware = require("./../config/jwtMiddleware.js");

const router = express.Router();

// jwt 토큰에서 user_id 가져오는 미들웨어
router.use(jwtMiddleware, (req, res, next) => {
  req.user_id = req.verifiedToken.user_id;
  next();
});

// router.use((req, res, next) => {
//   req.user_id = 5;
//   next();
// });

// 일기 신고 라우트
router.route("/diary/:diaryId").post(reportController.reportDiary);
router.route("/board/:boardId").post(reportController.reportBoard);
router.route("/comment/:commentId").post(reportController.reportComment);

module.exports = router;
