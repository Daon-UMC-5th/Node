const boardDTO = (data) => {
    const boards = data[0];
    const likes = data[1];
    const comments = data[2];
    const scrapes = data[3];
    const boardImages = data[4];

    const boardsWithCount = boards.map(boardList => {
        const imageObj = boardImages.find(item => item.board_id === boardList.board_id);
        boardList.image_url = imageObj ? imageObj.image_url : 'null';

        const likecountObj = likes.find(item1 => item1.board_id === boardList.board_id);
        boardList.likecount = likecountObj ? likecountObj.likecount : 0;

        const commentcountObj = comments.find(item2 => item2.board_id === boardList.board_id);
        boardList.commentcount = commentcountObj ? commentcountObj.commentcount : 0;

        const scrapecountObj = scrapes.find(item3 => item3.board_id === boardList.board_id);
        boardList.scrapecount = scrapecountObj ? scrapecountObj.scrapecount : 0;
        
        return boardList;
      });
    
    return boardsWithCount 
}

const oneBoardDTO = (data) => {
    const boards = data[0];
    const likes = data[1];
    const comments = data[2];
    const scrapes = data[3];
    const oneImage = data[4]
    const access = data[5];

    boards.image_url = oneImage[0] ? oneImage[0].image_url :'null';
    boards.likecount = likes[0].likecount;
    boards.commentcount = comments[0].commentcount;
    boards.scrapecount = scrapes[0].scrapecount;
    boards.access = access;

    return boards;
}

const boardCommentDTO = (data) => {
    const comments = data[0];
    const likes = data[1];

    const commentsWithCount = comments.map(commentList => {
        const likecountObj = likes.find(item => item.comment_id === commentList.comment_id);
        commentList.likecount = likecountObj ? likecountObj.likecount : 0;
        return commentList;
      });
    
    return commentsWithCount 
}

module.exports = {boardDTO, oneBoardDTO, boardCommentDTO};