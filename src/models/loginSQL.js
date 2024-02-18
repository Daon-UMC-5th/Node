const registerKakaoUserSQL = "insert into user (user_name,email,phone_number,birth_date,gender,user_nickname,role,agree,created_at,updated_at) values (?,?,?,?,?,?,?,?,NOW(),NOW())";
module.exports.registerKakaoUserSQL = registerKakaoUserSQL;

const getUserIdSQL = "select user_id from user where email=?";
module.exports.getUserIdSQL = getUserIdSQL;

const registerKakaoUserInSocialLoginSQL = "insert into social_login(user_id, provider, provider_user_id) values (?,?,?);"
module.exports.registerKakaoUserInSocialLoginSQL = registerKakaoUserInSocialLoginSQL;

const registerKakaoProfileSQL = "insert into image_profile(user_id, image_url) values(?,?);"
module.exports.registerKakaoProfileSQL = registerKakaoProfileSQL;

const checkKakaoUserSQL = "select user_id from social_login where provider_user_id=?";
module.exports.checkKakaoUserSQL = checkKakaoUserSQL;

const checkGoogleUserSQL = "select user_id from social_login where provider=? and provider_user_id=?";
module.exports.checkGoogleUserSQL = checkGoogleUserSQL;

const registerGoogleUserSQL = "insert into user (user_name,email,phone_number,birth_date,gender,user_nickname,role,agree,created_at,updated_at) values (?,?,?,?,?,?,?,?,NOW(),NOW())";
module.exports.registerGoogleUserSQL = registerGoogleUserSQL;


const registerGoogleUserInSocialLoginSQL = "insert into social_login(user_id, provider, provider_user_id) values (?,?,?);"
module.exports.registerGoogleUserInSocialLoginSQL = registerGoogleUserInSocialLoginSQL;

const registerGoogleProfileSQL = "insert into image_profile(user_id, image_url) values(?,?);"
module.exports.registerGoogleProfileSQL = registerGoogleProfileSQL;


const checkNaverUserSQL = "select user_id from social_login where provider=? and provider_user_id=?"
module.exports.checkNaverUserSQL = checkNaverUserSQL;

const registerNaverUserSQL= "insert into user (user_name,email,phone_number,birth_date,gender,user_nickname,role,agree,created_at,updated_at) values (?,?,?,?,?,?,?,?,NOW(),NOW());"
module.exports.registerNaverUserSQL = registerNaverUserSQL;

const registerNaverUserInSocialLoginSQL = "insert into social_login(user_id, provider, provider_user_id) values (?,?,?);"
module.exports.registerNaverUserInSocialLoginSQL = registerNaverUserInSocialLoginSQL;

const registerNaverProfileSQL= "insert into image_profile(user_id, image_url) values(?,?);"
module.exports.registerNaverProfileSQL= registerNaverProfileSQL;