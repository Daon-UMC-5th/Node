const {writeDiaryData, modifyDiaryData, eraseDiaryData, addLikeData, subLikeData, countDiaryLike } = require('../models/diaryDAO.js');
const response = require('../config/response.js');
const status = require('../config/responseStatus.js');

const writeDiary = async(param, user, body) => {
    try{
    return await writeDiaryData({
        "diary_date" : param,
        "user_id" : user,
        "is_private" : body.is_private,
        "title" : body.title,
	    "content" : body.content,  
    });}catch (error) { throw error;}
};

const modifyDiary = async(param, body) => {
    try{
    return await modifyDiaryData({
        "diary_date" : param,
        "is_private" : body.is_private,
        "title" : body.title,
	    "content" : body.content,  
    });}catch (error) { throw error;}
};

const eraseDiary = async(param) => {
    try{
    return await eraseDiaryData({
        "diary_date" : param
    });}catch (error) { throw error;}
};

const diaryLikeAdd = async(param, user) => { 
    try{
    likeAddData = await addLikeData({
        "diary_id" : param,
        "user_id" : user
    });
        if (likeAddData == -1){throw response(status.INTERNAL_SERVER_ERROR,{});}
        else{return await countDiaryLike(likeAddData);}
    }catch (error) { throw error;}
}

const diaryLikeSub = async(param, user) => { 
    try{
    likeSubData = await subLikeData({
        "diary_id" : param,
        "user_id" : user
    });
        if (likeSubData == -1){throw response(status.INTERNAL_SERVER_ERROR,{});}
        else{return await countDiaryLike(likeSubData);}
    }catch (error) { throw error;}
}

module.exports = { writeDiary, modifyDiary, eraseDiary, diaryLikeAdd, diaryLikeSub }