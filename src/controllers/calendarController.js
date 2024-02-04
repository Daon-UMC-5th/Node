const response = require("../config/response.js");
const status = require("../config/responseStatus.js");
const calendarService = require("../services/calendarService.js");

module.exports = {

    // 신체 기록 등록 
    registerPhysicalRecord: async(req,res,next) => {

        // 사용자의 userid 받아옴
        const userId = 1;

        // 사용자가 신체를 기록한 날짜
        const date = req.params.date;
        console.log(date);
        // 사용자로부터 입력받는 정보(body)
        const userInformation = {
            userId : userId,
            date: date,
            temperature : req.body.temperature,
            weight : req.body.weight,
            bloodSugar : req.body.fastingBloodSugar,
            note : req.body.note
        }
   


        // 사용자가 입력한 정보를 데이터베이스에 저장
        const result = await calendarService.insertPhysicalRecord(userInformation);


        if(result=="duplication") res.send(response(status.ARTICLE_DUPLICATION));
        else{
            if(result) res.send(response(status.SUCCESS));
            else res.send(response(status.INTERNAL_SERVER_ERROR));
        }
     

    },
    // 신체 기록 조회 
    viewPhysicalRecord: async(req,res,next) => {

        // 사용자의 userid 받아옴
        const userId = 1;

        // 사용자가 신체기록을 조회하고자 하는 날짜
        const date = req.params.date;
        console.log(date);

        const result = await calendarService.getPhysicalRecord(date,userId);

        // 해당 날짜에 신체 기록이 있는 경우
        if(result) res.send(response(status.SUCCESS, result));
        // 해당 날짜에 신체 기록이 없는 경우
        else if(result==undefined) res.send(response(status.ARTICLE_NOT_FOUND));
        // 서버 에러로 조회 실패
        else res.send(response(status.INTERNAL_SERVER_ERROR));


    },
    // 신체 기록 삭제 
    deletePhysicalRecord: async(req,res,next) => {

        // 사용자의 userid 받아옴
        const userId = 1;

        // 사용자가 신체기록을 삭제하고자 하는 날짜 
        const date = req.params.date;
        console.log(date);

        const result = await calendarService.removePhysicalRecord(date,userId);
        // 서버 에러로 삭제제 실패 
        if(result=="error") res.send(response(stauts.INTERNAL_SERVER_ERROR));
        // 삭제 성공 
        else if(result != undefined) res.send(response(status.SUCCESS));
        // 존재하지 않는 신체기록을 삭제하려는 경우 
        else res.send(response(status.ARTICLE_NOT_FOUND));
    },
    // 신체 기록 수정 
    updatePhysicalRecord: async(req,res,next) => {

        // 사용자의 userid 받아옴
        const userId = 1; 

        // 사용자가 신체기록을 수정하고자 하는 날짜
        const date = req.params.date;
        console.log(date);

        // 사용자로부터 수정된 값을 받아옴
        const modification = {
            userId : userId,
            date: date,
            temperature : req.body.temperature,
            weight : req.body.weight,
            bloodSugar : req.body.fastingBloodSugar,
            note : req.body.note
        }

        const result = await calendarService.modifyPhysicalRecord(date, modification);
        // 서버 에러로 수정 실패
        if(result =="error") res.send(response(status.INTERNAL_SERVER_ERROR));
        // 수정 성공 
        else if(result) res.send(response(status.SUCCESS));
        // 존재하지 않는 신체기록을 수정하려는 경우 
        else res.send(response(status.ARTICLE_NOT_FOUND));
    }
};