<script setup>

  import axios from 'axios';
  import { reactive } from 'vue';

  const state = reactive({imgUrl: "", dateStart: 0, dateEnd: 0, artist: "", title: ""});

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
      console.log(response.data.records[recordIndex]);
      state.imgUrl = response.data.records[recordIndex].images[0].baseimageurl + "?height=500&width=500";
      state.title = response.data.records[recordIndex].title
      state.dateEnd = response.data.records[recordIndex].dateend
      state.dateStart = response.data.records[recordIndex].datebegin
      const contributors = response.data.records[recordIndex].people
      // console.log(contributors.length);
      console.log(contributors);

      for (let i = 0; i < 3; i++) {
        if (contributors[i].role == "Artist") {
          state.artist = contributors[i].displayname
          break;
        }
      }
    })
    .catch(error => {
      console.log(error);
      fetchArt();
    })
  }

  fetchArt();

</script>

<template>
  <p>{{state.imgUrl}}</p>
  <img :src="state.imgUrl">
  <p> Title: {{ state.title }}</p>
  <p> Start date: {{ state.dateStart }}</p>
  <p> End date: {{ state.dateEnd }}</p>
  <p> Artist: {{ state.artist }}</p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
