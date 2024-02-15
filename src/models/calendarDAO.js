const db = require("../config/database.js");
// 신체 
const {insertPhysicalRecordSQL, getPhysicalRecordSQL,deletePhysicalRecordSQL,updatePhysicalRecordSQL} = require("./calendarSQL.js");
const {checkDuplicationDateInPhysicalSQL} = require("./calendarSQL.js");

// 진료
const {insertConsultationSQL, getConsultationSQL,deleteConsultationSQL, updateConsultationSQL} = require("./calendarSQL.js");
const {checkDuplicationDateInConsultationSQL} = require("./calendarSQL.js");
const {getAllConsultationSQL} = require("./calendarSQL.js");
// 복용
const {getMedicationSQL,getAllMedicationSQL,insertMedicationSQL, deleteMedicationSQL, updateMedicationSQL} = require("./calendarSQL.js");
const {checkDuplicationDateInMedicationSQL} = require("./calendarSQL.js");



const {getAllPhysicalRecordMonthlySQL, getAllConsultationMonthlySQL, getAllMedicationMonthlySQL} = require("./calendarSQL.js");
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

const checkDuplicationDateInDBInPhysical = async(date,userId) => {

   const dbConnection = await db.getConnection();

   const result = await db.query(checkDuplicationDateInPhysicalSQL, [date,userId]);
   console.log(result[0]);
   if(result[0].length != 0) return result[0];
   else return undefined;

}
module.exports.checkDuplicationDateInDBInPhysical = checkDuplicationDateInDBInPhysical;



// 진료

// 진료기록 삽입
const insertConsultationInDB = async(data) => {
    try{
        const dbConnection = await db.getConnection();
        const result = await db.query(insertConsultationSQL,[data.user_id, data.hospital, data.content, data.alarmed_date, data.alarmed_at]);
        console.log(result[0]);
        dbConnection.release();
        return result[0];
    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();
        //console.log(result[0]);
        return result[0];
    }
 
}
module.exports.insertConsultationInDB = insertConsultationInDB;

/*
// 진료기록 중복 체크 
const checkDuplicationDateInDBInConsultation = async(date, userId) => {

    const dbConnection = await db.getConnection();

    const result = await db.query(checkDuplicationDateInConsultationSQL, [date, userId]);
    if(result[0].length != 0) return result[0];
    else return undefined;

}
module.exports.checkDuplicationDateInDBInConsultation = checkDuplicationDateInDBInConsultation;
*/


// 진료기록 조회
const checkConsultationInDB = async(userId,consultationId) => {

    const dbConnection = await db.getConnection();
    try{
        console.log(consultationId);
        const result = await db.query(getConsultationSQL,[consultationId]);
        dbConnection.release();
       console.log(result[0]);
        return result[0];
    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();
        //console.log(result[0]);
        return result[0];
    }
}
module.exports.checkConsultationInDB = checkConsultationInDB;

// 진료기록 삭제

const deleteConsultationInDB = async(userId, consultationId) => {

    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(deleteConsultationSQL, [consultationId]);
        dbConnection.release();
        console.log(result[0]);

        return result[0];
    }catch(err){
        const result=[];
        result[0] = "error";
        dbConnection.release();
    
        return result[0];
    }
}
module.exports.deleteConsultationInDB = deleteConsultationInDB;

// 진료기록 수정
const updateConsultationInDB = async(data, consultationId) => {

    const dbConnection = await db.getConnection();

    try{
        console.log(data.hospital);
        const result = await db.query(updateConsultationSQL, [data.hospital, data.content, data.alarmed_at, consultationId]);
        dbConnection.release();
        console.log(result[0]);
        return result[0];

    }catch(err){

        console.log(err);
        const result = [];
        result[0] = "error";
        dbConnection.release();

        return result[0];
    }
}
module.exports.updateConsultationInDB = updateConsultationInDB;



//복용
// 복용기록 전체 조회
const checkAllMedicationInDB = async(date, userId) => {
    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(getAllMedicationSQL, [date, userId]);

       // console.log(result);
        dbConnection.release();
        return result[0];

    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();
        return result[0];
    }
}
module.exports.checkAllMedicationInDB =  checkAllMedicationInDB;


