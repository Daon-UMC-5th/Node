const response = require('../config/response.js');
const status = require('../config/responseStatus.js');
const { getBoardType, getBoardId, countLike, countAllLike, getAllComment} = require('../providers/boardProvider.js');
const { writeBoard, modifyBoard, eraseBoard, postLikeUp, deleteLike, addScrape, subScrape, writeComment, modifyComment, eraseComment } = require('../services/boardService.js')


//게시판
const getBoard = async(req,res) => {
    const boardTypeData = await getBoardType(req.params.boardType);
    res.send(response(status.SUCCESS, boardTypeData));
}
const getOneBoard = async(req, res) => {
    const boardIdData = await getBoardId(req.params.boardId, req.user_id);
    res.send(response(status.SUCCESS, boardIdData));
}
const postBoard = async(req,res) => {
    res.send(response(status.SUCCESS, await writeBoard(req.params.boardType, req.body, req.user_id) ))
}
const putBoard = async(req,res) => {
    res.send(response(status.SUCCESS, await modifyBoard(req.params.boardId, req.body)))
}
const deleteBoard = async(req,res) => {
    res.send(response(status.SUCCESS, await eraseBoard(req.params.boardId)))
}

//좋아요
const likeUp = async(req, res) => { 
    res.send(response(status.SUCCESS, await postLikeUp(req.params.boardId, req.user_id)))
}

const likeDown = async(req, res) => { 
    res.send(response(status.SUCCESS, await deleteLike(req.params.boardId, req.user_id) ))
}

const getLike = async(req, res) => {
    res.send(response(status.SUCCESS, await countLike(req.params.boardId)))
}

const getAllLikeBoard = async(res) => {
    res.send(response(status.SUCCESS, await countAllLike()));
}

//스크랩
const postScrape = async(req, res) => {
    res.send(response(status.SUCCESS, await addScrape(req.params.boardId, req.user_id)));
}
const cancelScrape = async(req, res) => {
    res.send(response(status.SUCCESS, await subScrape(req.params.boardId, req.user_id)));
}

//댓글
const getComment = async(req,res) => {
    res.send(response(status.SUCCESS, await getAllComment(req.params.boardId)));
}
const postComment = async(req,res) => {
    res.send(response(status.SUCCESS, await writeComment(req.params.boardId, req.body, req.user_id)))
}
const putComment = async(req,res) => {
    res.send(response(status.SUCCESS, await modifyComment(req.params.commentId, req.body)))
}
const deleteComment = async(req,res) => {
    res.send(response(status.SUCCESS, await eraseComment(req.params.commentId)))
}


module.exports = { getBoard, getOneBoard, postBoard, putBoard, deleteBoard, likeUp, likeDown, getLike, getAllLikeBoard, postScrape, cancelScrape, getComment, postComment, putComment, deleteComment };