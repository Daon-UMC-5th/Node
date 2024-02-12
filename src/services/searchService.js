const db = require("../config/database.js");
const searchDTO = require("../dtos/searchDTO.js");

const { getBoardFromDB, getAllLikeInBoardInDB, getImageUrlInBoardInDB, getCommentInBoardInDB, getScrapeInBoardInDB} = require("../models/searchDAO.js");
const {getPrivateDiaryFromDB, getPublicDiaryFromDB} = require("../models/searchDAO.js");


// 일기장 검색 시 중복 검사 
const checkDiaryDuplication = function(diary,diaries){
    let isDuplication = false;
       
    diaries.forEach((d)=>{
        if(d.diary_id ==  diary.diary_id) isDuplication = true;
    });

    return isDuplication;
}

// 게시판 검색 시 중복 검사 
const checkBoardDuplication = function(board, boards){
    let isDuplication = false;
    
    boards.forEach((b)=>{
        if(b.board_id ==  board.board_id) isDuplication = true;
    })
   
    return isDuplication;

};


module.exports = {
    getPrivateDiaries: async(userId, search, pageNum) => {

        const diary = await getPrivateDiaryFromDB(userId);

        var count = 0;
        var diarys = [];
     
        // 제목과 동일한 경우
        diary.forEach( (d) => {
            if(d.title.indexOf(search) != -1){
                //console.log(chatRoom);
                diarys[count] = d;
                count++;
            }});

      
       // 내용과 동일한 경우
       diary.forEach((d) => {
         
           if(d.content.indexOf(search)!=-1){

            if(diarys.length==0) {
                diarys[count] = d;
                count++;
            }
            else{
                  // 검색반환 결과로 이미 추가된 경우에는 제외(중복 제외)
                  const isDuplication = checkDiaryDuplication(d, diarys);
                  if(!isDuplication){
                      boards[count] = d;
                      count++;
                  }
            }
          
       
           }
       });
       //console.log("검색결과",diarys);
       
       // 페이징 기능 구현
       const totalPage = diarys.length;
       console.log(totalPage);
       const pageUnit = 10;
       const lastPage = (pageUnit * pageNum);
       const firstPage = pageNum;
       let index=0;
       var result = [];
       for(let i=firstPage;i<=lastPage && i<=totalPage;i++){
           result[index]= diarys[i-1];
           index++;
       }

       console.log(result);

       return searchDTO(result);

    },

    getPublicDiaries: async(userId, search, pageNum) => {
        
       // console.log(search);
        // 데이터베이스로부터 전체 일기목록 가지고 오기 
        const diary = await getPublicDiaryFromDB(search);

       // console.log(diary);
        var count = 0;
        var diarys = [];
     
        // 제목과 동일한 경우
        diary.forEach( (d) => {
            if(d.title.indexOf(search) != -1){
                //console.log(chatRoom);
                diarys[count] = d;
                count++;
            }});

      
       // 내용과 동일한 경우
       diary.forEach((d) => {
         
           if(d.content.indexOf(search)!=-1){

            if(diarys.length==0) {
                diarys[count] = d;
                count++;
            }
            else{
                  // 검색반환 결과로 이미 추가된 경우에는 제외(중복 제외)
                  const isDuplication = checkDiaryDuplication(d, diarys);
                  if(!isDuplication){
                      boards[count] = d;
                      count++;
                  }
            }
          
       
           }
       });
       console.log("검색결과",diarys);
       
       // 페이징 기능 구현
       const totalPage = diarys.length;
       console.log(totalPage);
       const pageUnit = 10;
       const lastPage = (pageUnit * pageNum);
       const firstPage = pageNum;
       let index=0;
       var result = [];
       for(let i=firstPage;i<=lastPage&& i<=totalPage;i++){
        result[index]= diarys[i-1];
        index++;
       }

       console.log(result);

       return searchDTO(result);


      // return await searchDTO(diarys);
  
       
    },

    getBoard: async(search,pageNum) => {
        // 데이터베이스로부터 전체 게시판 목록 가져오기
        const board = await getBoardFromDB(search);
        var count = 0;
        var boards = [];

       // console.log(board);

        // 제목과 동일한 경우
        board.forEach( (b) => {
            if(b.title.indexOf(search) != -1){
                //console.log(chatRoom);
                boards[count] = b;
                count++;
        }
    });
        //console.log(`첫번째: ${boards}`);
        // 내용과 동일한 경우
       board.forEach((b) => {
         
        if(b.content.indexOf(search)!=-1){

         if(boards.length==0) {
             boards[count] = b;
             count++;
         }
         else{
               // 검색반환 결과로 이미 추가된 경우에는 제외(중복 제외)
               const isDuplication = checkBoardDuplication(b,boards);
               if(!isDuplication){
                   boards[count] = b;
                   count++;
               }
         }
       
        }
    });

    //console.log(boards);
    // 페이징 기능 구현
    const totalPage = boards.length;
    console.log(totalPage);
    const pageUnit = 10;
    const lastPage = (pageUnit * pageNum);
    let firstPage;
    if(pageNum == 1) firstPage = 1;
    else firstPage = ((pageNum-1)*pageUnit)+1;
    let index=0;
    var result = [];

    if(totalPage<firstPage) return undefined;

    for(let i=firstPage;i<=lastPage && i<=totalPage;i++){
        
       
            result[index] = boards[i-1];
            result[index].likecount = await getAllLikeInBoardInDB(boards[i-1].board_id);
            result[index].image_url = await getImageUrlInBoardInDB(boards[i-1].board_id);
            result[index].commentcount = await getCommentInBoardInDB(boards[i-1].board_id);
            result[index].scrapecount = await getScrapeInBoardInDB(boards[i-1].board_id);
            index++;
    }
   // console.log(result);
     
   

    //console.log(await getAllLikeInBoardInDB(1));
    console.log(result);
    //console.log(boards);
    return await searchDTO(boards);
    }
    
}
