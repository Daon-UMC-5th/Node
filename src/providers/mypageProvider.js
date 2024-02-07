const { MyBoardData, MyCommentData, MyScrapeData, MyPageData } = require('../models/mypageDAO.js');
const { boardDTO, boardCommentDTO } = require('../dtos/boardDTO.js');

const MyBoard = async(user, offset) => {
    myboard = await MyBoardData({
        "user_id" : user,
        "offset" : offset
    });
    if (myboard == -1){
        throw console.log('error');
    }else{
        return await boardDTO(myboard);
}}

const MyComment = async(user, offset) => {
    mycomment = await MyCommentData({
        "user_id" : user,
        "offset" : offset
    });
    if (mycomment == -1){
        throw console.log('error');
    }else{
        return await boardDTO(mycomment);
}}

const MyScrape = async(user, offset) => {
    myscrape = await MyScrapeData({
        "user_id" : user,
        "offset" : offset
    });
    if (myscrape == -1){
        throw console.log('error');
    }else{
        return await boardDTO(myscrape);
}};

const MyPage = async(user) => {
    return await MyPageData({
        "user_id" : user
    });
}


module.exports = { MyBoard, MyComment, MyScrape, MyPage }