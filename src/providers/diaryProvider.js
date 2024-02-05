const { diaryDTO, oneDiaryDTO } = require('../dtos/diaryDTO.js');
const { privateDiaryData, publicDiaryData, oneDiaryData } = require('../models/diaryDAO.js')
const response = require('../config/response.js');
const status = require('../config/responseStatus.js');

const privateDiary = async(user, query) => {
    resultprivateDiary = await privateDiaryData({
        "user_id" : user,
        "offset" : query
    });
    if (resultprivateDiary == -1){
        throw console.log('error');
    }else{
        return await diaryDTO(resultprivateDiary);
}}

const publicDiary = async(query) => {
    resultpublicDiary = await publicDiaryData({
        "offset" : query
    });
    if (resultpublicDiary == -1){
        throw console.log('error');
    }else{
        return await diaryDTO(resultpublicDiary);
}
}

const OneDiary = async(user, param) => {
    try{
    resultOneDiary = await oneDiaryData({
        "user_id" : user,
        "diary_id" : param
    });
        if (resultOneDiary == -1){throw console.log('error');}
        else{return await oneDiaryDTO(resultOneDiary);}
    }catch (error) { throw error;}
}

module.exports = { privateDiary, publicDiary, OneDiary }