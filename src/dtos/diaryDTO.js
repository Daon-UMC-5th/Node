const diaryDTO = (data) => {
    const diaries = data[0];
    const diarylikes = data[1];
    const diaryImages = data[2];

    const diariesWithCount = diaries.map(diaryList => {
        const ImageObj = diaryImages.find(item => item.diary_id === diaryList.diary_id);
        diaryList.image_url = ImageObj ? ImageObj.image_url : 'null';

        const countObj = diarylikes.find(item => item.diary_id === diaryList.diary_id);
        diaryList.count = countObj ? countObj.count : 0;
        return diaryList;
      });
    
    
    return diariesWithCount
}

const oneDiaryDTO = (data) => {
    const diaries = data[0];
    const onelike = data[1];
    const oneImage = data[2]
    const diaryaccess = data[3];

    diaries.image_url = oneImage[0] ? oneImage[0].image_url :'null';
    diaries.likes_count = onelike[0].likes_count;
    diaries.access = diaryaccess;
    
    return diaries
}

const imageDTO = (data) => {
    const lastdate = data[0];
    const images = data[1];
  
    const dates = [];
    for (let i = 1; i <= lastdate; i++) {
        dates.push(i);
    }
    
    const mappedObjects = [];
    dates.forEach(date => {
        const matchingImage = images.find(image => image.diary_date === date);
        if (matchingImage) {
          mappedObjects.push({ diary_date: date, image_url: matchingImage.image_url });
        } else {
          mappedObjects.push({ diary_date: date, image_url: null });
        }
      });
    return mappedObjects
}
module.exports = {diaryDTO, oneDiaryDTO, imageDTO};