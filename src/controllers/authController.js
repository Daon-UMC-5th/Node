const authService = require("../services/authService.js");
const {response} = require("../config/response.js");
const status = require("../config/responseStatus.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("../config/database.js");
app.use(cookieParser);

const {findEmailCode,updateEmailCode,insertEmailCode} = require("../models/authSQL.js");
const {findSmsCode,updateSmsCode,insertSmsCode} = require("../models/authSQL.js");
module.exports = {
    
    // 사용자 이메일로 인증코드 보내는 controller 
    authorizeByEmail: async(req,res,next) => {

    // 사용자로부터 이메일 받기
    // 이 부분 변경 필요 for 안드로이드
    console.log(`이메일: ${req.body.inputEmail}`);
    let email = req.body.inputEmail;
    
    // 해당 이메일로 인증코드 보내기 
    let result = await authService.sendEmail(email);
        const randomCode= result[1];
        // result에 값이 들어있으면 해당 이메일로 랜덤 인증 번호 전송에 성공
        if(result != undefined){
            const dbConnection = await db.getConnection();
            const [find] = await db.query(findEmailCode, [email]);
            console.log(`이미 사용자가 인증을 보낸 경우를 체크:${find}`);
            if(find[0]!=null){
                const code = await db.query(updateEmailCode, [email, randomCode]);
                console.log(code[0]);
            }else{
                const code = await db.query(insertEmailCode, [email, randomCode]);
                console.log(code[0]);
            }
            // 성공 시, 사용자에게 전송된 인증코드를 일시적으로 저장
           // res.cookie("emailCode", result[1], { httpOnly: true });
           // console.log(req.session.code);

            res.send(response(status.SUCCESS, result[0]));
        }
        else res.send(response(status.BAD_REQUEST,{}));
        
    },

    // 인증코드가 일치하는지 확인하는 controller 
    checkCodeFromEmail: async(req,res,next) => {
        //console.log(req.body.email);
        // 사용자로부터 인증코드 입력 받기
        console.log(`안드에서 받은 body내용: ${req.body}`);
        let inputCode = req.body.inputCode;
        let userEmail = req.body.queryEmail;
        console.log(`사용자 inputCode: ${inputCode}`);
        console.log(`사용자 userEmail: ${userEmail}`);
        // 사용자에게 전송된 인증코드 
        //console.log(req.session.code);
       // let code = await req.cookies.emailCode;
       // console.log(req.cookies);
       const dbConnection = await db.getConnection();
       const [find]= await db.query(findEmailCode, [userEmail]);
       if(find[0]==null) res.send(response(status.SEND_FIRST,{}));
       else{
        const code = find[0].email_code;
        console.log(code);
        console.log(`original code: ${code}`);
        let result = await authService.matchCode(inputCode,code);
       
        // 사용자가 인증코드를 잘못 입력한 경우 (ex. 인증코드가 6자리가 아닌 경우)
        if(result == "wrongInputCode") res.send(response(status.BAD_REQUEST,{}));
        // 인증코드가 서로 일치하는 경우
        else if(result == "correctInputCode"){
           
           // await res.clearCookie('emailCode');
          //  console.log(req.cookies);
            res.send(response(status.SUCCESS,{}));
        }
        // 인증코드가 서로 일치하지 않는 경우
        else if(result=="incorrectInputCode") res.send(response(status.CODE_NOT_MATCH,{}));
       }
      
    },

    authorizeBySMS : async(req,res,next) => {
        
        // 사용자로부터 인증 전화번호 받기
        console.log(`전화번호: ${req.body.inputPhone}`);
        let phone = req.body.inputPhone;

    let result = await authService.sendSms(phone);
    const randomCode= result[1];
    if(result != undefined){
        //res.cookie("smsCode", result[1], { httpOnly: true });
        const dbConnection = await db.getConnection();
        const [find] = await db.query(findSmsCode, [phone]);
        console.log(`이미 사용자가 인증을 보낸 경우를 체크:${find}`);
        if(find[0]!=null){
            const code = await db.query(updateSmsCode, [phone, randomCode]);
            console.log(code[0]);
        }else{
            const code = await db.query(insertSmsCode, [phone, randomCode]);
            console.log(code[0]);
        }
    
      //  console.log(`result[0]: ${result[0]}`);
        res.send(response(status.SUCCESS, result[0]));
    }
    // 해당 번호가 유효한 번호인지는 따로 체크하지 않고, 사용자가 입력한 번호로 인증번호를 전송
    // 만약 인증코드 전송이 실패했다면, 서버 쪽 문제 
    else res.send(response(status.INTERNAL_SERVER_ERROR,{}));
    },
    checkCodeFromSMS: async(req,res,next) => {
        
        // 사용자로부터 인증코드 입력 받기
        console.log(`안드에서 받은 body내용: ${req.body}`);
        let inputCode = req.body.inputCode;
        let userPhone = req.body.queryPhone;
        console.log(`사용자 inputCode: ${inputCode}`);
        console.log(`사용자 userEmail: ${userPhone}`);
       
        
        // 사용자에게 전송된 인증코드
        //console.log(req.session.code);
        //let code = await req.cookies.smsCode;

       // console.log(`session code: ${code}`);
       const dbConnection = await db.getConnection();
       const [find]= await db.query(findSmsCode, [userPhone]);
       if(find[0]==null) res.send(response(status.SEND_FIRST,{}));
       else{
        const code = find[0].sms_code;
        console.log(code);
        console.log(`original code: ${code}`);
        let result = await authService.matchSMSCode(inputCode,code);
    
        // 사용자가 인증코드를 잘못 입력한 경우 (ex. 인증코드가 6자리가 아닌 경우)
        if(result=="wrongInputCode") res.send(response(status.BAD_REQUEST,{}));
        else if(result=="correctInputCode"){
            
            await res.clearCookie('smsCode');
            res.send(response(status.SUCCESS,{}));
        } 
        else if(result=="incorrectInputCode") res.send(response(status.CODE_NOT_MATCH,{}));
    }
}
}