// 복용기록 조회
const checkMedicationInDB = async(userId, medicationId) => {
    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(getMedicationSQL, [medicationId]);
        console.log(result);
        dbConnection.release();
        return result[0];
    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();
        return result[0];
    }
}
module.exports.checkMedicationInDB = checkMedicationInDB;

/*
const checkDuplicationDateInDBInMedication = async(date, timeOfDay, userId) => {

    const dbConnection = await db.getConnection();

    const result = await db.query(checkDuplicationDateInMedicationSQL, [date, timeOfDay, userId]);

    if(result[0].length !=0) return result[0];
    else return undefined;
}
module.exports.checkDuplicationDateInDBInMedication = checkDuplicationDateInDBInMedication;
*/

// 복용기록 삽입
const insertMedicationInDB = async(data) => {

    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(insertMedicationSQL, [data.user_id, data.alarmed_date, data.time_of_day, data.medicine, data.alarmed_at, data.alarm_days, data.repeat_status]);

        console.log(result[0]);
    
        dbConnection.release();
    
        return result[0];
    }catch(err){
        const result=[];
        result[0] = "error";
        dbConnection.release();
    
        return result[0];
    }
  
}
module.exports.insertMedicationInDB = insertMedicationInDB;


// 복용기록 삭제
const deleteMedicationInDB = async(userId, medicationId) => {

    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(deleteMedicationSQL, [medicationId]);
        dbConnection.release();
        console.log(result[0]);

        return result[0];
    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();

        return result[0];
    }
}
module.exports.deleteMedicationInDB = deleteMedicationInDB;

// 복용기록 수정
const updateMedicationInDB = async(data,medicationId) => {

    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(updateMedicationSQL,[data.medicine, data.alarmed_at, data.alarm_days,data.repeat_status, medicationId]);
        dbConnection.release();

        return result[0];

    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();

        return result[0];
    }
}
module.exports.updateMedicationInDB = updateMedicationInDB;

const getLastDate= async(date) => {
    // console.log(date);
     
  
     const year = date.substr(0,4);
     const month =date.substr(6,2);
    
     console.log(year);
     console.log(month);

     let lastDate = new Date(year,month,0);
     
     lastDate = lastDate.toISOString();
    lastDate = lastDate.substr(0,10);
    console.log(lastDate);
     return lastDate;
    
 };

const getAllPhysicalRecordMonthlyInDB = async(userId, month) => {


    const startDate = `${month}-01`;

    const endDate = await getLastDate(month);
    console.log(startDate);
    console.log(endDate);
    console.log(userId);

    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(getAllPhysicalRecordMonthlySQL, [userId, startDate, endDate]);
        dbConnection.release();
       // console.log(result);
        return result[0];
    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();

        return result[0];
    }
}
module.exports.getAllPhysicalRecordMonthlyInDB = getAllPhysicalRecordMonthlyInDB;

const getAllConsultationMonthlyInDB = async(userId, month) =>{
    const startDate = `${month}-01`;
    const endDate = await getLastDate(month);

    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(getAllConsultationMonthlySQL, [userId, startDate, endDate]);
        dbConnection.release();

        return result[0];
    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();

        return result[0];
    }

}
module.exports.getAllConsultationMonthlyInDB = getAllConsultationMonthlyInDB;

const getAllMedicationMonthlyInDB = async(userId, month)=> {
    const startDate = `${month}-01`;
    const endDate = await getLastDate(month);

    const dbConnection = await db.getConnection();

    try{
        const result = await db.query(getAllMedicationMonthlySQL , [userId, startDate, endDate]);
        dbConnection.release();

        return result[0];
    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();

        return result[0];
    }
}
module.exports.getAllMedicationMonthlyInDB = getAllMedicationMonthlyInDB;

const getAllConsultationInDB = async(userId, date) =>{

    const dbConnection = await db.getConnection();
    try{
        const result = await db.query(getAllConsultationSQL, [date,userId]);

       // console.log(result);
        dbConnection.release();
        return result[0];

    }catch(err){
        const result = [];
        result[0] = "error";
        dbConnection.release();
        return result[0];
    }
}
module.exports.getAllConsultationInDB = getAllConsultationInDB;