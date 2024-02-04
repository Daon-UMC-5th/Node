const express = require("express");
const calendarRouter = express.Router();
const calendarController = require("../controllers/calendarController.js");

// 날짜 별 진료 목록 조회 
//calendarRouter.get("/consultation/:date", );
// 날짜 별 진료 목록 등록
//calendarRouter.post("/consultation/:date",);
// 날짜 별 진료 목록 삭제

/*
calendarRouter.get("/medication/:{date}",);
calendarRouter.post("/consultation/:{date}",);
*/

// 날짜별 신체 목록 조회 
calendarRouter.get("/physicalRecord/:date", calendarController.viewPhysicalRecord);
// 날짜별 신체 목록 등록
calendarRouter.post("/physicalRecord/register/:date", calendarController.registerPhysicalRecord);
// 날짜별 신체 목록 삭제
calendarRouter.get("/physicalRecord/delete/:date", calendarController.deletePhysicalRecord);
// 날짜별 신체 목록 수정
calendarRouter.post("/physicalRecord/update/:date", calendarController.updatePhysicalRecord);
module.exports = calendarRouter;