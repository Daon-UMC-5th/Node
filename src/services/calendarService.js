// 신체 기록 삽입,조회,삭제,수정을 위한 dao
const { insertPhysicalRecordInDB, checkPhysicalRecordInDB,deletePhysicalRecordInDB, updatePhysicalRecordInDB} = require("../models/calendarDAO.js");
const {getPhysicalRecordDTO} = require("../dtos/calendarDTO.js");


const {checkDuplicationDateDateInDB} = require("../models/calendarDAO.js");

// 같은 사용자가 같은 날짜에 중복으로 작성하는지를 체크하는 함수

const checkDuplicationDate = async(date,userId) => {

    let isDuplication;
    const result = await checkDuplicationDateDateInDB(date,userId);
    console.log(`result: ${result}`);
    // 함수 실행 결과, 동일한 user_id와 date가 이미 기입되어 있는 경우(중복)
    if(result != undefined) isDuplication = true;
    else isDuplication = false;
    return isDuplication;
}
module.exports={

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
    let isDuplication = await checkDuplicationDate(data.alarmed_date, data.user_id);
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
    }
   
};