const { profileData } = require('../models/mypageDAO.js')
const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');


const Profile = async(user, body) => {
    try{
    returnProfile = await profileData({
        "user_id" : user,
        "user_nickname": body.user_nickname,
        "introduction": body.introduction
    }); 
    if (returnProfile == -1){throw response(status.INTERNAL_SERVER_ERROR,{});}
    else{return {}}

}catch (error) { throw error;}

};

module.exports = Profile;