<!-- HTML -->
<!-- HTML -->
<template>
  <div class="bigscreen">
    <div class = "header">
      <div class="circles">
        <span
        class="circle"
        v-for="index in 5"
          :key="index"
          :class="{ filled: filledCircles >= index }"
        ></span>
      </div>
      <div>
        <div class="score-box" style = "background-color:#B0BDC1" id = "current-score">
          Score <b>0</b>
        </div>
        <div class="score-box" style = "background-color:#B6CCD7" id = "hi-score">
          Hi <b>0</b>
        </div>
      </div>
    </div>
    <div class="gamescreen">
      <div class="left">
        <img :src= "state.image">
      </div>
      <div class="right">
        <div id="guessingbox">
        <p style = "font-size:25px;" id="guesstitle">GUESS</p>
        <div id="container">
          <input style = "padding: 7px 0px 7px 0px" id="guess" type="number" min="1" max="9999" required>
          <select name="age" id="age" required>
            <option value="A.D">A.D</option>
            <option value="B.C">B.C</option>
          </select>
        </div>
      </div>
      <br>
      <br>
      <button id="confirms" @click="fillCircle">Confirm</button>
      </div>
    </div>
  </div>
 </template>

<!-- JS -->
<script>

import { fetchPaintings } from '../getArt.js';
import { reactive,ref } from 'vue';

export default {
name: 'GameScreen',
props: {
  msg: String
},

data() {
  return {
    filledCircles: 0
  }
},
methods: {
  fillCircle() {
    if (this.filledCircles < 5) {
      this.filledCircles++;
    }
  }
},

setup() {
  const state = reactive({image: "", dateEnd: 0, artist: "", title: ""});
  const artObjects = ref([]); // New reactive reference
  const currentIndex = ref(0); // Assuming this is intended to be reactive state

  fetchPaintings().then(data => {
    console.log(data);
      artObjects.value = data;
      state.image = artObjects.value[currentIndex.value].imageUrl;
      state.dateEnd = artObjects.value[currentIndex.value].dateEnd;
      state.artist = artObjects.value[currentIndex.value].artist;
      state.title = artObjects.value[currentIndex.value].title;
    })
  .catch(err => console.log(err));
  
  return {
    state
  }
}
}

</script>

<!-- CSS -->
<style scoped>
.circles {
 width: 70%;
}
.score-box {
           display: inline-block;
           padding-top: 4%;
           padding-bottom: 4%;
           padding-left:20px;
           padding-right:20px;
           background-color: #e6e6e6;
           margin-left: 30px;
           font-size:25px;
}
.header {
 padding-top: 4%;
 position: relative;
 display: flex;
 align-items:center;
 justify-content: center;
}
.bigscreen {
 width: 99vw;
 height:95vh;
}
.gamescreen {
 height: 70%;
 margin: auto;
 padding: 10px;
 position: relative;
 display: flex;
 align-items: end;
 bottom:0;
}
.left {
 display: flex;
 justify-content: center;
 align-items: center;
 height: 90%;
 width: 40%;
 float: left;}
.right {
 height: 90%;
 width: 55%;
 float: left;
}
.circle {
margin-left: 8px;
height: 25px;
width: 25px;
border:1px solid #F5F5F5;
background-color:#F5F5F5;
border-radius: 50%;
display: inline-block;
}


.filled{
background-color:#eeba2b;
}


#guesstitle{
font-family:tahoma;
margin-bottom:5px;
}


#container{
align-items:center;
}


#guess{
text-align:center;
background-color:#F5F5F5;
border-color:transparent;
font-family:Tahoma;
font-size:20px;
padding-top:5px;
}
#guess::-webkit-outer-spin-button,
#guess::-webkit-inner-spin-button {
 -webkit-appearance: none;
 margin: 0;
}


#age{
padding-top:8px;
height:100%;
font-size:20px;
font-family:Tahoma;
background-color: #F5F5F5;
border:transparent;
padding-bottom:8px;
}


#age::-ms-expand {
   display: none;
}


#guessingbox {
margin-left:auto;
margin-right:auto;
margin-top:10%;
width:20%;
height:25%;
border: 4px solid black;
border-radius:30px;
}


#confirms {
color: black;
background-color: #eeba2b;
border: #eeba2b;
font-family: Tahoma;
font-weight:lighter;
font-size: 30px;
width: 25%;
height: 12%;
border-radius: 30px;
}


#confirms:hover{
background-color: #b99225;
border: #b99225;
}
</style>
