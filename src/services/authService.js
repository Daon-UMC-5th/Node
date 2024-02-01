// 문자 인증코드 전송
const path = require("path");
const dotenv = require("dotenv");
const coolsms = require('coolsms-node-sdk').default;
const { text } = require("express");

dotenv.config({ path: path.join(__dirname, './config.env') });

const messageService = new coolsms(process.env.COOLSMS_API_KEY, process.env.COOLSMS_API_SECRET);

// 랜덤 숫자 6자리 생성 함수 
const generateRandomNumber = function(length){
    let number='';
    const possible = "0123456789";

    for(let i=0;i<length;i++){
        number += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return number;
}

// 사용자로부터 받은 인증코드 자릿 수 확인 함수
const checkLengthOfCode = async(inputCode) => {
    inputCode = inputCode.toString();
    const lengthOfInputCode = inputCode.length;
    console.log(lengthOfInputCode);
    return lengthOfInputCode;
}


module.exports = {
    // 랜덤 인증코드 문자 전송 
    sendSms : async(phone) => {

        //랜덤 숫자 6자리 생성 함수 호출 
        const code = generateRandomNumber(6);
        const text = `[다온 인증코드] ${code}`;
    
        const result = await messageService.sendOne({
            to: phone,
            from: process.env.SENDER_PHONE,
            text: text
        });
        console.log(result);
        // 문자가 정상적으로 전송된 경우
        if(result) return [result,code];
        // 문자가 정상적으로 전송되지 않은 경우
        else{
            return undefined;
        }
    
    },
    matchSMSCode: async(inputCode,code)=> {

        const lengthOfCode = await checkLengthOfCode(inputCode)
        if(lengthOfCode == 6){
            // 인증코드가 서로 일치하는 경우
            if(inputCode == code){
                let result = "correctInputCode";
                return result;  
            }
            else{
                let result = "incorrectInputCode";
                return result;
            }
        }
        else{
            let result = "wrongInputCode";
            return result;
        }
    }

}