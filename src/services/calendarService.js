// 신체기록 삽입,조회,삭제,수정
const { insertPhysicalRecordInDB, checkPhysicalRecordInDB,deletePhysicalRecordInDB, updatePhysicalRecordInDB} = require("../models/calendarDAO.js");
const {getPhysicalRecordDTO} = require("../dtos/calendarDTO.js");
const {checkDuplicationDateInDBInPhysical} = require("../models/calendarDAO.js");

// 진료기록 삽입,조회,삭제,수정
const {insertConsultationInDB, checkConsultationInDB, deleteConsultationInDB,updateConsultationInDB} = require("../models/calendarDAO.js");
const {getConsultationDTO,  getAllConsultationDTO} = require("../dtos/calendarDTO.js");
const {checkDuplicationDateInDBInConsultation} = require("../models/calendarDAO.js");

// 복용기록 삽입,조회,삭제,수정
const {checkMedicationInDB,checkAllMedicationInDB,insertMedicationInDB, deleteMedicationInDB, updateMedicationInDB} = require("../models/calendarDAO.js");
const {getMedicationDTO, getAllMedicationDTO} = require("../dtos/calendarDTO.js");
const {checkDuplicationDateInDBInMedication} = require("../models/calendarDAO.js");

const {getAllPhysicalRecordMonthlyInDB, getAllConsultationMonthlyInDB, getAllMedicationMonthlyInDB} = require("../models/calendarDAO.js");

const {getAllConsultationInDB} = require("../models/calendarDAO.js");


// 같은 사용자가 같은 날짜에 중복으로 작성하는지를 체크하는 함수 in physical_record
const checkDuplicationDateInPhysical = async(date,userId) => {

    let isDuplication;
    const result = await checkDuplicationDateInDBInPhysical(date,userId);
    console.log(`result: ${result}`);
    // 함수 실행 결과, 동일한 user_id와 date가 이미 기입되어 있는 경우(중복)
    if(result != undefined) isDuplication = true;
    else isDuplication = false;
    return isDuplication;
}

/*
// 같은 사용자가 같은 날짜에 중복으로 작성하는지를 체크하는 함수 in consultation
const checkDuplicationDateInConsultation = async(date,userId) => {

    let isDuplication;
    const result = await checkDuplicationDateInDBInConsultation(date,userId);
    console.log(`result: ${result}`);
    // 함수 실행 결과, 동일한 user_id와 date가 이미 기입되어 있는 경우(중복) 
    if(result != undefined) isDuplication = true;
    else isDuplication = false;
    return isDuplication;
}

// 같은 사용자가 같은 날짜에 중복으로 작성하는지를 체크하는 함수 in medication
const checkDuplicationDateInMedication = async(date, timeOfDay, userId) =>{

    let isDuplication;
    const result = await checkDuplicationDateInDBInMedication(date,timeOfDay,userId);
    if(result != undefined) isDuplication = true;
    else isDuplication = false;
    return isDuplication;
}
*/

const updateDate = async(date) => {
    // console.log(date);
     
     let modifyDate = date.setDate(date.getDate());
     modifyDate = date.toISOString();
    // console.log(modifyDate);
     modifyDate = modifyDate.substr(0,10);
     const year = modifyDate.substr(0,4);
     const month =modifyDate.substr(5,2);
     let day = modifyDate.substr(8,2);
     //console.log(year);
     //console.log(month);
     //console.log(day);
     modifyDate = `${year}-${month}-${day}`;
    // console.log(modifyDate);
    
     return modifyDate;
 };
 const getLastDay= async(date) => {
    // console.log(date);
     
  
     const year = date.substr(0,4);
     const month =date.substr(6,2);
    
     console.log(year);
     console.log(month);

     let lastDate = new Date(year,month,0);
     
     let lastDay = lastDate.getDate();
     console.log(lastDay);
    
     return lastDay;
    
 };

const makeObject = async(month) => {
    let result = [];

    let count = 1;
    let index = 0;

    const last = await getLastDay(month);
    console.log(last)
    while(count<=last){
        let date;
        if(count<10) date = `${month}-0${count}`;
        else date = `${month}-${count}`;

        result[index] = {
            "date": date,
            "physical_record": 0,
            "consultation": 0,
            "medication": 0
        };
        count++;
        index++;
    }

    return result;
} 

const checkPhysicalRecordMonthly = async(result, resultPhysicalRecord) => {

    resultPhysicalRecord.forEach(async(record) => {
        console.log(record.alarmed_date);
        const alarmed_date = await updateDate(record.alarmed_date);

        //result[alarmed_date].physical_record = 1;

        for(let i=0;i<result.length;i++)
            if(result[i].date == alarmed_date) result[i].physical_record = 1;
    });

    return result;
}

