const response = require('../config/response.js');
const status = require('../config/responseStatus.js');
const pool = require('../config/database.js');
const { getPrivate, getPublic, insertDiary, changeDiary, deleteDiaryData, countDiary, insertDiaryLike, deleteDiaryLike } = require('../models/diarySQL.js');

const privateDiaryData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const diary = await pool.query(getPrivate, [data.user_id, parseInt(data.offset)]);
        conn.release();
        return diary[0];  
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const publicDiaryData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const pubdiary = await pool.query(getPublic, parseInt(data.offset));
        conn.release();
        return pubdiary[0];  
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}


const writeDiaryData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const DiaryData = await pool.query(insertDiary, [data.user_id, data.is_private, data.title, data.content]);
        conn.release();
        return DiaryData[0].insertId;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const modifyDiaryData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const changeData = await pool.query(changeDiary, [data.is_private, data.title, data.content, data.diary_id]);
        conn.release();
        changeData;
        return data.diary_id
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const eraseDiaryData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const eraseData = await pool.query(deleteDiaryData, data.diary_id);
        conn.release();
        eraseData;
        return data.diary_id
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const countDiaryLike = async(data) => {
    try {
        const conn = await pool.getConnection();
        const count = await pool.query(countDiary, data);
        const countResult = count[0][0]
        conn.release();
        return countResult
    } 
    catch (err) {throw response(status.INTERNAL_SERVER_ERROR);}
}

const addLikeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const addDiaryLike = await pool.query(insertDiaryLike, [data.user_id, data.diary_id]);
        addDiaryLike;
        conn.release();
        return data.diary_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}

const subLikeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const subDiaryLike = await pool.query(deleteDiaryLike, [data.user_id, data.diary_id]);
        subDiaryLike;
        conn.release();
        return data.diary_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR);}
}


module.exports = { privateDiaryData, publicDiaryData, writeDiaryData, modifyDiaryData, eraseDiaryData, countDiaryLike, addLikeData, subLikeData}