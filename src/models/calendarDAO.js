const db = require("../config/database.js");
const {insertPhysicalRecordSQL, getPhysicalRecordSQL,deletePhysicalRecordSQL,updatePhysicalRecordSQL} = require("./calendarSQL.js");
const {checkDuplicationDateDateSQL} = require("./calendarSQL.js");

// 신체기록 삽입 
const insertPhysicalRecordInDB = async(data) => {

    const dbConnection = await db.getConnection();
 
    const result = await db.query(insertPhysicalRecordSQL, [data.user_id, data.alarmed_date, data.temperature, data.weight, data.fasting_blood_sugar, data.special_note]);

    console.log(result[0]);
    
    dbConnection.release();
    return result[0];


};
module.exports.insertPhysicalRecordInDB = insertPhysicalRecordInDB;

// 신체기록 조회
const checkPhysicalRecordInDB = async(date,userId) => {

    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(getPhysicalRecordSQL, [date,userId]);
        dbConnection.release();
       //console.log(result[0]);
        return result[0];
    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();
        //console.log(result[0]);
        return result[0];
    }
    
    
    

};
module.exports.checkPhysicalRecordInDB = checkPhysicalRecordInDB;


// 신체기록 삭제
const deletePhysicalRecordInDB = async(date,userId) => {

    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(deletePhysicalRecordSQL, [date,userId]);
        dbConnection.release();
        console.log(result[0]);
        return result[0];

    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();
        return result[0];
        
    }
};
module.exports.deletePhysicalRecordInDB = deletePhysicalRecordInDB;

// 신체기록 수정
const updatePhysicalRecordInDB = async(date,data) => {
    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(updatePhysicalRecordSQL, [data.temperature, data.weight, data.fasting_blood_sugar, data.special_note, date, data.user_id]);
        dbConnection.release();
      //  console.log(result);

        return result[0];
    }catch(err){
        console.log(err);
        const result = [];
        result[0] = "error";
        dbConnection.release();
        return result[0];
    }
}
module.exports.updatePhysicalRecordInDB = updatePhysicalRecordInDB;

const checkDuplicationDateDateInDB = async(date,userId) => {

   const dbConnection = await db.getConnection();

   const result = await db.query(checkDuplicationDateDateSQL, [date,userId]);
   console.log(result[0]);
   if(result[0].length != 0) return result[0];
   else return undefined;

}
module.exports.checkDuplicationDateDateInDB = checkDuplicationDateDateInDB;