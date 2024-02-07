const response = require('../config/response.js');
const status = require('../config/responseStatus.js');
const pool = require('../config/database.js');
const { selectBoard, selectComment, selectScrape, countBoard, countComment, countScrape, changeProfile } = require('../models/mypageSQL.js');
const { getAllDataLike, getAllDataComment, getAllDataScrape, getBoardImage, getAllCommentDataLike} = require('../models/boardSQL.js');

const MyBoardData = async(data) => {
    try {  
        const conn = await pool.getConnection();
        const MyBoardList = await pool.query(selectBoard, [data.user_id, parseInt(data.offset)]);
        const allData1 = await pool.query(getAllDataLike);
        const allData2 = await pool.query(getAllDataComment);
        const allData3 = await pool.query(getAllDataScrape);
        const allData4 = await pool.query(getBoardImage);
        conn.release();
        
        resultBoard = [MyBoardList[0], allData1[0], allData2[0], allData3[0], allData4[0]];

        return resultBoard;  
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const MyCommentData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const MyCommentList = await pool.query(selectComment, [data.user_id, parseInt(data.offset)]);
        //const commentlikedata = await pool.query(getAllCommentDataLike);
        const allData1 = await pool.query(getAllDataLike);
        const allData2 = await pool.query(getAllDataComment);
        const allData3 = await pool.query(getAllDataScrape);
        const allData4 = await pool.query(getBoardImage);
        conn.release();

        resultBoard = [MyCommentList[0], allData1[0], allData2[0], allData3[0], allData4[0]]
        
        return resultBoard;  
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const MyScrapeData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const MyScrapeList = await pool.query(selectScrape, [data.user_id, parseInt(data.offset)]);
        const allData1 = await pool.query(getAllDataLike);
        const allData2 = await pool.query(getAllDataComment);
        const allData3 = await pool.query(getAllDataScrape);
        const allData4 = await pool.query(getBoardImage);
        conn.release();
        
        resultBoard = [MyScrapeList[0], allData1[0], allData2[0], allData3[0], allData4[0]];

        return resultBoard;    
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const MyPageData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const MyPage_1 = await pool.query(countBoard, data.user_id);
        const MyPage_2 = await pool.query(countComment, data.user_id);
        const MyPage_3 = await pool.query(countScrape, data.user_id);
        MyPageList = [MyPage_1[0][0], MyPage_2[0][0], MyPage_3[0][0]];
        conn.release();
        return MyPageList;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const profileData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const MyProfile = await pool.query(changeProfile,[data.user_nickname, data.introduction, data.user_id]);
        conn.release();
        return MyProfile[0];  
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

module.exports = { MyBoardData, MyCommentData, MyScrapeData, MyPageData, profileData };