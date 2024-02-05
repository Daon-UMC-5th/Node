const express = require("express");
const calendarRouter = express.Router();
const calendarController = require("../controllers/calendarController.js");

// 날짜별 진료 목록 조회 
calendarRouter.get("/consultation/:date", calendarController.viewConsultation);
// 날짜별 진료 목록 등록
calendarRouter.post("/consultation/:date",calendarController.registerConsultation);
// 날짜별 진료 목록 삭제
calendarRouter.delete("/consultation/:date", calendarController.deleteConsultation);
// 날짜별 진료 목록 수정
calendarRouter.put("/consultation/:date", calendarController.updateConsultation);


// 날짜별 
calendarRouter.get("/medication/:{date}",);
calendarRouter.post("/consultation/:{date}",);
*/

// 날짜별 신체 목록 조회 
calendarRouter.get("/physical-record/:date", calendarController.viewPhysicalRecord);
// 날짜별 신체 목록 등록
calendarRouter.post("/physical-record/:date", calendarController.registerPhysicalRecord);
// 날짜별 신체 목록 삭제
calendarRouter.delete("/physical-record/:date", calendarController.deletePhysicalRecord);
// 날짜별 신체 목록 수정
calendarRouter.put("/physical-record/:date", calendarController.updatePhysicalRecord);
module.exports = calendarRouter;