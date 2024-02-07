const { profileData } = require('../models/mypageDAO.js')

const Profile = async(user, body) => {
    await profileData({
        "user_id" : user,
        "user_nickname": body.user_nickname,
        "introduction": body.introduction
    }); 
};

module.exports = Profile;