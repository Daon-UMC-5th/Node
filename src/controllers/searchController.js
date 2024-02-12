const searchService = require("../services/searchService.js");
const {response} = require("../config/response.js");
const status = require("../config/responseStatus.js");

module.exports = {
    // 개인 일기장 검색
    searchPrivateInDiary: async(req,res,next) =>{
      
      let search = req.body.search;

      const userId = req.user_id;
      const pageNum = req.query.page;

      let result = await searchService.getPrivateDiaries(userId, search, pageNum);

      if(result == undefined) res.send(response(status.ARTICLE_NOT_FOUND,{}));
      else if(result.length!=0) res.send(response(status.SUCCESS, JSON.stringify(result)));
      // 해당 검색 내용에 일치하는 결과가 없는 경우(result: 0)
      else res.send(response(status.ARTICLE_NOT_FOUND,{}));
    },

    searchPublicInDiary: async(req,res,next) => {
       
        // 사용자에게 검색내용 입력받음
        let search = req.body.search;
        const userId = req.user_id;
        // 조회 페이지
        let pageNum = req.query.page;

      //  console.log(search);
        let result = await searchService.getPublicDiaries(userId, search, pageNum);
        console.log(`result: ${result}`);
        if(result.length!=0) res.send(response(status.SUCCESS, JSON.stringify(result)));
      // 해당 검색 내용에 일치하는 결과가 없는 경우(result: 0)
        else res.send(response(status.ARTICLE_NOT_FOUND,{}));

    },
  
    searchInBoard: async(req,res,next) => {
        let search = req.body.search;
       
      // 조회 페이지  
      let pageNum = req.query.page;
      let result = await searchService.getBoard(search, pageNum);
        if(result == undefined) res.send(response(status.ARTICLE_NOT_FOUND,{}));
        else if(result.length!=0) res.send(response(status.SUCCESS, JSON.stringify(result)));
        // 해당 검색 내용에 일치하는 결과가 없는 경우(result: 0)
        else res.send(response(status.ARTICLE_NOT_FOUND,{}));

    }
}