const { privateDiaryData, publicDiaryData } = require('../models/diaryDAO.js')

const privateDiary = async(user, query) => {
    return await privateDiaryData({
        "user_id" : user,
        "offset" : query
    });
}

const publicDiary = async(query) => {
    return await publicDiaryData({
        "offset" : query
    });
}


module.exports = { privateDiary, publicDiary }