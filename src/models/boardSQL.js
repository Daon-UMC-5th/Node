const getAllData = "SELECT * FROM board WHERE board_type = ?";

const getOneData = "SELECT * FROM board WHERE board_id = ?";

const compareUser = "SELECT user_id FROM board WHERE board_id = ?"; 

const insertData = "INSERT INTO board (board_type, user_id, title, content, created_at, updated_at) VALUES (?,?,?,?,NOW(), NOW());"

const searchData = "SELECT * FROM board WHERE board_id=?;"

const changeData = "UPDATE board SET title = ?, content = ? WHERE board_id = ? ;" 

const deleteData = "DELETE FROM board WHERE board_id =?;"

const insertLike = "INSERT INTO like_board (user_id, board_id, created_at) VALUES (?,?,NOW());"

const deleteLike = "DELETE FROM like_board WHERE user_id = ? AND board_id = ? ;"

const countLike = "SELECT COUNT(*) FROM like_board WHERE board_id = ? ";

const getAllLike = "SELECT board_id, COUNT(*) FROM like_board GROUP BY board_id";

const insertScrape = "INSERT INTO bookmark (user_id, board_id, created_at) VALUES (?,?,NOW());"

const deleteScrape = "DELETE FROM bookmark WHERE user_id = ? AND board_id = ?;"

const getCommentData = "SELECT * FROM comment WHERE board_id = ?;"

const insertComment = "INSERT INTO comment (user_id, board_id, content, created_at, updated_at) VALUES (?,?,?,NOW(),NOW());"

const changeComment = "UPDATE comment SET content = ? WHERE comment_id = ? ;"

const deleteCommentData ="DELETE FROM comment WHERE comment_id =?;"

const boardComment = "SELECT board_id FROM comment WHERE comment_id = ?;"
module.exports = {getAllData, getOneData, compareUser, insertData, searchData, changeData, deleteData, insertLike, deleteLike, countLike, getAllLike, insertScrape, deleteScrape, getCommentData, insertComment, changeComment, deleteCommentData, boardComment };