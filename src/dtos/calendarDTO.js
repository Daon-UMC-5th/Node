const { getMedicationSQL } = require("../models/calendarSQL");

const updateDate = async(date) => {
   // console.log(date);
    
    let modifyDate = date.setDate(date.getDate()+1);
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
    console.log(modifyDate);
   
    return modifyDate;
};




// 배열을 객체로 전환 in 신체 
const getPhysicalRecordDTO = async(result) => {

    const date = await updateDate(result[0].alarmed_date);
let object = {
    "physical_record_id" : result[0].physical_record_id,
    "user_id": result[0].user_id,
    "alarmed_date": date,
    "temperature": result[0].temperature,
    "weight": result[0].weight,
    "fasting_blood_sugar": result[0].fasting_blood_sugar,
    "special_note": result[0].special_note,
    "created_at": result[0].created_at,
    "updated_at": result[0].updated_at
};

console.log(object);
return object;

};
module.exports.getPhysicalRecordDTO = getPhysicalRecordDTO;

// 배열을 객체로 전환 in 진료
const getConsultationDTO = async(result) => {
    const date = await updateDate(result[0].alarmed_date);
let object = {
    "consultation_id" : result[0].consultation_id,
    "user_id" : result[0].user_id,
    "hospital" : result[0].hospital,
    "content": result[0].content,
    "alarmed_date": date,
    "alarmed_at": result[0].alarmed_at,
    "created_at" : result[0].created_at,
    "updated_at": result[0].updated_at

};
console.log(object);
return object;
}
module.exports.getConsultationDTO = getConsultationDTO;



const getMedicationDTO = async(result) => {

const date = await updateDate(result[0].alarmed_date);
let object = {
    "medication_id": result[0].medication_id,
    "user_id": result[0].user_id,
    "alarmed_date": date,
    "time_of_day": result[0].time_of_day,
    "medicine": result[0].medicine,
    "alarmed_at": result[0].alarmed_at,
    "alarm_days": result[0].alarm_days,
    "repeat_status": result[0].repeat_status,
    "created_at" : result[0].created_at,
    "updated_at": result[0].updated_at
};

    return object;
};
module.exports.getMedicationDTO = getMedicationDTO;


const getAllMedicationDTO = async(result) => {
    let modifyResult = [];
    let count = 0;
    result.forEach(async(r) => {
    console.log(r);
    const date = await updateDate(r.alarmed_date);
    modifyResult[count] = {
    "medication_id": r.medication_id,
    "user_id": r.user_id,
    "alarmed_date": date,
    "time_of_day": r.time_of_day,
    "medicine": r.medicine,
    "alarmed_at": r.alarmed_at,
    "alarm_days": r.alarm_days,
    "repeat_status": r.repeat_status,
    "created_at" : r.created_at,
    "updated_at": r.updated_at
};
    count++;
    });

 //   console.log(modifyResult);
    return modifyResult;
}
module.exports.getAllMedicationDTO = getAllMedicationDTO;