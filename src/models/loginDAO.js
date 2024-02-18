const db = require("../config/database.js");
const {registerKakaoUserSQL} = require("./loginSQL.js");
const {registerKakaoUserInSocialLoginSQL,registerKakaoProfileSQL, checkKakaoUserSQL} = require("./loginSQL.js");
const {checkGoogleUserSQL, registerGoogleUserSQL, registerGoogleUserInSocialLoginSQL, registerGoogleProfileSQL} = require("./loginSQL.js");
const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const {registerNaverProfileSQL,checkNaverUserSQL,registerNaverUserSQL,registerNaverUserInSocialLoginSQL}= require("./loginSQL.js");
const registerKakaoUserinDB = async(info)  => {

    console.log(info);
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerKakaoUserSQL,[info.user_name, info.email, info.phone_number, info.birth_date, info.gender, info.user_nickname, info.role, info.agree]);
        console.log(result[0]);

        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.registerKakaoUserinDB = registerKakaoUserinDB;

const registerKakaoUserInSocialLogin = async(userId, provider, providerId) =>{
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerKakaoUserInSocialLoginSQL,[userId, provider, providerId]);
        console.log(result[0]);

        return result[0];
    }catch(err){
        return "error";
    }
    

}
module.exports.registerKakaoUserInSocialLogin = registerKakaoUserInSocialLogin;

const registerKakaoProfile = async(userId, profileImg) =>{
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerKakaoProfileSQL, [userId, profileImg]);
        console.log(result[0]);

        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.registerKakaoProfile= registerKakaoProfile;

const checkKakaoUserInDB = async(provider_user_id) =>{

    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(checkKakaoUserSQL, [provider_user_id]);
        console.log(result[0]);

        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.checkKakaoUserInDB = checkKakaoUserInDB;

const checkGoogleUserInDB = async(provider_user_id) =>{

    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(checkGoogleUserSQL, ["google",provider_user_id]);
        console.log(result[0]);

        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.checkGoogleUserInDB = checkGoogleUserInDB;

const registerGoogleUserInDB = async(info) =>{
    console.log(info);
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerGoogleUserSQL,[info.user_name, info.email, info.phone_number, info.birth_date, info.gender, info.user_nickname, info.role, info.agree]);
        console.log(result[0]);

        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.registerGoogleUserInDB= registerGoogleUserInDB;

const registerGoogleUserInSocialLogin = async(userId, provider, providerId) =>{
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerGoogleUserInSocialLoginSQL,[userId, provider, providerId]);
        console.log(result[0]);

        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.registerGoogleUserInSocialLogin = registerGoogleUserInSocialLogin;

const registerGoogleProfile = async(userId, profileImg) =>{
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerGoogleProfileSQL, [userId, profileImg]);
        console.log(result[0]);

        return result[0];
    }catch(err){

        return "error";
    }

}
module.exports.registerGoogleProfile = registerGoogleProfile;

const checkNaverUserInDB = async(provider_user_id) => {
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(checkNaverUserSQL, [provider_user_id]);
        console.log(result[0]);
        dbConnection.release();
        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.checkNaverUserInDB = checkNaverUserInDB;

const registerNaverUserinDB = async(info) =>{
    console.log(info);
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerNaverUserSQL,[info.user_name, info.email, info.phone_number, info.birth_date, info.gender, info.user_nickname, info.role, info.agree]);
        console.log(result[0]);
        dbConnection.release();
        return result[0];
    }catch(err){
        return "error";
    }
    
}
module.exports.registerNaverUserinDB = registerNaverUserinDB;

const registerNaverUserInSocialLogin = async(userId, provider, providerId) => {
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerNaverUserInSocialLoginSQL,[userId, provider, providerId]);
        console.log(result[0]);
        dbConnection.release();
        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.registerNaverUserInSocialLogin = registerNaverUserInSocialLogin;

const registerNaverProfile = async(userId, profileImg) =>{
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerNaverProfileSQL, [userId, profileImg]);
        console.log(result[0]);
        dbConnection.release();
        return result[0];
    }catch(err){
        return "error";
    }
}
module.exports.registerNaverProfile = registerNaverProfile;