const { diaryDTO, oneDiaryDTO, imageDTO } = require('../dtos/diaryDTO.js');
const { privateDiaryData, publicDiaryData, ImageListData, oneDiaryData } = require('../models/diaryDAO.js')
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
const ImageList = async(user, year, month) => {
    try{
    resultImageList = await ImageListData({
        "user_id" : user,
        "diary_year" : year,
        "diary_month" : month
    });
        if (resultImageList == -1){throw console.log('error');}
        else{return await imageDTO(resultImageList);}
    }catch (error) { throw error;}
}

const OneDiary = async(user, param) => {
    try{
    resultOneDiary = await oneDiaryData({
        "user_id" : user,
        "diary_date" : param
    });
        if (resultOneDiary == -1){throw console.log('error');}
        else{return await oneDiaryDTO(resultOneDiary);}
    }catch (error) { throw error;}
}

module.exports = { privateDiary, publicDiary, ImageList, OneDiary }