const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const pool = require('../config/database.js');
const { getAllData, getOneData, getBoardImage, getAllDataLike, getAllDataComment ,getAllDataScrape, oneBoardImage, getOneDataLike, getOneDataComment, getOneDataScrape, compareUser, insertData, searchData, changeData, deleteData, existBoard, insertLike, deleteLike, countLike, getAllLike, insertScrape, deleteScrape, getCommentData, insertComment, changeComment, deleteCommentData, boardComment, insertCommentLike, deleteCommentLike, countCommentLike, getAllCommentDataLike } = require('./boardSQL.js');

//게시판
const getBoardData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const allData = await pool.query(getAllData, [data.board_type, parseInt(data.offset)]);
        const allData1 = await pool.query(getAllDataLike);
        const allData2 = await pool.query(getAllDataComment);
        const allData3 = await pool.query(getAllDataScrape);
        const allData4 = await pool.query(getBoardImage);
        conn.release();
        
        resultBoard = [allData[0], allData1[0], allData2[0], allData3[0], allData4[0]];

        return resultBoard;  
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR); }
}

const getOneBoardData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const oneData = await pool.query(getOneData, data.board_id);
        const btnAdd = await pool.query(compareUser, data.board_id);
        const oneData1 = await pool.query(getOneDataLike, data.board_id);
        const oneData2 = await pool.query(getOneDataComment, data.board_id);
        const oneData3 = await pool.query(getOneDataScrape, data.board_id);
        const oneData4 = await pool.query(oneBoardImage, data.board_id);
        conn.release();

        if(btnAdd[0][0].user_id == data.user_id){ //user_id와 작성자가 같으면 true값돌려줘서 버튼 보이게
            return [oneData[0][0], oneData1[0], oneData2[0], oneData3[0], oneData4[0], true];
        }
        else{
            return [oneData[0][0], oneData1[0], oneData2[0], oneData3[0], oneData4[0], false];
        }
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR); }
}

const writeBoardData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const writeAllData = await pool.query(insertData, [data.board_type, data.user_id, data.title, data.content]);
        conn.release();
        console.log(writeAllData[0]);
        return writeAllData[0].insertId;
        
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const returnWriteBoardData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const returnSearchData = await pool.query(searchData, data);
        const oneData1 = await pool.query(getOneDataLike, data);
        const oneData2 = await pool.query(getOneDataComment, data);
        const oneData3 = await pool.query(getOneDataScrape, data);
        const oneData4 = await pool.query(oneBoardImage, data);
        conn.release();
        return [returnSearchData[0][0], oneData1[0], oneData2[0], oneData3[0], oneData4[0], true];
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const modifyBoardData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const modifyData = await pool.query(changeData, [data.title, data.content, data.board_id]);
        modifyData;
        conn.release();
        return data.board_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const eraseBoardData = async(data) => {
    try {
        const conn = await pool.getConnection();
        console.log(data)
        const exist = await pool.query(existBoard, data);
        if(exist[0][0]==null){
            conn.release();
            throw error;
        }
        const eraseData = await pool.query(deleteData, data);
        conn.release();
        return eraseData;
    } 
    catch (err) {throw response(status.INTERNAL_SERVER_ERROR);}
}

//좋아요
const postLikeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const addLike = await pool.query(insertLike, [data.user_id, data.board_id]);
        addLike;
        conn.release();
        return data.board_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const deleteLikeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const subLike = await pool.query(deleteLike, [data.user_id, data.board_id])
        subLike;
        conn.release();
        return data.board_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const countLikeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const count = await pool.query(countLike, data);
        const countResult = count[0][0]
        conn.release();
        return countResult
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const allLikeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const allcount = await pool.query(getAllLike, parseInt(data.offset));
        conn.release();
        
        return allcount[0];
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

//스크랩
const addScrapeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const [ScrapeData] = await pool.query(insertScrape, [data.user_id, data.board_id]);
        conn.release();
        ScrapeData;
        return ScrapeData[0]
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const subScrapeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const [ScrapeData] = await pool.query(deleteScrape, [data.user_id, data.board_id])
        conn.release();
        return ScrapeData[0]
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

//댓글
const allCommentData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const commentData = await pool.query(getCommentData, [data.board_id, parseInt(data.offset)]);
        const commentlikedata = await pool.query(getAllCommentDataLike);
        conn.release();

        commentlist = [commentData[0], commentlikedata[0]]
        
        return commentlist;  
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR); }
}

const writeCommentData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const [writeAllData] = await pool.query(insertComment, [data.user_id, data.board_id, data.content]);
        writeAllData;
        conn.release();
        return {"board_id" : data.board_id };
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const modifyCommentData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const [boardIdData] = await pool.query(boardComment, data.comment_id);
        const [modifyData] = await pool.query(changeComment, [data.content, data.comment_id]);
        modifyData;
        conn.release();
        return boardIdData[0];
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const eraseCommentData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const [boardIdData] = await pool.query(boardComment, data.comment_id);
        const [eraseData] = await pool.query(deleteCommentData, data.comment_id);
        eraseData;
        conn.release();
        return boardIdData[0];
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const postLikeCommentData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const addCommentLike = await pool.query(insertCommentLike, [data.user_id, data.comment_id]);
        addCommentLike;
        conn.release();
        return data.comment_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}
const deleteLikeCommentData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const subCommentLike = await pool.query(deleteCommentLike, [data.user_id, data.comment_id]);
        subCommentLike;
        conn.release();
        return data.comment_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}
const countLikeCommentData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const countComment = await pool.query(countCommentLike, data);
        const countCommentResult = countComment[0][0]
        conn.release();
        return countCommentResult
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

module.exports = { getBoardData, getOneBoardData, writeBoardData, returnWriteBoardData, modifyBoardData, eraseBoardData, postLikeData, deleteLikeData, countLikeData, allLikeData, addScrapeData, subScrapeData, allCommentData, writeCommentData, modifyCommentData, eraseCommentData, postLikeCommentData, deleteLikeCommentData, countLikeCommentData };