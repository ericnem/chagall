
// fetchArt() returns data about a random painting as an array:
// {imgUrl, title, dateEnd, dateStart, artist}
// requires: import axios from 'axios'
function fetchArt() {

  const MAX_PAGES = 597;
  const RECORDS_PER_PAGE = 10;

  const recordIndex = Math.floor(Math.random()*(RECORDS_PER_PAGE-1));
  const pageNum = Math.floor(Math.random()*MAX_PAGES)

  const apiKey = 'ef9c3839-3c0a-4873-ae28-b2103b7d076b';
  const apiUrl = 'https://api.harvardartmuseums.org/object';

  axios.get(apiUrl, {
    params: {
      apikey: apiKey,
      classification: "Paintings",
      hasimage: 1,
      page: pageNum
    }
  }).then(response => {
    const imgUrl = response.data.records[recordIndex].images[0].baseimageurl + "?height=500&width=500";
    const title = response.data.records[recordIndex].title
    const dateEnd = response.data.records[recordIndex].dateend
    const dateStart = response.data.records[recordIndex].datebegin
    const contributors = response.data.records[recordIndex].people
    var artist = ""
    

    for (let i = 0; i < 3; i++) {
      if (contributors[i].role == "Artist") {
        state.artist = contributors[i].displayname
        break;
      }
    }

    return {imgUrl, title, dateEnd, dateStart, artist}
  })
  .catch(error => {
    console.log(error);
    fetchArt();
  })
}