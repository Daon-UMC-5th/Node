const getPrivate = "SELECT * FROM diary WHERE user_id = ?;"

const getPublic = "SELECT * FROM diary WHERE is_private = false;"

const insertDiary = "INSERT INTO diary (user_id, is_private, title, content, created_at, updated_at) VALUES (?,?,?,?,NOW(), NOW());"

const changeDiary = "UPDATE diary SET is_private = ?, title = ?, content = ? WHERE diary_id = ?;" 

const deleteDiaryData = "DELETE FROM diary WHERE diary_id = ?;"

const countDiary = "SELECT COUNT(*) FROM like_diary WHERE diary_id = ? ";

const insertDiaryLike = "INSERT INTO like_diary (user_id, diary_id, created_at) VALUES (?,?,NOW());"

const deleteDiaryLike = "DELETE FROM like_diary WHERE user_id = ? AND diary_id = ? ;"

module.exports = { getPrivate, getPublic, insertDiary, changeDiary, deleteDiaryData, countDiary, insertDiaryLike, deleteDiaryLike}
