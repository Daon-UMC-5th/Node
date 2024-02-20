const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const { MyBoard, MyComment, MyScrape, MyPage } = require('../providers/mypageProvider.js');
const Profile = require('../services/mypageService.js')

const getMyBoard= async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await MyBoard(req.user_id, req.query.offset)));
    }catch (error) {res.send(response(status.INTERNAL_SERVER_ERROR,{}))}
}
const getMyComment = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await MyComment(req.user_id, req.query.offset)));
    }catch (error) {res.send(response(status.INTERNAL_SERVER_ERROR,{}))}
}
const getMyScrape = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await MyScrape(req.user_id, req.query.offset)));
    }catch (error) {res.send(response(status.INTERNAL_SERVER_ERROR,{}))}
}
const getMyPage = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await MyPage(req.user_id)));
    }catch (error) {res.send(response(status.INTERNAL_SERVER_ERROR,{}))}
}
const putProfile = async(req,res) => {
    try{
    res.send(response(status.SUCCESS, await Profile(req.user_id, req.body)));
    }catch (error) {res.send(response(status.INTERNAL_SERVER_ERROR,{}))}
}

module.exports = { getMyBoard, getMyComment, getMyScrape, getMyPage, putProfile };