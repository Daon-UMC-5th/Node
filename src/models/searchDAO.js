const db = require("../config/database.js");
const {getBoardSQL, getAllLikeInBoardSQL,getImageUrlInBoardSQL,getCommentInBoardSQL,getScrapeInBoardSQL} = require("./searchSQL.js");
const {getPrivateDiarySQL, getPublicDiarySQL} = require("./searchSQL.js");

const getBoardFromDB = async(search) => {
    const dbConnection = await db.getConnection();
    const result = await db.query(getBoardSQL);
    dbConnection.release();

   //console.log(result[0]);
    return result[0];
}
module.exports.getBoardFromDB = getBoardFromDB;


const getAllLikeInBoardInDB = async(boardId) => {

    const dbConnection = await db.getConnection();
    let result = await db.query(getAllLikeInBoardSQL, [boardId]);
    dbConnection.release();
    result = result[0];
    //console.log(result[0]);
    if(result[0]!= undefined) {
        //console.log(result);
       // console.log(result[0].likecount);
        return result[0].likecount;
    }
    else{
      return 0;
    }
 
}

module.exports.getAllLikeInBoardInDB = getAllLikeInBoardInDB;

const getImageUrlInBoardInDB = async(boardId) => {


    const dbConnection = await db.getConnection();

    let result = await db.query(getImageUrlInBoardSQL, [boardId]);
    result = result[0];
    dbConnection.release();
//    console.log(result[0]);

    return result[0].image_url;
}
module.exports.getImageUrlInBoardInDB = getImageUrlInBoardInDB;

const getCommentInBoardInDB = async(boardId) => {

    const dbConnection = await db.getConnection();
    let result = await db.query(getCommentInBoardSQL, [boardId]);

    dbConnection.release();
    console.log(result[0]);
    result = result[0];
    if(result[0]!= undefined) {
        //console.log(result);
        console.log(result[0].commentcount);
        return result[0].commentcount;
    }
    else{
      return 0;
    }
}
module.exports.getCommentInBoardInDB = getCommentInBoardInDB;

const getScrapeInBoardInDB = async(boardId) =>{
    const dbConnection = await db.getConnection();
    let result = await db.query(getScrapeInBoardSQL, [boardId]);

    dbConnection.release();
    result = result[0];

    if(result[0]!= undefined){
        
        return result[0].scrapecount;
    }else{
        return 0;
    }
}
module.exports.getScrapeInBoardInDB = getScrapeInBoardInDB;


const getPrivateDiaryFromDB = async(userId) => {
    const dbConnection = await db.getConnection();
    const result = await db.query(getPrivateDiarySQL, [userId]);
    dbConnection.release();
   // console.log(result);
   //console.log(result[0]);

    return result[0];

}
module.exports.getPrivateDiaryFromDB = getPrivateDiaryFromDB;

const getPublicDiaryFromDB = async(userId) =>{

    const dbConnection = await db.getConnection();

    const result = await db.query(getPublicDiarySQL, [userId]);
    dbConnection.release();

    return result[0];
}
module.exports.getPublicDiaryFromDB = getPublicDiaryFromDB;
