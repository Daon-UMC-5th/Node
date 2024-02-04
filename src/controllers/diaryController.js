const response = require('../config/response.js');
const status = require('../config/responseStatus.js');
const { writeDiary, modifyDiary, eraseDiary, diaryLikeAdd, diaryLikeSub } = require('../services/diaryService.js')
const { privateDiary, publicDiary } = require('../providers/diaryProvider.js');

const getPrivateDiary = async(req,res) => {
    res.send(response(status.SUCCESS, await privateDiary(req.user_id, req.query.offset)));
}
const getPublicDiary = async(req,res) => {
    res.send(response(status.SUCCESS, await publicDiary(req.query.offset)));
}
const postDiary = async(req,res) => {
    res.send(response(status.SUCCESS, await writeDiary(req.user_id, req.body)));
}
const putDiary = async(req,res) => {
    res.send(response(status.SUCCESS, await modifyDiary(req.params.diaryId, req.body)));
}
const deleteDiary = async(req,res) => {
    res.send(response(status.SUCCESS, await eraseDiary(req.params.diaryId)));
}
const diaryLikeUp = async(req,res) => {
    res.send(response(status.SUCCESS, await diaryLikeAdd(req.params.diaryId, req.user_id)));
}
const diaryLikeDown =async(req,res) => {
    res.send(response(status.SUCCESS, await diaryLikeSub(req.params.diaryId, req.user_id)));
}
module.exports = { getPrivateDiary, getPublicDiary, postDiary, putDiary, deleteDiary, diaryLikeUp, diaryLikeDown}