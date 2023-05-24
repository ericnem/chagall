import axios from 'axios';
import Art from './art.js';

// fetchPaintings(start,end) takes the start and end years of an era and returns
//   an array of 5 random non-repeating Art objects from the MET API
// requires: axios, Art class
// *         start < end
// effects: makes http GET request
export const fetchPaintings = async (start, end) => {
  const artArr = [];
  let ids = [];

  const res = await axios.get(
    'https://collectionapi.metmuseum.org/public/collection/v1\
    /search?hasImages=true&medium=Paintings&dateBegin='+start+'&dateEnd='
    +end+'&q=paintings');

  if (res.data && res.data.objectIDs) {
    ids = res.data.objectIDs;
  } else {
    console.log("Invalid Data");
    return;
  }

  let fetchedIds = [];  // Store fetched ids to avoid duplicate id's

  while(artArr.length < 5) {
    const randomId = ids[Math.floor(Math.random() * ids.length)];

    if (!fetchedIds.includes(randomId)) {
      try {
        const result = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`);

        // Check if the result has data and that primaryImage is not an empty string
        if (result.data && result.data.primaryImage) {
          const art = new Art(
            result.data.primaryImage,
            result.data.title,
            result.data.objectEndDate,
            result.data.artistDisplayName,
          );
          // Push Art Object into the art array
          artArr.push(art);
          fetchedIds.push(randomId);
        }
      } catch (error) {
        // Log the error but continue with the next ID
        console.log(`Error fetching data for ID ${randomId}:`, error.message);
      }
    }
  }

  return artArr;
}
