//@ 라이브러리 import 
const nodeMailer = require("nodemailer");
//# 

//@ 함수 설정
// length 길이로 랜덤 문자/숫자 조합 생성하는 함수 
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
         text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// 해당 이메일로 랜덤 인증 코드 보내는 함수
const send = async(email,code) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        host: "smtp.google.com",
        port: 3000,
        auth:{
            user: process.env.SENDER,
            pass: process.env.PASSWORD
        }
    });
    var text = `[다온 인증코드] ${code}`;
    console.log(text);

    const option = {
        from: process.env.SENDER,
        to: email,
        subject: "daon",
        text: text 
    };
    const info = await transporter.sendMail(option);
    return info;

}

// 사용자로부터 받은 인증코드의 자릿 수를 확인하는 함수 

const checkLengthOfCode = async(inputCode) => {
    inputCode = inputCode.toString();
    lengthOfInputCode = inputCode.length;
    console.log(lengthOfInputCode);
    return lengthOfInputCode; 
}
//#

//@ export 
module.exports ={
    sendEmail: async(email) => {
      
        if(email){
            // 6자리 인증 코드 생성  
            var code = generateRandomString(6);
            // 사용자 이메일로 인증 코드 전송 
            const result = await send(email,code);
            console.log(result);
            return [result,code];

        }
        else{
            console.log(`Failed to send a email`);
            const result = undefined;
            return result;

        }
    },
    matchCode: async(inputCode,code) => {
       
        // 1-1. 사용자가 인증코드를 형식에 맞게 입력한 경우
        const lengthOfCode = await checkLengthOfCode(inputCode)
        if(lengthOfCode == 6){
          
            // 인증코드가 서로 일치하는 경우
            if(inputCode == code){
                let result = "correctInputCode";
                return result
            }
            // 인증코드가 일치하지 않는 경우
            else{
                let result = "incorrectInputCode";
                return result;
            }
        }
        // 1-2. 사용자가 인증코드를 잘못 입력한 경우 (ex. 인증코드가 6자리가 아닌 경우)
        else{
            let result = "wrongInputCode";
            return result;
        }
        
    }

}
//# 