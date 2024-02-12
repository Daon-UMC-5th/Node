const express = require("express");
const calendarRouter = express.Router();
const calendarController = require("../controllers/calendarController.js");
const status = require('../config/responseStatus.js');
const {response} = require("../config/response.js");
const jwtMiddleware = require("./../config/jwtMiddleware.js");

calendarRouter.use(jwtMiddleware,(req,res,next) => {
    req.user_id = req.verifiedToken.user_id;
    if(req.user_id!==-1) next();
    else res.send(response(status.MEMBER_NOT_FOUND));
})


calendarRouter.get("/:month", calendarController.viewAllCalendar);

// 날짜별 진료 목록 조회 
calendarRouter.get("/consultation/:date", calendarController.viewConsultation);
// 날짜별 진료 목록 등록
calendarRouter.post("/consultation/:date",calendarController.registerConsultation);
// 날짜별 진료 목록 삭제
calendarRouter.delete("/consultation/:date", calendarController.deleteConsultation);
// 날짜별 진료 목록 수정
calendarRouter.put("/consultation/:date", calendarController.updateConsultation);


// 날짜별 복용 목록 조회
// 해당 날짜에 모든 복용기록 조회
calendarRouter.get("/medication/:date", calendarController.viewAllMedication);
// 해당 날짜에 대한 아침/점심/저녁 별 복용기록 조회
calendarRouter.get("/medication/:when/:date", calendarController.viewMedication);
// 날짜별 복용 목록 등록
calendarRouter.post("/medication/:when/:date",calendarController.registerMedication);
// 날짜별 복용 목록 삭제 
calendarRouter.delete("/medication/:when/:date", calendarController. deleteMedication);
// 날짜별 복용 목록 수정 
calendarRouter.put("/medication/:when/:date", calendarController.updateMedication);


// 날짜별 신체 목록 조회 
calendarRouter.get("/physical-record/:date", calendarController.viewPhysicalRecord);
// 날짜별 신체 목록 등록
calendarRouter.post("/physical-record/:date", calendarController.registerPhysicalRecord);
// 날짜별 신체 목록 삭제
calendarRouter.delete("/physical-record/:date", calendarController.deletePhysicalRecord);
// 날짜별 신체 목록 수정
calendarRouter.put("/physical-record/:date", calendarController.updatePhysicalRecord);
module.exports = calendarRouter;