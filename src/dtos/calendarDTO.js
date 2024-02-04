// 배열을 객체로 전환 
const getPhysicalRecordDTO = async(result) => {

let object = {
    "physical_record_id" : result[0].physical_record_id,
    "user_id": result[0].user_id,
    "alarmed_date": result[0].alarmed_date,
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