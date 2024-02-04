const response = require('../config/response.js');
const status = require('../config/responseStatus.js');
const { getBoardType, getBoardId, countLike, countAllLike, getAllComment} = require('../providers/boardProvider.js');
const { writeBoard, modifyBoard, eraseBoard, postLikeUp, deleteLike, addScrape, subScrape, writeComment, modifyComment, eraseComment } = require('../services/boardService.js')


//게시판
const getBoard = async(req,res) => {
    const boardTypeData = await getBoardType(req.params.boardType, req.query.offset);
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

const getAllLikeBoard = async(req, res) => {
    res.send(response(status.SUCCESS, await countAllLike(req.query.offset)));
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
    res.send(response(status.SUCCESS, await getAllComment(req.params.boardId, req.query.offset)));
}
const postComment = async(req,res) => {
    const getBoardId = await writeComment(req.params.boardId, req.body, req.user_id)
    res.send(response(status.SUCCESS, await getAllComment(getBoardId.board_id, req.query.offset) ))
}
const putComment = async(req,res) => {
    const getBoardId = await modifyComment(req.params.commentId, req.body)
    res.send(response(status.SUCCESS, await getAllComment(getBoardId.board_id, req.query.offset)))
}
const deleteComment = async(req,res) => {
    const getBoardId = await eraseComment(req.params.commentId)
    res.send(response(status.SUCCESS, await getAllComment(getBoardId.board_id, req.query.offset) ))
}


module.exports = { getBoard, getOneBoard, postBoard, putBoard, deleteBoard, likeUp, likeDown, getLike, getAllLikeBoard, postScrape, cancelScrape, getComment, postComment, putComment, deleteComment };