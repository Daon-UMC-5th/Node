const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const { writeDiary, modifyDiary, eraseDiary, diaryLikeAdd, diaryLikeSub } = require('../services/diaryService.js')
const { privateDiary, publicDiary, ImageList, OneDiary } = require('../providers/diaryProvider.js');

const getPrivateDiary = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await privateDiary(req.user_id, req.query.offset))); 
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}//param 추가 필요(date)
}
const getPublicDiary = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await publicDiary(req.query.offset))); 
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}
}
const getImage = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await ImageList(req.user_id, req.params.year, req.params.month))); 
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}    
}
const getOneDiary = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await OneDiary(req.user_id, req.params.diaryDate))); // diaryId -> date
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}
}
const postDiary = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await writeDiary(req.params.diaryDate, req.user_id, req.body)));
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}
}
const putDiary = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await modifyDiary(req.params.diaryDate, req.body))); //diaryId -> date
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}
}

const deleteDiary = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await eraseDiary(req.params.diaryDate))); //diaryId -> date
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}
}

const diaryLikeUp = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await diaryLikeAdd(req.params.diaryId, req.user_id)));
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}
}
const diaryLikeDown =async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await diaryLikeSub(req.params.diaryId, req.user_id)));
    }catch (error) {res.send(response(status.ARTICLE_NOT_FOUND,{}))}
}
module.exports = { getPrivateDiary, getPublicDiary, getImage, getOneDiary, postDiary, putDiary, deleteDiary, diaryLikeUp, diaryLikeDown}