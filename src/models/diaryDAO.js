const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const pool = require('../config/database.js');
const { getPrivate, getPublic, getDiaryImage, getImageList, oneDiary,searchDiaryId, oneDiaryImage, compareDiaryUser, oneDiaryLike, getDiaryLike, insertDiary, insertUrlDiary, changeDiary, changeUrlDiary, selectUrlDiary, selectId, deleteDiaryData, countDiary, insertDiaryLike, deleteDiaryLike } = require('../models/diarySQL.js');

const privateDiaryData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const diary = await pool.query(getPrivate, [data.user_id, parseInt(data.offset)]);
        const diaryLike = await pool.query(getDiaryLike);
        const diaryImage = await pool.query(getDiaryImage);

        conn.release();
        resultDiary = [diary[0], diaryLike[0], diaryImage[0]];
        
        return resultDiary;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}

const publicDiaryData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const pubdiary = await pool.query(getPublic, parseInt(data.offset));
        const diaryLike = await pool.query(getDiaryLike)
        const diaryImage = await pool.query(getDiaryImage)
        conn.release();

        resultDiary = [pubdiary[0], diaryLike[0], diaryImage[0]];
        return resultDiary; 
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}

const ImageListData = async(data) => {
    try {   
        const conn = await pool.getConnection();
        const diaryImageList = await pool.query(getImageList, [data.user_id, data.diary_year, data.diary_month]);
        conn.release();
       
        const getDaysInMonth  = (year, month) => { return new Date(year, month, 0).getDate()};
        year = data.diary_year;
        month = data.diary_month;
        const daylist = getDaysInMonth(year,month)
        return [daylist, diaryImageList[0]]
        
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}

const oneDiaryData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const DiaryData = await pool.query(oneDiary, data.diary_date);
        id = await pool.query(searchDiaryId, data.diary_date);
        diaryId = id[0][0]
   // console.log(diary_id)
        const DiaryLike = await pool.query(oneDiaryLike, diaryId.diary_id);
        const DiaryImage = await pool.query(oneDiaryImage, diaryId.diary_id);
        const btnAdd = await pool.query(compareDiaryUser, diaryId.diary_id);
        //await console.log(btnAdd)
        conn.release();

        if(btnAdd[0][0].user_id == data.user_id){ //user_id와 작성자가 같으면 true값돌려줘서 버튼 보이게
           return [DiaryData[0][0], DiaryLike[0], DiaryImage[0], true];
        }
        else{
            return [DiaryData[0][0], DiaryLike[0], DiaryImage[0], false];
        }
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}


const writeDiaryData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const DiaryData = await pool.query(insertDiary, [data.user_id, data.is_private, data.title, data.content ,data.diary_date]);
        const searchId = DiaryData[0].insertId
        if(data.image_url !== undefined){
            const DiaryImageData = await pool.query(insertUrlDiary, [searchId, data.image_url])
            DiaryImageData;
        }
        conn.release();
        return DiaryData[0].insertId; // insertId값으로 date찾는 sql에 넣고 date를 리턴값으로
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}

const modifyDiaryData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const changeData = await pool.query(changeDiary, [data.is_private, data.title, data.content, data.diary_date]);
        changeData;
        const searchImage = await pool.query(selectUrlDiary, data.diary_date)
        const Image = searchImage[0]
        const id = await pool.query(selectId, data.diary_date)
        if(data.image_url !== undefined){
            if(Image.length === 0){
                const BoardImageData = await pool.query(insertUrlDiary, [id[0][0].diary_id, data.image_url])
                BoardImageData;
            }
            else {
                const BoardImageData = await pool.query(changeUrlDiary, [data.image_url, id[0][0].diary_id])
                BoardImageData;
            } 
        }
        conn.release();
        if(changeData[0].affectedRows == 0){
            throw error;
        }
        return data
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}

const eraseDiaryData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const eraseData = await pool.query(deleteDiaryData, data.diary_date);
        conn.release();
        eraseData;
        if(eraseData[0].affectedRows == 0){
            throw error;
        }
        return data
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}

const countDiaryLike = async(data) => {
    try {
        const conn = await pool.getConnection();
        const count = await pool.query(countDiary, data);
        const countResult = count[0][0]
        conn.release();
        return countResult
    } 
    catch (err) {throw response(status.INTERNAL_SERVER_ERROR,{});}
}

const addLikeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const addDiaryLike = await pool.query(insertDiaryLike, [data.user_id, data.diary_id]);
        addDiaryLike;
        conn.release();
        return data.diary_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}

const subLikeData = async(data) => {
    try {
        const conn = await pool.getConnection();
        const subDiaryLike = await pool.query(deleteDiaryLike, [data.user_id, data.diary_id]);
        subDiaryLike;
        conn.release();
        return data.diary_id;
    } 
    catch (err) { throw response(status.INTERNAL_SERVER_ERROR,{});}
}


module.exports = { privateDiaryData, publicDiaryData, ImageListData, oneDiaryData, writeDiaryData, modifyDiaryData, eraseDiaryData, countDiaryLike, addLikeData, subLikeData}