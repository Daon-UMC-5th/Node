const authService = require("../services/authService.js");
const response = require("../config/response.js");
const status = require("../config/responseStatus.js");

module.exports = {
    
    // 사용자 이메일로 인증코드 보내는 controller 
    authorizeByEmail: async(req,res,next) => {

    // 사용자로부터 이메일 받기
    // 이 부분 변경 필요 for 안드로이드
    console.log(`이메일: ${req.body.inputEmail}`);
    let email = req.body.inputEmail;
    
    // 해당 이메일로 인증코드 보내기 
    let result = await authService.sendEmail(email);
        
        // result에 값이 들어있으면 해당 이메일로 랜덤 인증 번호 전송에 성공
        if(result != undefined){
            // 성공 시, 사용자에게 전송된 인증코드를 일시적으로 저장
            req.session.code = result[1];
           // console.log(req.session.code);
            res.send(response(status.SUCCESS, result[0]));
        }
        else res.send(response(status.BAD_REQUEST));
        
    },

    // 인증코드가 일치하는지 확인하는 controller 
    checkCodeFromEmail: async(req,res,next) => {

        // 사용자로부터 인증코드 입력 받기
        let inputCode = req.body.inputCode;

        // 사용자에게 전송된 인증코드 
        //console.log(req.session.code);
        let code = await req.session.code;
        //console.log(`original code: ${code}`);
        let result = await authService.matchCode(inputCode,code);

        // 사용자가 인증코드를 잘못 입력한 경우 (ex. 인증코드가 6자리가 아닌 경우)
        if(result == "wrongInputCode") res.send(response(status.BAD_REQUEST));
        // 인증코드가 서로 일치하는 경우
        else if(result == "correctInputCode") res.send(response(status.SUCCESS));
        // 인증코드가 서로 일치하지 않는 경우
        else if(result == "incorrectInputCode") res.send(response(status.CODE_NOT_MATCH));
    }
}