const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const  loginService= require("../services/loginService.js");
// cookie
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// cookie-parser 미들웨어를 사용
app.use(cookieParser());

module.exports={
    kakaoSignup: async(req,res,profile) => {
       
        const result = await loginService.registerKakaoUser(profile);
        
      
        if(result.affectedRows == 1) res.send(response(status.SUCCESS,{}));
        else res.send(response(status.INTERNAL_SERVER_ERROR,{}));

    },
    kakaoLogin: async(req,res,next,profile) => {

        // 이미 가입된 사용자인지를 체크 후 jwt 토큰 반환
        const token =await loginService.checkKakaoUser(profile);
        if(token=="error") res.send(response(status.INTERNAL_SERVER_ERROR,{}));
      //  console.log(token);
      res.cookie("accessToken", token, { httpOnly: true });
      console.log("token::", token);
      console.log("cookie:", req.cookies);
      return res.send(response(status.SUCCESS, token));
      
    },
    googleLogin: async(req,res,next,profile) =>{

        const token = await loginService.checkGoogleUser(profile);
         //  console.log(token);
         if(token=="error") res.send(response(status.INTERNAL_SERVER_ERROR,{}));
        res.cookie("accessToken", token, { httpOnly: true });
        console.log("token::", token);
        console.log("cookie:", req.cookies);
        return res.send(response(status.SUCCESS, token));
      
    },
    naverLogin: async(req,res,next,profile) => {
        const token = await loginService.checkNaverUser(profile);
        if(token=="error") res.send(response(status.INTERNAL_SERVER_ERROR,{}));
        res.cookie("accessToken", token, { httpOnly: true });
        console.log("token::", token);
        console.log("cookie:", req.cookies);
        return res.send(response(status.SUCCESS, token));
    }
}