const  checkConsultationMonthly = async(result,resultConsultation) => {

    resultConsultation.forEach(async(con) => {
        const alarmed_date = await updateDate(con.alarmed_date);

       // result[alarmed_date].consultation = 1;
       for(let i=0;i<result.length;i++)
       if(result[i].date == alarmed_date) result[i].consultation = 1;
    });
    return result;

}
const checkMedicationMonthly = async(result, resultMedication) => {

    resultMedication.forEach( async(med) => {

        const alarmed_date = await updateDate(med.alarmed_date);

        //result[alarmed_date].medication = 1;
        for(let i=0;i<result.length;i++)
        if(result[i].date == alarmed_date) result[i].medication = 1;
    });
    return result;
}
module.exports={
    
    // 신체 
    insertPhysicalRecord: async(information) => {
        
        const data = {
            user_id : information.userId,
            alarmed_date: information.date,
            temperature: information.temperature,
            weight: information.weight,
            fasting_blood_sugar: information.bloodSugar,
            special_note: information.note
        }
    // 중복 체크
   
    let isDuplication = await checkDuplicationDateInPhysical(data.alarmed_date, data.user_id);
    console.log(`isDuplication: ${isDuplication}`);
    if(isDuplication){
        const result = "duplication";
        return result;
    }else{
        const result = await insertPhysicalRecordInDB(data);

        if(result) return result;
        else return undefined;
    }
   
    },
    getPhysicalRecord: async(date,userId) => {

        
        const result = await checkPhysicalRecordInDB(date,userId);
        
        // 서버 에러
        if(result == "error") return result;
        else if(result.length != 0) return getPhysicalRecordDTO(result);
        else return undefined;
     
    },
    removePhysicalRecord: async(date,userId) => {

        const result = await deletePhysicalRecordInDB(date,userId);

        if(result.affectedRows==0) return undefined;
        else return result;
    },
    modifyPhysicalRecord: async(date, modification) => {
        
        const data = {
            user_id : modification.userId,
            alarmed_date: modification.date,
            temperature: modification.temperature,
            weight: modification.weight,
            fasting_blood_sugar: modification.bloodSugar,
            special_note: modification.note
        }
        const result = await updatePhysicalRecordInDB(date,data);
        //console.log(result);
        if(result.affectedRows==0) return undefined;
        else return result;
    },
   

    // 진료
    // 진료기록 삽입 
    insertConsultation: async(information) => {

        const data = {
            user_id: information.userId,
            hospital: information.hospital,
            content: information.content,
            alarmed_date: information.date,
            alarmed_at: information.alarmed_at
        };
    
        const result = await insertConsultationInDB(data);
    
        if(result) return result;
        else return undefined;
        
    },
    // 진료기록 개별 조회
    getConsultation: async(userId, consultationId) => {
        console.log(consultationId);
        const result = await checkConsultationInDB(userId,consultationId);
        //console.log(result);
        //console.log(result.length);
         // 서버 에러
         if(result == "error") return result;
         else if(result.length != 0) return getConsultationDTO(result);
         else return undefined;
    },
    removeConsultation: async( userId,  consultationId) => {

        const result = await deleteConsultationInDB(userId,consultationId);

        // 해당 사용자, 날짜에 존재하는 진료기록이 없는 경우(영향을 받은 row가 0)
        if(result.affectedRows==0) return undefined;
        else return result;
    },
    modifyConsultation: async(modification, consultationId) => {

        const data = {
            user_id: modification.userId,
            hospital: modification.hospital,
            content: modification.content,
            alarmed_at: modification.alarmed_at
        }
        //console.log(data.hospital);
        const result = await updateConsultationInDB(data, consultationId);

        // 수정할 게시글이 존재하지 않는 경우(update에 영향받는 row가 0)
        if(result.affectedRows ==0) return undefined;
        else return result;

    },
    getAllMedication: async(date, userId) =>{

        const result = await checkAllMedicationInDB(date, userId);

          // 서버 에러
          if(result == "error") return result;
          else if(result.length != 0) return getAllMedicationDTO(result);
          else return undefined;
    },
    getMedication: async(userId, medicationId) => {

        const result = await checkMedicationInDB(userId, medicationId);

          // 서버 에러
          if(result == "error") return result;
          else if(result.length != 0) return getMedicationDTO(result);
          else return undefined;
    },
    insertMedication: async(information) => {

        let timeOfday;

        if(information.time_of_day == "morning") timeOfday = "아침";
        else if(information.time_of_day == "noon") timeOfday = "점심";
        else if(information.time_of_day == "evening") timeOfday = "저녁"; 

        const data = {

            user_id : information.userId,
            alarmed_date: information.alarmed_date,
            time_of_day: timeOfday,
            medicine: information.medicine,
            alarmed_at: information.alarmed_at,
            alarm_days: information.alarm_days,
            repeat_status: information.repeat_status
        };

       
        const result = await insertMedicationInDB(data);
        if(result) return result;
        else return undefined;
        
    },
    removeMedication: async(userId, medicationId) => {

        const result = await deleteMedicationInDB(userId, medicationId);
        console.log(result);
        if(result.affectedRows == 0) return undefined;
        else return result;
    },
    modifyMedication: async(modification, medicationId) =>{

        
        const data = {

            user_id : modification.userId,
            medicine: modification.medicine,
            alarmed_at: modification.alarmed_at,
            alarm_days: modification.alarm_days,
            repeat_status: modification.repeat_status
        }

        const result = await updateMedicationInDB(data, medicationId);

        // 수정할 게시글이 존재하지 않는 경우(update에 영향받는 row가 0)
        if(result.affectedRows == 0) return undefined;
        else return result;
    },
    getAllCalendar: async(userId, month) => {

        const resultPhysicalRecord = await getAllPhysicalRecordMonthlyInDB(userId, month);
        const resultConsultation = await getAllConsultationMonthlyInDB(userId, month);
        const resultMedication = await getAllMedicationMonthlyInDB(userId, month);

        //console.log(resultPhysicalRecord);
      //  console.log(resultConsultation);
        //console.log(resultMedication);

        let result = await makeObject(month);
        //console.log(result);

        result = await checkPhysicalRecordMonthly(result, resultPhysicalRecord);
        result = await checkConsultationMonthly(result,resultConsultation);
        result = await checkMedicationMonthly(result, resultMedication);

        //console.log(result);
        return result;
    },
    getAllConsultation: async(userId, date) =>{
        
        const result = await getAllConsultationInDB(userId, date);

        //console.log(result.length);

        // 서버 에러
        if(result == "error") return result;
        
         else if(result.length != 0) return  getAllConsultationDTO(result);
         else return undefined;
    }

};
