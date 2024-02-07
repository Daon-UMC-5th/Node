const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const { MyBoard, MyComment, MyScrape, MyPage } = require('../providers/mypageProvider.js');
const Profile = require('../services/mypageService.js')

const getMyBoard= async(req,res) => {
    res.send(response(status.SUCCESS, await MyBoard(req.user_id, req.query.offset)));
}
const getMyComment = async(req,res) => {
    res.send(response(status.SUCCESS, await MyComment(req.user_id, req.query.offset)));
}
const getMyScrape = async(req,res) => {
    res.send(response(status.SUCCESS, await MyScrape(req.user_id, req.query.offset)));
}
const getMyPage = async(req,res) => {
    res.send(response(status.SUCCESS, await MyPage(req.user_id)));
}
const putProfile = async(req,res) => {
    res.send(response(status.SUCCESS, await Profile(req.user_id, req.body)));
}

module.exports = { getMyBoard, getMyComment, getMyScrape, getMyPage, putProfile };