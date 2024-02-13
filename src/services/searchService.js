const db = require("../config/database.js");
const searchDTO = require("../dtos/searchDTO.js");
const { getDiaryFromDB } = require("../models/searchDAO.js");
const { getBoardFromDB } = require("../models/searchDAO.js");

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
    getDiaries: async(search) => {
        
       // console.log(search);
        // 데이터베이스로부터 전체 일기목록 가지고 오기 
        const diary = await getDiaryFromDB(search);

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
       return await searchDTO(diarys);
  
       
    },

    getBoard: async(search) => {
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
        console.log(`첫번째: ${boards}`);
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
     return await searchDTO(boards);
    }
    
}
