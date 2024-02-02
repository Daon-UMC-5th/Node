const { privateDiaryData, publicDiaryData } = require('../models/diaryDAO.js')

const privateDiary = async(user) => {
    return await privateDiaryData({
        "user_id" : user
    });
}

const publicDiary = async() => {
    return await publicDiaryData();
}


module.exports = { privateDiary, publicDiary }