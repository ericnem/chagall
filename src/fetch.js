import axios from 'axios'
import Round from './round.js';

// fetchArt() returns data about a random painting as an array:
// {imgUrl, title, dateEnd, dateStart, artist}

export function fetchArt() {

  const MAX_PAGES = 597;
  const RECORDS_PER_PAGE = 10;

  const recordIndex = Math.floor(Math.random()*(RECORDS_PER_PAGE-1));
  const pageNum = Math.floor(Math.random()*MAX_PAGES)

  const apiKey = 'ef9c3839-3c0a-4873-ae28-b2103b7d076b';
  const apiUrl = 'https://api.harvardartmuseums.org/object';

  return axios.get(apiUrl, {
    params: {
      apikey: apiKey,
      classification: "Paintings",
      hasimage: 1,
      page: pageNum
    }
  }).then(response => {
    var imgUrl = ""
    
    try {
      imgUrl = response.data.records[recordIndex].images[0].baseimageurl + "?height=500&width=500";
    } catch (error) {
      console.error(error);
    }
    
    const title = response.data.records[recordIndex].title
    const dateEnd = response.data.records[recordIndex].dateend
    const dateStart = response.data.records[recordIndex].datebegin
    const contributors = response.data.records[recordIndex].people
    var artist = "Not found"
    
    try {
      for (let i = 0; i < 3; i++) {
        if (contributors[i].role == "Artist") {
          artist = contributors[i].displayname;
          break;
        }
      }
    } catch(error){
      console.error(error);
    }
    
    // const artData = [imgUrl, title, dateEnd, dateStart, artist];
    let round = new Round(imgUrl, title, dateStart, dateEnd, artist);
    return round;
  })
  .catch(error => {
    console.log(error);
    fetchArt();
  })
}
