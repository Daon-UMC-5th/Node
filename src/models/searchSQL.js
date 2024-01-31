const getDiarySQL = "select u.user_nickname, d.* from user as u inner join diary as d on u.user_id = d.user_id";
const getBoardSQL = "select u.user_nickname, b.* from user as u inner join board as b on u.user_id = b.user_id";
module.exports.getDiarySQL = getDiarySQL;
module.exports.getBoardSQL = getBoardSQL;
