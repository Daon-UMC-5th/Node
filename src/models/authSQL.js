const findEmailCode = "select user_email, email_code from email_code where user_email=?;"
module.exports.findEmailCode = findEmailCode;

const updateEmailCode = "update email_code set user_email=?, email_code=?;"
module.exports.updateEmailCode = updateEmailCode;

const insertEmailCode = "insert into email_code (user_email, email_code) values(?,?);"
module.exports.insertEmailCode = insertEmailCode;

const findSmsCode = "select user_phone, sms_code from sms_code where user_phone=?;"
module.exports.findSmsCode = findSmsCode;

const updateSmsCode = "update sms_code set user_phone=?, sms_code=?;"
module.exports.updateSmsCode = updateSmsCode;

const insertSmsCode = "insert into sms_code(user_phone, sms_code) values(?,?);"
module.exports.insertSmsCode = insertSmsCode;