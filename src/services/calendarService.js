// 신체기록 삽입,조회,삭제,수정
const { insertPhysicalRecordInDB, checkPhysicalRecordInDB,deletePhysicalRecordInDB, updatePhysicalRecordInDB} = require("../models/calendarDAO.js");
const {getPhysicalRecordDTO} = require("../dtos/calendarDTO.js");
const {checkDuplicationDateInDBInPhysical} = require("../models/calendarDAO.js");

// 진료기록 삽입,조회,삭제,수정
const {insertConsultationInDB, checkConsultationInDB, deleteConsultationInDB,updateConsultationInDB} = require("../models/calendarDAO.js");
const {getConsultationDTO} = require("../dtos/calendarDTO.js");
const {checkDuplicationDateInDBInConsultation} = require("../models/calendarDAO.js");

// 복용기록 삽입,조회,삭제,수정
const {checkMedicationInDB,checkAllMedicationInDB,insertMedicationInDB, deleteMedicationInDB, updateMedicationInDB} = require("../models/calendarDAO.js");
const {getMedicationDTO, getAllMedicationDTO} = require("../dtos/calendarDTO.js");
const {checkDuplicationDateInDBInMedication} = require("../models/calendarDAO.js");

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

        // 중복체크 
        let isDuplication = await checkDuplicationDateInConsultation(data.alarmed_date, data.user_id);
        if(isDuplication){
            const result = "duplication";
            return result;
        }else{
            const result = await insertConsultationInDB(data);
    
            if(result) return result;
            else return undefined;
        }
    },
    // 진료기록 조회
    getConsultation: async(date, userId) => {

        const result = await checkConsultationInDB(date,userId);

         // 서버 에러
         if(result == "error") return result;
         else if(result.length != 0) return getConsultationDTO(result);
         else return undefined;
    },
    removeConsultation: async(date, userId) => {

        const result = await deleteConsultationInDB(date,userId);

        // 해당 사용자, 날짜에 존재하는 진료기록이 없는 경우(영향을 받은 row가 0)
        if(result.affectedRows==0) return undefined;
        else return result;
    },
    modifyConsultation: async(date, modification) => {

        const data = {
            user_id: modification.userId,
            hospital: modification.hospital,
            content: modification.content,
            alarmed_date: modification.date,
            alarmed_at: modification.alarmed_at
        }
        //console.log(data.hospital);
        const result = await updateConsultationInDB(date,data);

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
    getMedication: async(when, date, userId) => {

        let timeOfDay;

        if(when == "morning") timeOfDay = "아침";
        else if(when == "noon") timeOfDay = "점심";
        else if(when == "evening") timeOfDay ="저녁";
      

        const result = await checkMedicationInDB(timeOfDay,date,userId);

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

        let isDuplication = await checkDuplicationDateInMedication(data.alarmed_date, timeOfday, data.user_id);
        if(isDuplication){
            const result = "duplication";
            return result;
        }else{
            const result = await insertMedicationInDB(data);
            if(result) return result;
            else return undefined;
        }
    },
    removeMedication: async(date, when, userId) => {

        let timeOfDay;

        if(when == "morning") timeOfDay = "아침";
        else if(when == "noon") timeOfDay = "점심";
        else if(when == "evening") timeOfDay ="저녁";

        const result = await deleteMedicationInDB(date, timeOfDay, userId);
        console.log(result);
        if(result.affectedRows == 0) return undefined;
        else return result;
    },
    modifyMedication: async(modification) =>{

        let timeOfday;

        if(modification.time_of_day == "morning") timeOfday = "아침";
        else if(modification.time_of_day == "noon") timeOfday = "점심";
        else if(modification.time_of_day == "evening") timeOfday = "저녁";
        
        const data = {

            user_id : modification.userId,
            alarmed_date: modification.alarmed_date,
            time_of_day: timeOfday,
            medicine: modification.medicine,
            alarmed_at: modification.alarmed_at,
            alarm_days: modification.alarm_days,
            repeat_status: modification.repeat_status
        }

        const result = await updateMedicationInDB(data);

        // 수정할 게시글이 존재하지 않는 경우(update에 영향받는 row가 0)
        if(result.affectedRows == 0) return undefined;
        else return result;
    }
    

};
