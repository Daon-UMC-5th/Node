// 신체기록 삽입
const insertPhysicalRecordSQL = "insert into physical_record (user_id, alarmed_date, temperature, weight, fasting_blood_sugar, special_note,created_at,updated_at) values(?,?,?,?,?,?,NOW(),NOW())";
module.exports.insertPhysicalRecordSQL = insertPhysicalRecordSQL;

// 신체기록 조회
const getPhysicalRecordSQL = "select * from physical_record where alarmed_date=? and user_id=?";
module.exports.getPhysicalRecordSQL = getPhysicalRecordSQL;

// 신체기록 삭제 
const deletePhysicalRecordSQL = "delete from physical_record where alarmed_date=? and user_id=?";
module.exports.deletePhysicalRecordSQL = deletePhysicalRecordSQL;

// 신체기록 수정
const updatePhysicalRecordSQL = "update physical_record set temperature=?, weight=?, fasting_blood_sugar=?, special_note=?, updated_at=NOW() where alarmed_date=? and user_id=?"
module.exports.updatePhysicalRecordSQL = updatePhysicalRecordSQL;


// 신체기록 중복 확인
const checkDuplicationDateInPhysicalSQL = " select * from physical_record where alarmed_date=? and user_id=?";
module.exports.checkDuplicationDateInPhysicalSQL = checkDuplicationDateInPhysicalSQL;


// 진료기록 삽입
const insertConsultationSQL = "insert into consultation (user_id, hospital, content, alarmed_date, alarmed_at, created_at, updated_at) values(?,?,?,?,?,NOW(),NOW())"
module.exports.insertConsultationSQL = insertConsultationSQL;

// 진료기록 중복 확인
const checkDuplicationDateInConsultationSQL = "select * from consultation where alarmed_date=? and user_id=?";
module.exports.checkDuplicationDateInConsultationSQL = checkDuplicationDateInConsultationSQL;

// 진료기록 조회
const getConsultationSQL = "select * from consultation where alarmed_date=? and user_id=?";
module.exports.getConsultationSQL = getConsultationSQL;

// 진료기록 삭제
const deleteConsultationSQL = "delete from consultation where alarmed_date=? and user_id=?";
module.exports.deleteConsultationSQL = deleteConsultationSQL;

// 진료기록 수정
const updateConsultationSQL = "update consultation set hospital=?, content=?, alarmed_at=?, updated_at=NOW() where alarmed_date=? and user_id=?";
module.exports.updateConsultationSQL = updateConsultationSQL;

// 복용기록 전체 조회
const getAllMedicationSQL = "select * from medication where alarmed_date=? and user_id=?";
module.exports.getAllMedicationSQL = getAllMedicationSQL;

// 복용기록 아침/점심/저녁 별 조회
const getMedicationSQL = "select * from medication where alarmed_date=? and time_of_day=? and user_id=?";
module.exports.getMedicationSQL = getMedicationSQL;


// 복용기록 중복 확인
const checkDuplicationDateInMedicationSQL = "select * from medication where alarmed_date=? and time_of_day=? and user_id=?";
module.exports.checkDuplicationDateInMedicationSQL = checkDuplicationDateInMedicationSQL;

// 복용기록 삽입
const insertMedicationSQL = "insert into medication (user_id, alarmed_date, time_of_day, medicine, alarmed_at, alarm_days, repeat_status, created_at, updated_at) values(?,?,?,?,?,?,?,NOW(),NOW())";
module.exports.insertMedicationSQL = insertMedicationSQL;

// 복용기록 삭제 
const deleteMedicationSQL = "delete from medication where alarmed_date=? and time_of_day=? and user_id=?";
module.exports.deleteMedicationSQL = deleteMedicationSQL;

// 복용기록 수정
const updateMedicationSQL = "update medication set medicine=?, alarmed_at=?, alarm_days=?, repeat_status=?, updated_at=NOW() where alarmed_date=? and time_of_day=? and user_id=?";
module.exports.updateMedicationSQL = updateMedicationSQL;