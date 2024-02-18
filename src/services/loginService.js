const {registerKakaoUserinDB} = require("../models/loginDAO.js");
const {registerKakaoUserInSocialLogin, registerKakaoProfile} = require("../models/loginDAO.js");
const {checkKakaoUserInDB}=require("../models/loginDAO.js");
const {checkGoogleUserInDB, registerGoogleUserInDB,registerGoogleUserInSocialLogin, registerGoogleProfile} = require("../models/loginDAO.js");
const jwt = require("jsonwebtoken");
const {checkNaverUserInDB,registerNaverUserinDB,registerNaverUserInSocialLogin,registerNaverProfile} = require("../models/loginDAO.js");

const dotenv = require("dotenv");
// const path = require("path");

// 루트에서 환경변수 불러옴
dotenv.config({ path: "./config.env" });
const jwtsecret = process.env.JWT_SECRET;

module.exports = {
    registerKakaoUser : async(profile) => {
        const user = {
            user_name: profile.displayName,
            email: profile.id,
            phone_number: "000-0000-0000",
            birth_date: "2000-01-01",
            gender: 1,
            user_nickname: profile._json.properties.nickname,
            role: "user",
            agree: 0
        }
        // 사용자 등록 
        const result1 = await registerKakaoUserinDB(user);
    //    console.log(result.insertId);
        
    // 등록된 user_id
        const userId = result1.insertId;
        
        // socal_login 테이블에 등록
        const result2 = await registerKakaoUserInSocialLogin(ruserId,"kakao",profile.id);       
       // console.log(result2);
    
       // 사용자 프로필 등록
        const profile_image = profile._json.properties.profile_image;
        const result3 = await registerKakaoProfile(userId, profile_image);
        
    },
    checkKakaoUser: async(profile) =>{

        const provider_user_id = profile.id;

        console.log(provider_user_id);

        const result = await checkKakaoUserInDB(provider_user_id);

       // console.log(result[0].user_id);
        let userId; 
        if(result.length!=0) userId= result[0].user_id;
        else userId = undefined;
        if(userId){
            // jwt 토큰 발급
            console.log("이미 가입된 kakao user");
        }else{
            const user = {
                user_name: profile.displayName,
                email: profile.id,
                phone_number: "000-0000-0000",
                birth_date: "2000-01-01",
                gender: 1,
                user_nickname: profile._json.properties.nickname,
                role: "user",
                agree: 0
            }
            // 사용자 등록 
            const result1 = await registerKakaoUserinDB(user);
        //    console.log(result.insertId);
            if(result1 =="error") {
              console.log("kakao 사용자 등록 에러");
              return "error";
            }
        // 등록된 user_id
            const userId = result1.insertId;
            
            // socal_login 테이블에 등록
            const result2 = await registerKakaoUserInSocialLogin(userId,"kakao",profile.id);       
           // console.log(result2);
            if(result2 == "error") {
              console.log("kakao 사용자 socal_login 테이블 등록 에러");
              return "error";
            }
           // 사용자 프로필 등록
            const profile_image = profile._json.properties.profile_image;
          
            const result3 = await registerKakaoProfile(userId, profile_image);
            if(result3 == "error"){
              console.log("사용자 프로필 테이블 등록 에러");
              return "error";
            }
        }

        // jwt 토큰 발급
      
            try {
              //토큰 생성 Service
              let token = await jwt.sign(
                {
                  user_id: userId,
                }, // 토큰의 내용(payload)
                jwtsecret, // 비밀키
                {
                  expiresIn: "1d",
                  subject: "userInfo",
                } // 유효 기간 365일
              );
        
              console.log("jwt:", token);
              return token;
            } catch (error) {
              throw error;
            }
          
        
    },
    checkGoogleUser: async(profile) => {
        const provider_user_id = profile.id;
        console.log(provider_user_id);
        const result = await checkGoogleUserInDB(provider_user_id);
        console.log(result);
     

        if(result.length!=0) userId= result[0].user_id;
        else userId = undefined;
        if(userId){
            // jwt 토큰 발급
            console.log("이미 가입된 google user");
        }else{
            const user = {
                user_name: profile.displayName,
                email: profile.email,
                phone_number: "000-0000-0000",
                birth_date: "2000-01-01",
                gender: 1,
                user_nickname: profile.displayName,
                role: "user",
                agree: 0
            }
            // 사용자 등록 
            const result1 = await registerGoogleUserInDB(user);
        //    console.log(result.insertId);
            
        // 등록된 user_id
            const userId = result1.insertId;
            
            // socal_login 테이블에 등록
            const result2 = await registerGoogleUserInSocialLogin(userId,"google",profile.id);       
           // console.log(result2);
        
           // 사용자 프로필 등록
            const profile_image = profile.picture;
            const result3 = await registerGoogleProfile(userId, profile_image);
        }

        // jwt 토큰 발급
      
            try {
              //토큰 생성 Service
              let token = await jwt.sign(
                {
                  user_id: userId,
                }, // 토큰의 내용(payload)
                jwtsecret, // 비밀키
                {
                  expiresIn: "1d",
                  subject: "userInfo",
                } // 유효 기간 365일
              );
        
              console.log("jwt:", token);
              return token;
            } catch (error) {
              throw error;
            }

    },
    checkNaverUser: async(profile) =>{
      const provider_user_id = profile.id;

        console.log(provider_user_id);
        console.log(profile._json.email);
        const result = await checkNaverUserInDB(provider_user_id);

       // console.log(result[0].user_id);
        let userId; 
        if(result!=null) userId= result[0].user_id;
        else userId = undefined;
        if(userId){
            // jwt 토큰 발급
            console.log("이미 가입된 naver user");
        }else{
            const user = {
                user_name: profile.displayName,
                email: profile._json.email,
                phone_number: "000-0000-0000",
                birth_date: "2000-01-01",
                gender: 1,
                user_nickname: profile._json.nickname,
                role: "user",
                agree: 0
            }
            // 사용자 등록 
            const result1 = await registerNaverUserinDB(user);
            if(result1 == "error") {
              console.log("naver 사용자 등록 에러");
              return "error";
            }
        //    console.log(result.insertId);
            
        // 등록된 user_id
            const userId = result1.insertId;
            console.log(userId);
            console.log(profile.id);
            // socal_login 테이블에 등록
            const result2 = await registerNaverUserInSocialLogin(userId,"naver",profile.id);       
            console.log(result2);
            if(result2 == "error"){
              console.log("naver 사용자 socal_login 등록 에러");
              return "error"
            }
           // 사용자 프로필 등록
            const profile_image = profile._json.profile_image;
            console.log(profile_image);
            const result3 = await registerNaverProfile(userId, profile_image);
            if(result3=="error"){
              console.log("naver 사용자 프로필 등록 에러");
              return "error";
            } 
        }

        // jwt 토큰 발급
      
            try {
              //토큰 생성 Service
              let token = await jwt.sign(
                {
                  user_id: userId,
                }, // 토큰의 내용(payload)
                jwtsecret, // 비밀키
                {
                  expiresIn: "1d",
                  subject: "userInfo",
                } // 유효 기간 365일
              );
        
              console.log("jwt:", token);
              return token;
            } catch (error) {
              throw error;
            }
          
        
    }
    
}