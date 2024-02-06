const response = require("../config/response.js");
const status = require("../config/responseStatus.js");
const calendarService = require("../services/calendarService.js");

module.exports = {
    
    
    // 신체
    // 신체 기록 등록 
    registerPhysicalRecord: async(req,res,next) => {

        // 사용자의 userid 받아옴
        const userId = 3;

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
        const userId = 3;

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
        const userId = 3;

        // 사용자가 신체기록을 삭제하고자 하는 날짜 
        const date = req.params.date;
        console.log(date);

        const result = await calendarService.removePhysicalRecord(date,userId);
        // 서버 에러로 삭제 실패 
        if(result=="error") res.send(response(status.INTERNAL_SERVER_ERROR));
        // 삭제 성공 
        else if(result != undefined) res.send(response(status.SUCCESS));
        // 존재하지 않는 신체기록을 삭제하려는 경우 
        else res.send(response(status.ARTICLE_NOT_FOUND));
    },
    // 신체 기록 수정 
    updatePhysicalRecord: async(req,res,next) => {

        // 사용자의 userid 받아옴
        const userId = 3; 

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
    },




    // 진료 
    // 날짜별 진료목록 삽입
    registerConsultation: async(req,res,next) => {
          // 사용자의 userid 받아옴
          const userId = 3;

          // 사용자가 신체를 기록한 날짜
          const date = req.params.date;
          console.log(date);

          const userInformation = {
               userId: userId,
               date: date,
               hospital: req.body.hospital,
               content: req.body.content,
               alarmed_at: req.body.alarmed_at,
          };
          //console.log(userInformation.alarmed_at);
          const result = await calendarService.insertConsultation(userInformation);
        
          if(result=="duplication") res.send(response(status.ARTICLE_DUPLICATION));
          else{
              if(result) res.send(response(status.SUCCESS));
              else res.send(response(status.INTERNAL_SERVER_ERROR));
          }


    },
    // 날짜별 진료목록 조회
    viewConsultation: async(req,res,next) => {

           // 사용자의 userid 받아옴
           const userId = 3;

           // 사용자가 진료를 기록한 날짜
           const date = req.params.date;
           console.log(date);

           const result = await calendarService.getConsultation(date, userId);

        // 해당 날짜에 진료 기록이 있는 경우
        if(result) res.send(response(status.SUCCESS, result));
        // 해당 날짜에 진료 기록이 없는 경우
        else if(result==undefined) res.send(response(status.ARTICLE_NOT_FOUND));
        // 서버 에러로 조회 실패
        else res.send(response(status.INTERNAL_SERVER_ERROR));


           
    },
    // 날짜별 진료목록 삭제 
    deleteConsultation: async(req,res,next) => {

        // 사용자의 userid 받아옴
        const userId = 3;

        
        // 사용자가 진료를 기록한 날짜
        const date = req.params.date;
        console.log(date);

        const result = await calendarService.removeConsultation(date, userId);

        // 서버 에러로 삭제 실패 
        if(result=="error") res.send(response(status.INTERNAL_SERVER_ERROR));
        // 삭제 성공 
        else if(result != undefined) res.send(response(status.SUCCESS));
        // 존재하지 않는 신체기록을 삭제하려는 경우 
        else res.send(response(status.ARTICLE_NOT_FOUND));
        
    },
    // 날짜별 진료목록 수정 
    updateConsultation : async(req,res,next) => {
        
        // 사용자의 userid 받아옴
        const userId =3;

        // 사용자가 진료기록을 수정하고자 하는 날짜
        const date = req.params.date;
        console.log(date);
        
        // 사용자로부터 수정된 값을 받아옴
        const modification = {
            userId : userId,
            hospital: req.body.hospital,
            content: req.body.content,
            alarmed_date: date,
            alarmed_at: req.body.alarmed_at
        };
        const result = await calendarService.modifyConsultation(date,modification);

        // 서버 에러로 수정 실패
        if(result =="error") res.send(response(status.INTERNAL_SERVER_ERROR));
        // 수정 성공 
        else if(result) res.send(response(status.SUCCESS));
        // 존재하지 않는 신체기록을 수정하려는 경우 
        else res.send(response(status.ARTICLE_NOT_FOUND));
    },

    // 날짜별 복용목록 모두 조회 
    viewAllMedication: async(req,res,next) => {
        // 사용자의 userid 받아옴
        const userId = 3;

        // 아침, 점심, 저녁
        const date = req.params.date;

        const result = await calendarService.getAllMedication(date,userId);

        console.log(result);

          // 서버 에러로 조회 실패
          if(result == "error") res.send(response(status.INTERNAL_SERVER_ERROR));
          // 해당 날짜에 복용 기록이 없는 경우
          else if(result==undefined) res.send(response(status.ARTICLE_NOT_FOUND));
          // 해당 날짜에 복용 기록이 있는 경우
          else res.send(response(status.SUCCESS, result));
    },

    // 복용
    // 날짜별 복용목록 아침/점심/저녁 별 조회
    viewMedication: async(req,res,next) => {

        // 사용자의 userid 받아옴
        const userId = 3;

        //아침, 점심, 저녁
        const when = req.params.when;
        // 사용자가 복용기록을 조회하고자 하는 날짜
        const date = req.params.date;
        
        const result = await calendarService.getMedication(when,date,userId);
        
        console.log(result);
        // 서버 에러로 조회 실패
        if(result == "error") res.send(response(status.INTERNAL_SERVER_ERROR));
        // 해당 날짜에 복용 기록이 없는 경우
        else if(result==undefined) res.send(response(status.ARTICLE_NOT_FOUND));
        // 해당 날짜에 복용 기록이 있는 경우
        else res.send(response(status.SUCCESS, result));
        
    },
    
    // 날짜별 복용목록 삽입 
    registerMedication: async(req,res,next) => {

    // 사용자의 userid 받아옴
    const userId = 3;

    //아침, 점심, 저녁
     const when = req.params.when;
     // 사용자가 복용기록을 조회하고자 하는 날짜
    const date = req.params.date;

    //repeat_status 판단
    let isRepeat;
    if(req.body.alarm_days) isRepeat = true;
    else isRepeat = false;
    
    const userInformation = {
        userId: userId,
        alarmed_date: date,
        time_of_day: when,
        medicine: req.body.medicine,
        alarmed_at: req.body.alarmed_at,
        alarm_days: req.body.alarm_days,
        repeat_status: isRepeat
    };

    const result = await calendarService.insertMedication(userInformation);

    
    if(result=="duplication") res.send(response(status.ARTICLE_DUPLICATION));
    else{
        if(result) res.send(response(status.SUCCESS));
        else res.send(response(status.INTERNAL_SERVER_ERROR));
    }
    },
    
    //날짜별 복용목록 삭제
    deleteMedication: async(req,res,next) => {
        
        // 사용자의 userid 받아옴
        const userId = 3;

        // 사용자가 신체기록을 삭제하고자 하는 부분과 날짜
        const  when = req.params.when;
        const date = req.params.date;

        const result = await calendarService.removeMedication(date,when,userId);


        // 서버 에러로 삭제 실패 
         if(result=="error") res.send(response(status.INTERNAL_SERVER_ERROR));
        // 삭제 성공 
         else if(result != undefined) res.send(response(status.SUCCESS));
        // 존재하지 않는 신체기록을 삭제하려는 경우 
         else res.send(response(status.ARTICLE_NOT_FOUND));
  


    },
    //날짜별 복용목록 수정 
    updateMedication: async(req,res,next) => {
     
        // 사용자의 userid 받아옴
        const userId = 3;

        // 사용자가 신체기록을 수정하고자 하는 부분과 날짜
        const when = req.params.when;
        const date = req.params.date;

        //repeat_status 판단
        let isRepeat;
        if(req.body.alarm_days) isRepeat = true;
        else isRepeat = false;
    
    const userInformation = {
        userId: userId,
        alarmed_date: date,
        time_of_day: when,
        medicine: req.body.medicine,
        alarmed_at: req.body.alarmed_at,
        alarm_days: req.body.alarm_days,
        repeat_status: isRepeat
    };
        const result = await calendarService.modifyMedication(userInformation);

        // 서버 에러로 수정 실패
        if(result =="error") res.send(response(status.INTERNAL_SERVER_ERROR));
        // 수정 성공 
        else if(result) res.send(response(status.SUCCESS));
        // 존재하지 않는 복용기록을 수정하려는 경우 
        else res.send(response(status.ARTICLE_NOT_FOUND));
        
    }

};