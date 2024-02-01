const authService = require("../services/authService.js");
const response = require("../config/response.js");
const status = require("../config/responseStatus.js");

module.exports = {
    authorizeBySMS : async(req,res,next) => {
        
        // 사용자로부터 인증 전화번호 받기
        console.log(`전화번호: ${req.body.inputPhone}`);
        let phone = req.body.inputPhone;

    let result = await authService.sendSms(phone);

    if(result != undefined){
          req.session.code = result[1];
          console.log(req.session.code);
    
      //  console.log(`result[0]: ${result[0]}`);
        res.send(response(status.SUCCESS, result[0]));
    }
    // 해당 번호가 유효한 번호인지는 따로 체크하지 않고, 사용자가 입력한 번호로 인증번호를 전송
    // 만약 인증코드 전송이 실패했다면, 서버 쪽 문제 
    else res.send(response(status.INTERNAL_SERVER_ERROR));
    },
    checkCodeFromSMS: async(req,res,next) => {
        
        // 사용자로부터 인증코드 입력 받기
        let inputCode = req.body.inputCode;

        // 사용자에게 전송된 인증코드
        console.log(req.session.code);
        let code = await req.session.code;

        console.log(`session code: ${code}`);

        let result = await authService.matchSMSCode(inputCode,code);
        
        // 사용자가 인증코드를 잘못 입력한 경우 (ex. 인증코드가 6자리가 아닌 경우)
        if(result=="wrongInputCode") res.send(response(status.BAD_REQUEST));
        else if(result=="correctInputCode") res.send(response(status.SUCCESS));
        else if(result=="incorrectInputCode") res.send(response(status.CODE_NOT_MATCH));
        
    }
}