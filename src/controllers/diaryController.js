const response = require('../config/response.js');
const status = require('../config/responseStatus.js');
const { writeDiary, modifyDiary, eraseDiary, diaryLikeAdd, diaryLikeSub } = require('../services/diaryService.js')
const { privateDiary, publicDiary, OneDiary } = require('../providers/diaryProvider.js');

const getPrivateDiary = async(req,res) => {
    res.send(response(status.SUCCESS, await privateDiary(req.user_id, req.query.offset))); 
}
const getPublicDiary = async(req,res) => {
    res.send(response(status.SUCCESS, await publicDiary(req.query.offset))); 
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
module.exports = { getPrivateDiary, getPublicDiary, getOneDiary, postDiary, putDiary, deleteDiary, diaryLikeUp, diaryLikeDown}