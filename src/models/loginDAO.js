const db = require("../config/database.js");
const {registerKakaoUserSQL} = require("./loginSQL.js");
const {registerKakaoUserInSocialLoginSQL,registerKakaoProfileSQL, checkKakaoUserSQL} = require("./loginSQL.js");
const {checkGoogleUserSQL, registerGoogleUserSQL, registerGoogleUserInSocialLoginSQL, registerGoogleProfileSQL} = require("./loginSQL.js");
const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const registerKakaoUserinDB = async(info)  => {

    console.log(info);
    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(registerKakaoUserSQL,[info.user_name, info.email, info.phone_number, info.birth_date, info.gender, info.user_nickname, info.role, info.agree]);
        console.log(result[0]);

        return result[0];
    }catch(err){
        res.send(response(status.INTERNAL_SERVER_ERROR,{}));
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
        res.send(response(status.INTERNAL_SERVER_ERROR,{}));
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
        res.send(response(status.INTERNAL_SERVER_ERROR,{}));
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
        res.send(response(status.INTERNAL_SERVER_ERROR,{}));
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
        res.send(response(status.INTERNAL_SERVER_ERROR,{}));
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
        res.send(response(status.INTERNAL_SERVER_ERROR,{}));
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
        res.send(response(status.INTERNAL_SERVER_ERROR,{}));
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

        res.send(response(status.INTERNAL_SERVER_ERROR,{}));
    }

}
module.exports.registerGoogleProfile = registerGoogleProfile;