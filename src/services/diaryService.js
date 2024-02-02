const {writeDiaryData, modifyDiaryData, eraseDiaryData, addLikeData, subLikeData, countDiaryLike } = require('../models/diaryDAO.js');
const response = require('../config/response.js');
const status = require('../config/responseStatus.js');

const writeDiary = async(user, body) => {
    return await writeDiaryData({
        "user_id" : user,
        "is_private" : body.is_private,
        "title" : body.title,
	    "content" : body.content,  
    }); 
};

const modifyDiary = async(param, body) => {
    return await modifyDiaryData({
        "diary_id" : param.diaryId,
        "is_private" : body.is_private,
        "title" : body.title,
	    "content" : body.content,  
    }); 
};

const eraseDiary = async(param) => {
    return await eraseDiaryData({
        "diary_id" : param
    }); 
};

const diaryLikeAdd = async(param, user) => { 
    likeAddData = await addLikeData({
        "diary_id" : param,
        "user_id" : user
    });
    if (likeAddData == -1){
        throw response(status.INTERNAL_SERVER_ERROR);
    }else{
        return await countDiaryLike(likeAddData);
    }
}

const diaryLikeSub = async(param, user) => { 
    likeSubData = await subLikeData({
        "diary_id" : param,
        "user_id" : user
    });
    if (likeSubData == -1){
        throw response(status.INTERNAL_SERVER_ERROR);
    }else{
        return await countDiaryLike(likeSubData);
    }
}

module.exports = { writeDiary, modifyDiary, eraseDiary, diaryLikeAdd, diaryLikeSub }