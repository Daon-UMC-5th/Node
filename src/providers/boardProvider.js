const { getBoardData, getOneBoardData, countLikeData, allLikeData, allCommentData } = require('../models/boardDAO.js')

//게시판 가져오기
const getBoardType = async(param) => {
    return await getBoardData({
        "board_type" : param
    });
}
const getBoardId = async(param, user) => {
    return await getOneBoardData({
        "board_id" : param,
        "user_id" : user
    });
}

//좋아요 수 가져오기
const countLike = async(param) => {
    return await countLikeData(param)
}

const countAllLike = async() => {
    return await allLikeData({})
}

//댓글 가져오기
const getAllComment = async(param) => {
    return await allCommentData({
        "board_id" : param
    });
}
module.exports = {getBoardType, getBoardId, countLike, countAllLike, getAllComment};