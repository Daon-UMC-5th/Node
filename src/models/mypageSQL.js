const selectBoard = "SELECT * FROM board WHERE user_id = ? ORDER BY created_at DESC LIMIT ?, 10;"

const countBoard = "SELECT COUNT(*) FROM board WHERE user_id = ?;"

const selectComment = "SELECT * FROM board WHERE board_id IN (SELECT board_id FROM comment WHERE user_id = ?) ORDER BY created_at DESC LIMIT ?, 10;"

const countComment = "SELECT COUNT(*) FROM comment WHERE user_id = ?;"

const selectScrape = "SELECT * FROM board WHERE board_id IN (SELECT board_id FROM bookmark WHERE user_id = ?) ORDER BY created_at DESC LIMIT ?, 10;"

const countScrape = "SELECT COUNT(*) FROM bookmark WHERE user_id = ?;"

const changeProfile = "UPDATE user SET user_nickname = ?, introduction = ? WHERE user_id = ?;"

module.exports = { selectBoard, selectComment, selectScrape, countBoard, countComment, countScrape, changeProfile };