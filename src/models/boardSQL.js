const getAllData = "SELECT * FROM board WHERE board_type = ? ORDER BY created_at DESC LIMIT ?, 10;";

const getBoardImage = "SELECT board_id, image_url FROM image_board ORDER BY board_id;"

const getAllDataLike = "SELECT board_id, COUNT(*) AS likecount FROM like_board GROUP BY board_id;"

const getAllDataComment = "SELECT board_id, COUNT(*) AS commentcount FROM comment GROUP BY board_id;"

const getAllDataScrape = "SELECT board_id, COUNT(*) AS scrapecount FROM bookmark GROUP BY board_id;"

const getOneData = "SELECT * FROM board WHERE board_id = ?";

const oneBoardImage = "SELECT image_url FROM image_board WHERE board_id = ?;"

const getOneDataLike = "SELECT COUNT(*) AS likecount FROM like_board WHERE board_id = ?;"

const getOneDataComment = "SELECT COUNT(*) AS commentcount FROM comment WHERE board_id = ?;"

const getOneDataScrape = "SELECT COUNT(*) AS scrapecount FROM bookmark WHERE board_id = ?;"

const compareUser = "SELECT user_id FROM board WHERE board_id = ?"; 

const insertData = "INSERT INTO board (board_type, user_id, title, content, created_at, updated_at) VALUES (?,?,?,?,NOW(), NOW());"

const searchData = "SELECT * FROM board WHERE board_id = ?;"

const changeData = "UPDATE board SET title = ?, content = ? WHERE board_id = ? ;" 

const deleteData = "DELETE FROM board WHERE board_id =?;"

const existBoard = "SELECT user_id FROM board WHERE board_id = ? "

const insertLike = "INSERT INTO like_board (user_id, board_id, created_at) VALUES (?,?,NOW());"

const deleteLike = "DELETE FROM like_board WHERE user_id = ? AND board_id = ? ;"

const countLike = "SELECT COUNT(*) FROM like_board WHERE board_id = ? ";

const getAllLike = "SELECT board_id, COUNT(*) FROM like_board GROUP BY board_id ORDER BY board_id DESC LIMIT ?, 10;"

const insertScrape = "INSERT INTO bookmark (user_id, board_id, created_at) VALUES (?,?,NOW());"

const deleteScrape = "DELETE FROM bookmark WHERE user_id = ? AND board_id = ?;"

const getCommentData = "SELECT * FROM comment WHERE board_id = ? ORDER BY created_at DESC LIMIT ?, 10;"

const insertComment = "INSERT INTO comment (user_id, board_id, content, created_at, updated_at) VALUES (?,?,?,NOW(),NOW());"

const changeComment = "UPDATE comment SET content = ? WHERE comment_id = ? ;"

const deleteCommentData ="DELETE FROM comment WHERE comment_id =?;"

const boardComment = "SELECT board_id FROM comment WHERE comment_id = ?;"

const insertCommentLike = "INSERT INTO like_comment (user_id, comment_id, created_at) VALUES (?,?,NOW());"

const deleteCommentLike = "DELETE FROM like_comment WHERE user_id = ? AND comment_id = ? ;"

const countCommentLike = "SELECT COUNT(*) FROM like_comment WHERE comment_id = ? ";

const getAllCommentDataLike = "SELECT comment_id, COUNT(*) AS likecount FROM like_comment GROUP BY comment_id;"

module.exports = {getAllData, getOneData, getBoardImage, getAllDataLike, getAllDataComment, getAllDataScrape, oneBoardImage, getOneDataLike, getOneDataComment, getOneDataScrape, compareUser, insertData, searchData, changeData, deleteData, existBoard, insertLike, deleteLike, countLike, getAllLike, insertScrape, deleteScrape, getCommentData, insertComment, changeComment, deleteCommentData, boardComment, insertCommentLike, deleteCommentLike, countCommentLike, getAllCommentDataLike };