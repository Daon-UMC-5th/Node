const express = require('express');
const { getBoard, getOneBoard, postBoard, putBoard, deleteBoard, likeUp, likeDown, getLike, getAllLikeBoard, postScrape, cancelScrape, postComment, putComment, deleteComment, getComment } = require('../controllers/boardController.js')

const boardRouter = express.Router();

boardRouter.use((req,res,next) => {
    req.user_id = 1;
    next();
})


//게시판 글
//게시판 전체 가져오기
boardRouter.get('/getAll/:boardType', (req, res) => {
    getBoard(req, res);
});
//게시판 특정글 조회하기
boardRouter.get('/getOne/:boardId', (req, res) => {
    getOneBoard(req, res);
});
//게시판 글 작성하기
boardRouter.post('/write/post/:boardType',postBoard);
//게시판 글 수정하기
boardRouter.put('/write/put/:boardId',putBoard);
//게시판 글 삭제하기
boardRouter.delete('/write/delete/:boardId',deleteBoard);


//좋아요
//좋아요 추가
boardRouter.post('/likeup/:boardId', likeUp);
//좋아요 삭제
boardRouter.delete('/likedown/:boardId', likeDown);
//특정 글 좋아요 수 가져오기
boardRouter.get('/like/:boardId', getLike);
//모든 좋아요 수 가져오기
boardRouter.get('/allLike', (res) => {
    getAllLikeBoard(res);
});


//스크랩
//스크랩 추가
boardRouter.post('/addScrape/:boardId', postScrape);
//스크랩 삭제
boardRouter.delete('/subScrape/:boardId', cancelScrape);


//댓글
//댓글 추가
boardRouter.post('/comment/post/:boardId', postComment);
//댓글 수정
boardRouter.put('/comment/put/:commentId', putComment);
//댓글 삭제
boardRouter.delete('/comment/delete/:commentId', deleteComment);
//댓글 가져오기
boardRouter.get('/comment/get/:boardId', getComment);


//댓글 좋아요
//좋아요 추가
boardRouter.post('/comment/likeup/:commentId');
//좋아요 취소
boardRouter.delete('/comment/likedown/:commentId');

module.exports = boardRouter ;