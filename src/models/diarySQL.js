const getPrivate = "SELECT * FROM diary WHERE user_id = ? ORDER BY created_at DESC LIMIT ?, 10;"

const getPublic = "SELECT * FROM diary WHERE is_private = false ORDER BY created_at DESC LIMIT ?, 10;"

//데이터 recyclerview로 몇개 받아오는지
const getItemCount = "SELECT COUNT(*) FROM (SELECT * FROM diary WHERE user_id = ? ORDER BY created_at DESC LIMIT ?, 10);"

const getDiaryLike = "SELECT diary_id, COUNT(*) AS count FROM like_diary GROUP BY diary_id;"

const getDiaryImage = "SELECT diary_id, image_url FROM image_diary ORDER BY diary_id;"

const getImageList = "SELECT DAYOFMONTH(d.diary_date) AS diary_date, i.image_url FROM diary d JOIN image_diary i ON d.diary_id = i.diary_id WHERE d.diary_id IN (SELECT diary_id FROM diary WHERE user_id = ? AND YEAR(diary_date)=? AND MONTH(diary_date) = ?);"

const oneDiary = "SELECT * FROM diary WHERE diary_date = ?"

const searchDiaryId = "SELECT diary_id FROM diary WHERE diary_date = ?";

const oneDiaryImage = "SELECT image_url FROM image_diary WHERE diary_id = ?;"

const compareDiaryUser = "SELECT user_id FROM diary WHERE diary_id = ?"

const oneDiaryLike = "SELECT COUNT(*) AS likes_count FROM like_diary WHERE diary_id = ?;"

const insertDiary = "INSERT INTO diary (user_id, is_private, title, content, created_at, updated_at, diary_date) VALUES (?,?,?,?,NOW(), NOW(), ?);"

const insertUrlDiary = "INSERT INTO image_diary (diary_id, image_url) VALUES (?,?);"

const changeDiary = "UPDATE diary SET is_private = ?, title = ?, content = ? WHERE diary_date = ?;" 

const deleteDiaryData = "DELETE FROM diary WHERE diary_date = ?;"

const countDiary = "SELECT COUNT(*) FROM like_diary WHERE diary_id = ? "

const insertDiaryLike = "INSERT INTO like_diary (user_id, diary_id, created_at) VALUES (?,?,NOW());"

const deleteDiaryLike = "DELETE FROM like_diary WHERE user_id = ? AND diary_id = ? ;"

module.exports = { getPrivate, getPublic, getDiaryLike, getImageList, getDiaryImage, oneDiary, searchDiaryId, oneDiaryImage, compareDiaryUser, oneDiaryLike, insertDiary, insertUrlDiary, changeDiary, deleteDiaryData, countDiary, insertDiaryLike, deleteDiaryLike}
