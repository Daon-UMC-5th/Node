//const getDiarySQL = "select u.user_nickname, d.* from user as u inner join diary as d on u.user_id = d.user_id ORDER BY created_at";
//module.exports.getDiarySQL = getDiarySQL;
const getBoardSQL = "select u.user_nickname, b.* from user as u inner join board as b on u.user_id = b.user_id ORDER BY created_at";
module.exports.getBoardSQL = getBoardSQL;

const getAllLikeInBoardSQL = "select COUNT(*) as likecount from like_board where board_id=? GROUP BY board_id;";
module.exports.getAllLikeInBoardSQL = getAllLikeInBoardSQL;

const getImageUrlInBoardSQL = "select image_url from image_board where board_id=?";
module.exports.getImageUrlInBoardSQL = getImageUrlInBoardSQL;

const getCommentInBoardSQL = "select COUNT(*) as commentcount from comment where board_id=? GROUP BY board_id;";
module.exports.getCommentInBoardSQL = getCommentInBoardSQL;

const getScrapeInBoardSQL = "select COUNT(*) as scrapecount from bookmark where board_id=? GROUP BY board_id;";
module.exports.getScrapeInBoardSQL = getScrapeInBoardSQL;

const getPrivateDiarySQL = "select * from diary where user_id=? and is_private=1;";
module.exports.getPrivateDiarySQL = getPrivateDiarySQL;

const getPublicDiarySQL = "select u.user_nickname, d.* from diary as d inner join user as u on u.user_id = d.user_id where d.is_private=0 ORDER BY created_at";
module.exports.getPublicDiarySQL = getPublicDiarySQL;
