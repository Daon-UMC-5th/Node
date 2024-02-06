const db = require("../config/database.js");
const {getDiarySQL} = require("./searchSQL.js");
const {getBoardSQL} = require("./searchSQL.js");

const getDiaryFromDB = async(search) => {
    const dbConnection = await db.getConnection();
    const result = await db.query(getDiarySQL);
    dbConnection.release();
   // console.log(result);
   //console.log(result[0]);

    return result[0];

};

const getBoardFromDB = async(search) => {
    const dbConnection = await db.getConnection();
    const result = await db.query(getBoardSQL);
    dbConnection.release();

   // console.log(result[0]);
    return result[0];

}
module.exports.getDiaryFromDB = getDiaryFromDB;
module.exports.getBoardFromDB = getBoardFromDB;