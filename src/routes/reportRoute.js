const express = require("express");
const reportController = require("./../controllers/reportController");

const router = express.Router();

// req.user를 설정하는 미들웨어
router.use((req, res, next) => {
  req.user_id = 9;
  console.log("이유 " + req.body.reason);
  next();
});

// 일기 신고 라우트
router.route("/diary/:diaryId").post(reportController.reportDiary);
router.route("/board/:boardId").post(reportController.reportBoard);
router.route("/comment/:commentId").post(reportController.reportComment);

module.exports = router;
